import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import PageLoader from '../../components/PageLoader/PageLoader.tsx';
import ContentTool from '../../components/ContentTool/ContentTool.tsx';
import React, { useCallback, useEffect, useState } from 'react';
import { IOptions, IPageContent, IPagesItem, IPagesList, IToggle } from '../../types';
import axiosApi from '../../axiosApi.ts';
import CustomNavLink from '../../components/CustomNavLink/CustomNavLink.tsx';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<IPageContent>({
    title: '',
    content: '',
  });
  const [pages, setPages] = useState<IPagesItem[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [isHome, setIsHome] = useState(true);
  const [isLoading, setIsLoading] = useState<IToggle>({
    nav: false,
    pageItem: false,
  });
  const fetchData = useCallback(async () => {
    setIsLoading((prevState) => ({ ...prevState, pageItem: true }));

    if (location.pathname !== '/' && location.pathname !== '/pages/admin') {
      try {
        await axiosApi.get(location.pathname + '.json').then((response) => {
          setPage((prevState) => ({ ...prevState, title: response.data.title, content: response.data.content }));
        });
      } catch (error) {
        console.log('Caught while fetching data: ' + error);
        setIsLoading((prevState) => ({ ...prevState, pageItem: false }));
      } finally {
        setIsLoading((prevState) => ({ ...prevState, pageItem: false }));
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsLoading((prevState) => ({ ...prevState, nav: true }));
    const initialFetch = async () => {
      try {
        const pagesResponse = await axiosApi.get<IPagesList | null>('pages/.json');
        const pages = pagesResponse.data;
        if (!pages) {
          return;
        }
        const newPages = Object.keys(pages).map((id) => {
          const page = pages[id];
          return {
            ...page,
            id,
          };
        });
        setPages(newPages);
      } catch (error) {
        setIsLoading((prevState) => ({ ...prevState, nav: false }));
        console.log('Caught while fetching data for admin page: ' + error);
      } finally {
        setIsLoading((prevState) => ({ ...prevState, nav: false }));
      }
    };
    void initialFetch();
  }, [selected]);

  useEffect(() => {
    if (location.pathname === '/' && !isHome) {
      setIsHome((prevState) => !prevState);
    } else if (location.pathname !== '/' && isHome) {
      setIsHome((prevState) => !prevState);
    } else if (location.pathname !== '/') {
      void fetchData();
    }
  }, [fetchData, isHome, location.pathname]);

  useEffect(() => {
    pages.map((item) => {
      if (item.id === selected) {
        setPage((prevState) => ({
          ...prevState,
          content: item.content,
          title: item.title,
        }));
      }
    });
  }, [pages, selected]);

  const onSelect = (selected: IOptions | null) => {
    if (selected?.value) {
      setSelected(selected.value);
    }
  };

  const onSubmit = async () => {
    try {
      await axiosApi.put(`pages/${selected}.json`, page);
      navigate(`/pages/${selected}`);
      setSelected('');
    } catch (error) {
      console.log('Caught while form submit: ' + error);
    }
  };

  const currentDataChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const resetData = useCallback(() => {
    setPage((prevState) => ({ ...prevState, title: '', content: '' }));
  }, []);

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">StaticPages</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink className="nav-link" to="/">
                  HOME
                </NavLink>
                {isLoading.nav ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  pages.map((item, index) => <CustomNavLink link={item.id} key={index} />)
                )}
                <NavLink className="nav-link" to="/pages/admin">
                  Admin
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<PageLoader content={page} isHome={isHome} />} />
            <Route
              path="/pages/:pageName"
              element={
                <>
                  {isLoading.pageItem ? (
                    <div className="d-flex justify-content-center align-items-center py-5">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <PageLoader content={page} isHome={isHome} />
                  )}
                </>
              }
            />
            <Route
              path="/pages/admin"
              element={
                <ContentTool
                  pages={pages}
                  onSelect={onSelect}
                  onChange={currentDataChanged}
                  onSubmit={onSubmit}
                  pageData={page}
                  reset={resetData}
                />
              }
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;

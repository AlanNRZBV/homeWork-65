import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import PageLoader from '../../components/PageLoader/PageLoader.tsx';
import ContentTool from '../../components/ContentTool/ContentTool.tsx';
import { useCallback, useEffect, useState } from 'react';
import { IPageContent, IPagesItem, IPagesList } from '../../types';
import axiosApi from '../../axiosApi.ts';

function App() {
  const location = useLocation();
  const [page, setPage] = useState<IPageContent>({
    title: '',
    content: '',
  });
  const [pages, setPages] = useState<IPagesItem[]>([]);
  const [isHome, setIsHome] = useState(false);

  const fetchData = useCallback(async () => {
    console.log('trying to fetch ' + location.pathname);
    if (location.pathname !== '/' && location.pathname !== '/pages/admin') {
      try {
        await axiosApi.get(location.pathname + '.json').then((response) => {
          console.log('content for one page: ' + response.data);
          setPage((prevState) => ({ ...prevState, title: response.data.title, content: response.data.content }));
        });
      } catch (error) {
        console.log('Caught while fetching data: ' + error);
      }
    }else if (location.pathname === '/pages/admin'){
      console.log('TRYING TO FETCH ALL PAGES');
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
        console.log('Caught while fetching data for admin page: ' + error);
      }
    }

  }, [location.pathname]);

  useEffect(() => {
    console.log('Current pages state is : ' + pages);
  }, [pages]);

  useEffect(() => {
    if (location.pathname === '/' && !isHome) {
      console.log('You are at home page');
      setIsHome((prevState) => !prevState);
    } else if (location.pathname !== '/' && isHome) {
      console.log('You are not at home page');
      setIsHome((prevState) => !prevState);
    } else if (location.pathname !== '/'){
      void fetchData();
    }
  }, [fetchData, isHome, location.pathname]);

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
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/pages/about">
                  About
                </NavLink>
                <NavLink className="nav-link" to="/pages/contacts">
                  Contacts
                </NavLink>
                <NavLink className="nav-link" to="/pages/pricing">
                  Pricing
                </NavLink>
                <NavLink className="nav-link" to="/pages/products">
                  Products
                </NavLink>
                <NavLink className="nav-link" to="/pages/shop">
                  Shop
                </NavLink>
                <NavLink className="nav-link" to="/pages/admin">
                  Admin
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<PageLoader content={page} isHome={isHome} />} />
          <Route path="/pages/:pageName" element={<PageLoader content={page} isHome={isHome} />} />
          <Route path="/pages/admin" element={<ContentTool pages={pages} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

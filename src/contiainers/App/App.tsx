import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import PageLoader from "../../components/PageLoader/PageLoader.tsx";
import ContentTool from "../../components/ContentTool/ContentTool.tsx";
import { useCallback, useEffect, useState } from "react";
import { IPageContent } from "../../types";

function App() {

  const [pages, setPages]=useState<IPageContent>({
    id:'',
    title:'',
    content:''
  })

  const fetchData = useCallback(async ()=>{

  },[])

  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname)
  }, [location]);

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
          <Route path="/" element={<PageLoader content={pages}/>}/>
          <Route path="/pages/:pageName" element={<PageLoader content={pages}/>}/>
          <Route path="/pages/admin" element={<ContentTool/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App

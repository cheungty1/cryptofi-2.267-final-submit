// Import react modules
import React from 'react';

// External packages
// Import Outlet from react router dom - used as a placeholder and used in parent route elements to render their child route elements
import { Outlet } from 'react-router-dom';
// Import Toast Container from React Toastify - for our Error message
import { ToastContainer } from 'react-toastify';

// Import npm packages - Styled Components
import styled from 'styled-components';

// Import Custom Components
import Header from './Header';
import Footer from './Footer';

// Styled Components - CSS custom styling
const AppWrap = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex: 1;
`;

// Layout Function
const Layout = () => (
  <div className="app">

    {/* TOAST popup component: displays Errors */}
    <ToastContainer 
      style={{ textAlign: "center" }} 
      position="top-center"
    />
    <Header />

    {/* Column-direction flexbox: Wraps all content in column-direction flexbox */}
    <AppWrap>
      <Outlet />
    </AppWrap>
    <Footer />
  </div>
);

// Export function
export default Layout
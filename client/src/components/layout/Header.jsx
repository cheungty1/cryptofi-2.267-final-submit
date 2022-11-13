// Import React modules
import React from 'react';
import { Link } from 'react-router-dom';

// External packages
// Import Bootstrap modules
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Import Logo and Styled Components
import { CgArrowsExchange } from 'react-icons/cg';
import styled from 'styled-components';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import CFButton from '../../components/common/CFButton';
import CFNavLink from '../common/CFNavLink';

// Styled Components - CSS custom styling
// Style Navbar
const StyledNavbar = styled(Navbar)`
  background-color: var(--primary);
`;

// Style Logo
const StyledLogo = styled(CgArrowsExchange)`
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
  color: var(--brand);
  transition: all 1s;

`;

// Header Function
const Header = () => {
const { user, logout } = useAuth();

  return (
    <StyledNavbar variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">

          {/* Logo */}
          <StyledLogo />
          {' '}

          {/* Title */}
          CryptoFi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">

          {/* Standard Navlinks */}
          <CFNavLink as={Link} to="/" navbar>Home</CFNavLink>
            <CFNavLink as={Link} to="/about" navbar>About</CFNavLink>
            <CFNavLink as={Link} to="/currency/prices" navbar>CBDC</CFNavLink>
            <CFNavLink as={Link} to="/crypto/prices" navbar>Crypto</CFNavLink>

            {/* Auth Navlinks */}
            {!user && <CFNavLink to="/signup" outline navbar>Sign Up</CFNavLink>}
            {!user && <CFNavLink to="/login" outline navbar>Log In</CFNavLink>}
            {user && <CFNavLink as={Link} to="/dashboard" outline navbar>Dashboard</CFNavLink>}
            {user && <CFButton onClick={() => { logout() }} outline navbar>Logout</CFButton>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  )
}

// Export function
export default Header
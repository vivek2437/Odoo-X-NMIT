import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  
  svg {
    margin-right: 0.5rem;
    color: #81C784;
  }
  
  &:hover {
    color: #E8F5E8;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 100%;
    height: calc(100vh - 70px);
    background: #4CAF50;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    transition: right 0.3s ease;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    padding: 1rem;
    font-size: 1.1rem;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #81C784 0%, #A5D6A7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 0.5rem;
  overflow: hidden;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #eee;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #333;
  text-align: left;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user) return '?';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }
    return user.username?.charAt(0).toUpperCase() || '?';
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span style={{marginRight: '0.5rem'}}>🌱</span>
          EcoFinds
        </Logo>

        <Nav isOpen={mobileMenuOpen}>
          <NavLink to="/marketplace" onClick={closeMobileMenu}>
            <span style={{marginRight: '0.5rem'}}>🛍️</span>
            Marketplace
          </NavLink>
          
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={closeMobileMenu}>
                <span style={{marginRight: '0.5rem'}}>👤</span>
                Dashboard
              </NavLink>
              <NavLink to="/add-product" onClick={closeMobileMenu}>
                <span style={{marginRight: '0.5rem'}}>➕</span>
                Add Listing
              </NavLink>
              <NavLink to="/my-listings" onClick={closeMobileMenu}>
                My Listings
              </NavLink>
              <NavLink to="/cart" onClick={closeMobileMenu}>
                <span style={{marginRight: '0.5rem'}}>🛒</span>
                Cart
              </NavLink>
              <NavLink to="/purchases" onClick={closeMobileMenu}>
                Purchases
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMobileMenu}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={closeMobileMenu}>
                Register
              </NavLink>
            </>
          )}
        </Nav>

        {user && (
          <UserMenu>
            <UserButton
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <UserAvatar>
                {getUserInitials()}
              </UserAvatar>
              <span>{user.username}</span>
            </UserButton>
            
            <Dropdown 
              isOpen={userMenuOpen}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <DropdownItem to="/dashboard" onClick={() => setUserMenuOpen(false)}>Dashboard</DropdownItem>
              <DropdownItem to="/my-listings" onClick={() => setUserMenuOpen(false)}>My Listings</DropdownItem>
              <DropdownItem to="/cart" onClick={() => setUserMenuOpen(false)}>Cart</DropdownItem>
              <DropdownItem to="/purchases" onClick={() => setUserMenuOpen(false)}>Purchase History</DropdownItem>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </Dropdown>
          </UserMenu>
        )}

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✖️' : '☰'}
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

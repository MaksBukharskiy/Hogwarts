import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 280px;
  background: #E0F7FA;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.div`
  padding: 30px 20px 20px;
  border-bottom: 1px solid #B2EBF2;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  letter-spacing: 1px;
`;

const NavSection = styled.div`
  padding: 20px 0;
`;

const NavItem = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: ${props => props.active ? '#fff' : '#333'};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  background: ${props => props.active ? '#80CBC4' : 'transparent'};
  border-radius: ${props => props.active ? '8px' : '0'};
  margin: 0 15px 5px;

  &:hover {
    background: ${props => props.active ? '#80CBC4' : '#B2EBF2'};
    color: ${props => props.active ? '#fff' : '#333'};
  }
`;

const NavIcon = styled.span`
  margin-right: 12px;
  font-size: 16px;
`;

const DropdownIcon = styled.span`
  margin-left: auto;
  font-size: 12px;
`;

const Separator = styled.div`
  height: 1px;
  background: #B2EBF2;
  margin: 20px 15px;
`;

const CollapseButton = styled.button`
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: none;
  background: #f8f9fa;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  color: #666;

  &:hover {
    background: #e9ecef;
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContainer style={{ width: isCollapsed ? '60px' : '280px' }}>
      <Logo>
        <LogoText style={{ display: isCollapsed ? 'none' : 'block' }}>ХОГВАРДС</LogoText>
      </Logo>
      
      <NavSection>
        <NavItem to="/" active={location.pathname === '/'}>
          <NavIcon>🎓</NavIcon>
          {!isCollapsed && (
            <>
              Группы
              <DropdownIcon>▼</DropdownIcon>
            </>
          )}
        </NavItem>
        
        {!isCollapsed && (
          <>
            <NavItem to="/create-group" active={location.pathname === '/create-group'}>
              <NavIcon>➕</NavIcon>
              Новая группа
            </NavItem>
            <NavItem to="/" active={location.pathname === '/'}>
              <NavIcon>📋</NavIcon>
              Все группы
            </NavItem>
          </>
        )}
        
        <NavItem to="/add-student" active={location.pathname === '/add-student'}>
          <NavIcon>👤</NavIcon>
          {!isCollapsed && 'Добавить ученика'}
        </NavItem>
      </NavSection>

      <Separator style={{ display: isCollapsed ? 'none' : 'block' }} />
      
      <NavSection style={{ marginTop: 'auto', paddingBottom: '20px' }}>
        <NavItem to="/notifications" active={false}>
          <NavIcon>🔔</NavIcon>
          {!isCollapsed && 'Уведомления'}
        </NavItem>
      </NavSection>

      <CollapseButton onClick={toggleCollapse}>
        {isCollapsed ? '▶' : '◀'}
      </CollapseButton>
    </SidebarContainer>
  );
};

export default Sidebar;

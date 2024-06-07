'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../redux/slices/themesSlice';

const HeaderContainer = styled.header`
  width: 100%;
    padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  border-bottom: 1px solid  ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};

  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
  position: relative;
  z-index: 1001;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #bbb;
  text-decoration: none;
`;

const NormalText = styled.span`
  font-weight: normal;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: #444;
  margin: 0 10px;
`;

const NavLink = styled(({ isActive, children, ...props }: { isActive: boolean; href: string; children: React.ReactNode }) => (
  <Link {...props}>{children}</Link>
))`
  margin-left: 30px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  text-decoration: none;
  position: relative;
  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  }
  &:after {
    content: "";
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #0f62fe;
  }
`;

const BannerOptions = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  color: #bbb;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const InvisibleText = styled.div`
  visibility: hidden;
`;

const Sidebar = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 46px;
  right: 0px;
  height: 100%;
  width: 300px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  display: flex;
  flex-direction: column;
  padding: 0px;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarOption = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  position: relative;
  padding-left: 10px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border-left: ${({ $isActive }) => ($isActive ? '5px solid #0f62fe' : '5px solid transparent')};
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SidebarLink = styled(Link)`

color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
  margin: 10px 0;
  cursor: pointer;
`;

const SidebarDescription = styled.p`

  font-size: 11px;
  margin: 5px 0 15px 0;
  text-align: left;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #444;
  margin: 10px 0;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 999;
`;

interface HeaderProps {
  activeTopNav: string;
  activeSidebar: string;
  onTopNavClick: (option: string) => void;
  onSidebarClick: (option: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTopNav, activeSidebar, onTopNavClick, onSidebarClick }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).closest('.sidebar') === null &&
        (event.target as HTMLElement).closest('.icon') === null
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <HeaderContainer theme={theme}>
        <TitleContainer>
          <Title href="/">
            <NormalText>LILY </NormalText>
            <BoldText>QML</BoldText>
          </Title>
          <VerticalLine />
          <BannerOptions>
            <NavLink href="/lab/home" isActive={activeTopNav === 'home'} onClick={() => onTopNavClick('home')} theme={theme}>Home</NavLink>
            <NavLink href="/lab/jobs" isActive={activeTopNav === 'jobs'} onClick={() => onTopNavClick('jobs')} theme={theme}>Jobs</NavLink>
            <NavLink href="/lab/configuration" isActive={activeTopNav === 'configuration'} onClick={() => onTopNavClick('configuration')} theme={theme}>Configuration</NavLink>
            <NavLink href="/lab/monitoring" isActive={activeTopNav === 'monitoring'} onClick={() => onTopNavClick('monitoring')} theme={theme}>Monitoring</NavLink>
          </BannerOptions>
        </TitleContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
         
          <Icon className="icon" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
            <InvisibleText>Se</InvisibleText>
          </Icon>
        </div>
      </HeaderContainer>
      <Sidebar className="sidebar" $isOpen={isSidebarOpen} theme={theme}>
        <SidebarOption $isActive={activeSidebar === 'lab'} >
          <div>
            <SidebarLink href="/lab/home" onClick={() => onSidebarClick('lab')}  theme={theme}>LAB</SidebarLink>
            <SidebarDescription theme={theme}>Development environment for Quantum Machine Learning models</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption $isActive={activeSidebar === 'docs'}>
          <div>
            <SidebarLink href="#docs" onClick={() => onSidebarClick('docs')} theme={theme}>DOCS</SidebarLink>
            <SidebarDescription theme={theme}>Documentation about LILY and using the platform</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption $isActive={activeSidebar === 'road'}>
          <div>
            <SidebarLink href="#road" onClick={() => onSidebarClick('road')} theme={theme}>ROAD</SidebarLink>
            <SidebarDescription theme={theme}>Roadmap of the LILY QML project, information, contact, etc.</SidebarDescription>
          </div>
        </SidebarOption>
      </Sidebar>
      <Overlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
    </>
  );
};

export default Header;

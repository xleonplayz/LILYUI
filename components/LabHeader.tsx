'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFlask, faBook, faRoad } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../redux/slices/themesSlice';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};
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

const NavLink = styled(({ isActive, children, ...props }) => (
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

const Sidebar = styled.div`
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

const SidebarOption = styled(Link)`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  position: relative;
  padding-left: 20px;
   font-size: 13px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border-left: ${({ $isActive }) => ($isActive ? '5px solid #0f62fe' : '5px solid transparent')};
  text-decoration: none;
  &:hover {
    background-color:${({ theme }) => (theme === 'dark' ? 'rgba(255, 255, 255, 0.3);' : 'rgba(0, 0, 0, 0.1);')};   
  }
  div{
    display:flex;
    flex-direction:column;
  }
`;

const SidebarOptionz = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  font-size: 13px;
  position: relative;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
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

const Overlay = styled.div`
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
          {activeSidebar === 'lab' && (
            <>
            
            <NavLink href="/lab/home" isActive={activeTopNav === 'home'} onClick={() => onTopNavClick('home')} theme={theme}>Home</NavLink>
            <NavLink href="/lab/jobs" isActive={activeTopNav === 'jobs'} onClick={() => onTopNavClick('jobs')} theme={theme}>Jobs</NavLink>
            <NavLink href="/lab/configuration" isActive={activeTopNav === 'configuration'} onClick={() => onTopNavClick('configuration')} theme={theme}>Configuration</NavLink>
            <NavLink href="/lab/monitoring" isActive={activeTopNav === 'monitoring'} onClick={() => onTopNavClick('monitoring')} theme={theme}>Monitoring</NavLink>
            
            </>
                 )}
            {activeSidebar === 'docs' && (
              <>
                <NavLink href="/document/overview" isActive={activeTopNav === 'overview'} onClick={() => onTopNavClick('overview')} theme={theme}>Overview</NavLink>
                <NavLink href="/document/start" isActive={activeTopNav === 'start'} onClick={() => onTopNavClick('start')} theme={theme}>Start</NavLink>
                
                <NavLink href="/document/build" isActive={activeTopNav === 'build'} onClick={() => onTopNavClick('build')} theme={theme}>Build</NavLink>
                <NavLink href="/document/transpile" isActive={activeTopNav === 'transpile'} onClick={() => onTopNavClick('transpile')} theme={theme}>Transpilation</NavLink>

                
                <NavLink href="/document/verify" isActive={activeTopNav === 'verify'} onClick={() => onTopNavClick('verify')} theme={theme}>Verify</NavLink>
                
                <NavLink href="/document/run" isActive={activeTopNav === 'run'} onClick={() => onTopNavClick('run')} theme={theme}>Run</NavLink>

                <NavLink href="/document/apireference" isActive={activeTopNav === 'apireference'} onClick={() => onTopNavClick('apireference')} theme={theme}>API Reference </NavLink>


              </>
            )}
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
        <SidebarOptionz theme={theme}>Switch Application</SidebarOptionz>
        <SidebarOption href="/lab/home" $isActive={activeSidebar === 'lab'} onClick={() => onSidebarClick('lab')} theme={theme}>
          <div>
            <FontAwesomeIcon icon={faFlask} style={{ marginRight: '10px', position: 'absolute', right: '20px' }} /> LAB
            <SidebarDescription theme={theme}>Development environment for Quantum Machine Learning models</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption href="/document" $isActive={activeSidebar === 'docs'} onClick={() => onSidebarClick('docs')} theme={theme}>
          <div>
            <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px', position: 'absolute', right: '20px' }} /> DOCS
            <SidebarDescription theme={theme}>Documentation about LILY and using the platform</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption href="/road" $isActive={activeSidebar === 'road'} onClick={() => onSidebarClick('road')} theme={theme}>
          <div>
            <FontAwesomeIcon icon={faRoad} style={{ marginRight: '10px', position: 'absolute', right: '20px' }} /> ROAD
            <SidebarDescription theme={theme}>Roadmap of the LILY QML project, information, contact, etc.</SidebarDescription>
          </div>
        </SidebarOption>
      </Sidebar>
      <Overlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
    </>
  );
};

export default Header;

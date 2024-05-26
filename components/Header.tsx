"use client";

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #444;
  background-color: #2b272a; /* Neue Hintergrundfarbe */
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
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarOption = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
`;

const ActiveIndicator = styled.div`
  width: 5px;
  background-color: #0f62fe; /* Blau aus dem Bild */
  position: absolute;
  left: -10px;
  top: 0;
  bottom: 0;
`;

const SidebarLink = styled(Link)`
  color: #bbb;
  text-decoration: none;
  font-size: 18px;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const SidebarDescription = styled.p`
  color: #bbb;
  font-size: 14px;
  margin: 5px 0 15px 0;
  text-align: left;
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

export default function Header({ activeOption, onOptionClick }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('.sidebar') === null) {
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

  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          <Title href="/">
            <NormalText>LILY </NormalText>
            <BoldText>QML</BoldText>
          </Title>
        </TitleContainer>
        <Icon onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
          <InvisibleText>Se</InvisibleText>
        </Icon>
      </HeaderContainer>
      <Sidebar className="sidebar" $isOpen={isSidebarOpen}>
        <SidebarOption $isActive={activeOption === 'lab'}>
          {activeOption === 'lab' && <ActiveIndicator />}
          <div>
            <SidebarLink href="/home" onClick={() => onOptionClick('lab')}>LAB</SidebarLink>
            <SidebarDescription>Development environment for Quantum Machine Learning models</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption $isActive={activeOption === 'docs'}>
          {activeOption === 'docs' && <ActiveIndicator />}
          <div>
            <SidebarLink href="#docs" onClick={() => onOptionClick('docs')}>DOCS</SidebarLink>
            <SidebarDescription>Documentation about LILY and using the platform</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption $isActive={activeOption === 'road'}>
          {activeOption === 'road' && <ActiveIndicator />}
          <div>
            <SidebarLink href="#road" onClick={() => onOptionClick('road')}>ROAD</SidebarLink>
            <SidebarDescription>Roadmap of the LILY QML project, information, contact, etc.</SidebarDescription>
          </div>
        </SidebarOption>
      </Sidebar>
      <Overlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
    </>
  );
}

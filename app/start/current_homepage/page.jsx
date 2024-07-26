"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import backgroundImage from '@/assests/bgimg.png'; // Adjust the path as necessary

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
`;

const ContentSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: #e0e0e0;
  height: 87vh;
  background: url(${backgroundImage.src}) no-repeat right;
  background-size:60%;
  top:30px;
// padding:50px;
  right: -300px;
`;

const Maincontainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: #e0e0e0;
  height: 94vh;
`;

const TextContent = styled.div`
  width: 40%;
  padding: 0 5%;
  z-index: 1; // Ensure text is on top of the background

  position:absolute;
  top:150px;
  left:-200px;
  h1 {
    // font-size: 3rem;
    font-weight: 200;
    color: #000;
    // line-height:1.19rem;
            font-size: calc(3.375rem + .375*(100vw - 66rem)/16);

  }
span {
    display: block;
    font-weight: 300;
    background: linear-gradient(90deg, #e0e0e0, #ee5396);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 100%;
    font-size: calc(3.375rem + .375*(100vw - 66rem)/16);
  }

  button {
    margin-top: 50px;
    background-color: #343a3f;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    margin-right: 10px;

    &:hover {
      background-color: #333;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export default function HomePage() {
  const [activeTopNav, setActiveTopNav] = useState('start');
  const [activeSidebar, setActiveSidebar] = useState('docs');

  const handleTopNavClick = (option) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option) => {
    setActiveSidebar(option);
  };

  const theme = useSelector((state) => state.theme.theme);

  return (
    <Container theme={theme}>
      <Header
        activeTopNav={activeTopNav}
        activeSidebar={activeSidebar}
        onTopNavClick={handleTopNavClick}
        onSidebarClick={handleSidebarClick}
      />
      <Maincontainer>
        <ContentSection>
          <TextContent>
            <h1>The most popular quantum software,<br />
              <span>now even more powerful</span>
            </h1>
            <ButtonContainer>
              <button>Read the Qiskit SDK v1.0 announcement</button>
              <button>Watch the video</button>
            </ButtonContainer>
          </TextContent>
        </ContentSection>
      </Maincontainer>
      <Footer />
    </Container>
  );
}

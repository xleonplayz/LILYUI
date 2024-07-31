"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import backgroundImage from '@/assests/bgimg.png'; // Adjust the path as necessary
import ibmbg from '@/assests/ibmbg.png';
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from 'next/image';

// Import the SVG file from the public directory
import quantumg from '@/assests/quantum.svg';

import quantumnetwork from '@/assests/join-quantum-network-feature.jpeg';

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
  background-size: 60%;
  top: 30px;
  right: -300px;
`;

const Maincontainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  // background-color: #e0e0e0;
  
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#e0e0e0')};
  height: 94vh;
`;

const TextContent = styled.div`
  width: 40%;
  padding: 0 5%;
  z-index: 1; // Ensure text is on top of the background
  position: relative;
  top: 50px;
  left: -200px;

  h1 {
    font-weight: 200;
    // color: #000;

    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
    font-size: calc(3.375rem + .375*(100vw - 66rem)/16);
  }

  span {
    display: block;
    font-weight: 300;
    background: linear-gradient(90deg, #9b5cff 0%, #ee5396 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 100%;
    font-size: calc(3.375rem + .375*(100vw - 66rem)/16);
  }
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
  background-color: ${({ primary }) => (primary ? '#343a3f' : 'transparent')};
  color: ${({ primary }) => (primary ? '#ffff' : '#343a3f')};
  padding: 13px 20px;
  border: ${({ primary }) => (primary ? 'none' : 'none')};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#333' : 'transparent')};
    color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  }

  svg {
    margin-left: 5px;
  }
`;


const StyledButtonVideo = styled.button`
  background-color: ${({ primary }) => (primary ? '#343a3f' : 'transparent')};
 
color : ${({ theme }) => (theme === 'dark' ? '#fff' : '#343a3f')};
 padding: 13px 20px;
  border: ${({ primary }) => (primary ? 'none' : 'none')};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#333' : 'transparent')};
    color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  }

  svg {
    margin-left: 5px;
    
color : ${({ theme }) => (theme === 'dark' ? '#fff' : '#343a3f')};
  }
`;


const StyledButtonsvg = styled.button`
  background-color: ${({ primary }) => (primary ? '#343a3f' : 'transparent')};
  color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  padding: 13px 20px;
  border: ${({ primary }) => (primary ? 'none' : 'none')};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#333' : 'transparent')};
    color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  }

  svg {
    margin-left: 5px;
  }
`;

const StyledButtonIbm = styled.div`
  background-color: ${({ primary }) => (primary ? '#343a3f' : 'transparent')};
  color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  padding: 13px 20px;
  width: 120px;
  border: ${({ primary }) => (primary ? 'none' : 'none')};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#333' : 'transparent')};
    color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  }

  svg {
    margin-left: 5px;
    font-size: 20px;
  }
`;

const StyledButtonQuantum = styled.div`
  
color : ${({ theme }) => (theme === 'dark' ? '#fff' : '#343a3f')};
  padding: 13px 20px;
  width: 120px;
  border:1px solid   ${({ theme }) => (theme === 'dark' ? '#fff' : '#525252')};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#333' : 'transparent')};
    // color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  }

  svg {
    margin-left: 5px;
    font-size: 20px;
  }
`;

const NewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to the start for better control */
  margin: 6% 0;
  width: 100%;
  padding-left: 10%; /* Match the left padding of TextContent */

  h2 {
    font-weight: 100;
    width: 100%;
    padding: 0px;
    position: relative;
    top: 0px;
    left: 0px;
    font-size: calc(3.375rem + .375*(100vw - 66rem)/16);
    
    margin: 0px;
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};

    span {
      background: linear-gradient(90deg, #9b5cff 0%, #ee5396 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    font-size: 1rem;
    // color: #333;
    width: 30%;
    
    color: ${({ theme }) => (theme === 'dark' ? '#e0e0e0' : '#333')};
    max-width: 800px;
    margin: 3% 40%;
  }
`;

const IBMSection = styled.div`
  display: flex;
  flex-direction: row; /* Align items in a row */
  align-items: center; /* Center align items vertically */
  margin: 10% 0;
  padding-bottom: 5%;
  width: 80%;
  margin: auto;
  justify-content: space-around;

  .text {
    width: 50%;
    // padding-right: 5%; /* Add padding to the right */
    
    h2 {
      font-weight: 200;
      font-size: 2.625rem;
      margin: 0;
      // color: #161616;
      
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#161616')};
    }
    
    p {
      font-size: 1rem;
      
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#525252')};
      // color: #525252;
      margin: 20px auto;
    }
  }

  .image {
    width: 30%;
    display: flex;
    justify-content: center;
    
    img {
      width: auto;
      height: 100%;
      max-height: 500px; /* Ensure the image is displayed at its actual height */
      object-fit: contain;
    }
  }
`;

const QuantumSection = styled.div`
  display: flex;
  flex-direction: row; /* Align items in a row */
  align-items: center; /* Center align items vertically */
  margin: 10% 0;
  padding-bottom: 5%;
  width: 80%;
  margin: auto;
  justify-content: space-around;

  .text {
    width: 40%;
    
    h2 {
      font-weight: 200;
      font-size: 2.625rem;
      margin: 0;
      // color: #161616;

      //  color: ${({ primary }) => (primary ? '#fff' : '#161616')};
       
      color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#161616')};
 
    }
    
    p {
      font-size: 1rem;
      // color: #525252;
      color: ${({ theme }) => (theme === 'dark' ? '#e0e0e0' : '#525252')};
      //  color: ${({ theme }) => (theme ? '#e0e0e0' : '#525252')};
      margin: 20px auto;
      // padding-right:20px;
    }
  }

  .image {
    width: 50%;
    
    img {
      width: auto;
      height: 100%;
      max-height: 500px; /* Ensure the image is displayed at its actual height */
      object-fit: contain;
    }
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4% 0% 7% 10%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#1c1f23' : '#f4f4f4')};
  color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#000000')};
  // border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ccc')};

  .header {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .columns {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // margin: 0 10px;

      h3 {
        margin-bottom: 20px;
        font-size: .875rem;
        font-weight:600;
      }

      a {
        color: ${({ theme }) => (theme === 'dark' ? '#a9a9a9' : '#000')};
        text-decoration: none;
        margin-bottom: 10px;

        
        font-size:.875rem;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .column-footer {
    margin-top: 20px;
    font-size: 0.9rem;
    border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ccc')};
    padding-top: 20px;
    text-align: center;
  }
`;

const QuantumNetworkSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10% 0;
  // padding:0px  5%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#3a3a3a' : '#525252')};
  width: 100%;
  margin: auto;
  justify-content: center;

  .text {
    width: 40%;
    // padding:2rem;
    
    h2 {
      font-weight: 300;
      font-size:2.625rem;
      margin:0 auto;
      color:  ${({ theme }) => (theme === 'dark' ? '#fff' : '#fff')};
    }
    
    p {
      font-size: 1rem;
      color:  ${({ theme }) => (theme === 'dark' ? '#fff' : '#fff')};
      margin: 20px auto;
// width:600px;
padding:0px 100px 20px 0px; 
font-weight:400;
    }

    .button-container {
      display: flex;
      // gap: 10px;
      margin-top: 20px;
    }
  }

  .image {
    width: 40%;
    
    img {
      width: 100%;
      height: 100%;
      max-height: 600px;
      object-fit: contain;
    }
  }
`;




const StyledButtonNetwork = styled.button`
  background-color: ${({ primary }) => (primary ? '#343a3f' : 'transparent')};
  color: ${({ primary }) => (primary ? '#fff' : '#fff')};
  padding: 13px 20px;
  border: ${({ primary }) => (primary ? 'none' : 'none')};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    // background-color: ${({ primary }) => (primary ? '#333' : 'transparent')};
    color: ${({ primary }) => (primary ? '#fff' : '#000')};
  }

  svg {
    margin-left: 10px;
color:#fff;
    }
`;

const StyledButtonQuantumNetwork = styled.div`
  background-color: ${({ primary }) => (primary ? '#fff' : 'transparent')};
  color: ${({ primary }) => (primary ? '#161616' : '#161616')};
  padding: 12px 20px;
  // width: 120px;
  border: ${({ primary }) => (primary ? 'none' : 'none')};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    // background-color: ${({ primary }) => (primary ? '#333' : 'transparent')};
    // color: ${({ primary }) => (primary ? '#fff' : '#343a3f')};
  }

  svg {
    margin-left: 5px;
    font-size: 20px;
  }
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
      <Maincontainer theme={theme}>
        <ContentSection>
          <TextContent theme={theme}>
            <h1>The most intelligent quantum model,<br />
              <span>now even more powerful</span>
            </h1>
            <ButtonContainer theme={theme}>
              <StyledButtonsvg primary>Read the Qiskit SDK v1.0 announcement</StyledButtonsvg>
              <StyledButtonVideo theme={theme}>Watch the video <svg width="14" height="14" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg></StyledButtonVideo>
            </ButtonContainer>
          </TextContent>
        </ContentSection>
      </Maincontainer>
      <NewSection theme={theme}>
        <h2>Making the world <span>quantum safe</span></h2>
        <p>Quantum computers make most of the world’s existing encryption algorithms obsolete. IBM developed many of the foundational technologies that will secure the world in the quantum era, and now offers the tools and services needed to implement them.</p>
      </NewSection>

      <IBMSection theme={theme}>
        <div className="text">
          <h2>Start using Quantum Ki models <br />free</h2>
          <p>LILY provides a lot of power free of charge to test and partially train Quantum AI models. To get an insight into the Quantum AI world. LILY also offers a variety of documentation, explanatory videos and publications as free resources.</p>
          <StyledButtonIbm primary>Get started <MdOutlineArrowOutward /></StyledButtonIbm>
        </div>
        <div className="image">
          <Image src={ibmbg} alt="IBM Quantum Platform" />
        </div>
      </IBMSection>

      <QuantumSection theme={theme}>
        <div className="image">
          <Image src={quantumg} alt="Quantum Computing" />
        </div>
        <div className="text">
          <h2 theme={theme}>Our plans and task to improve LILY</h2>
          <p>We try to constantly improve and develop LILY through many parallel work areas and collaborations. Where exactly we are involved and what our tasks are.</p>
          <StyledButtonQuantum theme={theme}>Learn More <MdOutlineArrowOutward /></StyledButtonQuantum>
        </div>
      </QuantumSection>

      <QuantumNetworkSection theme={theme}>
        <div className="text">
          <h2>Join the LILY-Project</h2>
          <p>In order to continually develop LILY, we are always looking for collaborations and people who are interested in this area and would contribute.</p>
          <div className="button-container">
            <StyledButtonQuantumNetwork primary>Learn more</StyledButtonQuantumNetwork>
            <StyledButtonNetwork>Hear from the Network <svg width="14" height="14" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg></StyledButtonNetwork>
          </div>
        </div>
        <div className="image">
          <Image src={quantumnetwork} alt="Quantum Computing" />
        </div>
      </QuantumNetworkSection>

      <FooterSection theme={theme}>
        <div className="header">IBM Quantum</div>
        <div className="columns">
          <div className="column">
            <h3>Featured</h3>
            <a href="#">Technology</a>
            <a href="#">IBM Quantum Safe</a>
            <a href="#">IBM Quantum Network</a>
            <a href="#">Research</a>
          </div>
          <div className="column">
            <h3>Get access</h3>
            <a href="#">Pricing</a>
            <a href="#">IBM Quantum Platform</a>
          </div>
          <div className="column">
            <h3>Get started</h3>
            <a href="#">Qiskit</a>
            <a href="#">Documentation</a>
            <a href="#">Learning</a>
          </div>
          <div className=" column">
            <h3>Stay connected</h3>
            <a href="#">Blog</a>
            <a href="#">LinkedIn</a>
            <a href="#">YouTube</a>
            <a href="#">Community</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </FooterSection>

      <Footer />
    </Container>
  );
}

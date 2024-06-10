"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
// import { FaCopy, FaCheck, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Häkchen und Kreuze
import { useSelector } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../../../redux/slices/themesSlice';

import { FaArrowRight } from 'react-icons/fa';
import { FaPlay, FaWrench, FaCompressArrowsAlt, FaCheck, FaServer } from 'react-icons/fa';

import './style.css'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 150vh;
  width: 100%;
  // background-color: #121619; /* Neue Hintergrundfarbe für Konsistenz */
  overflow-x: hidden;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
`;

const Main = styled.main`

  }
`;




const Upper = styled.div`
display:block;
// margin:20px;
width:95%;
margin:20px auto; 



  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};



`;



const Lower = styled.div`
display:block;
margin:3% auto;
width:100%;
// padding:20px;
// margin:20px auto; 

height:80vh;


  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f4f4f4')};



`;
const LowerInner = styled.div`
width:95%;
margin:20px auto; 
`


const DocTitle = styled.h1`

    font-weight: 300;

    font-size: 3rem;

    margin-bottom: 1.5rem;
    
      color: ${({ theme }) => (theme === 'dark' ? '#f2f4f8' : '#161616')};


`;
const DocPara = styled.div`
    font-size: .875rem;
    line-height: 1.42857;
    letter-spacing: .16px;

    max-width: 500px;
    font-weight: 400;




      color: ${({ theme }) => (theme === 'dark' ? 'c1c7cd' : '#525252')};
    color: #c1c7cd;



`;
const Box1 = styled.div`
width:25%;
    // background-size: 140% 140%;
    // background-position: 50% 50%;
        height: 200px;
        background-color:blue;
display:flex;
flex-direction:column;
justify-content:flex-start;
margin-top:20px;

`

const InnerBox = styled.div`


`
const InnerEndBox = styled.div`
postion:absolute;
bottom:1px;


`


export default function HomePage() {


  const [activeTopNav, setActiveTopNav] = useState('home');
  const [activeSidebar, setActiveSidebar] = useState('docs');

  const handleTopNavClick = (option: string) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option: string) => {
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


      {/* <Main> */}

      <Upper theme={theme}>
        <DocTitle theme={theme}>
          Document
        </DocTitle>
        <DocPara theme={theme}>
          Whether you are ready to code your first circuit or execute a large research workload, you can find documentation for using Qiskit and IBM Quantum hardware at the links below.
        </DocPara>


        {/* <Box1>

            <InnerBox>
              <h1> get Started with quick</h1>
              <p>
                run the hello world
              </p>
            </InnerBox>


            <InnerEndBox>
            <FaArrowRight className="arrow-icon" />
            </InnerEndBox>
          </Box1> */}

        <div className="main-boxdiv">

          <div className="info-box">
            <div className="text-content">
              <h1>Get started with Qiskit</h1>
              <p>Run the Hello World</p>
            </div>
            <div className="arrow-icon">
              <FaArrowRight />
            </div>
          </div>



          <div className='right-box'>

            <div className="right-info-box">
              <div className="text-content">
                <h1>Start</h1>
                <p>Set up and install  to use Qiskit</p>
              </div>
              <div className="arrow-icon">
                <FaPlay />
              </div>
            </div>



            <div className="right-info-box">
              <div className="text-content">
                <h1>Start</h1>
                <p>Set up and install  to use Qiskit</p>
              </div>
              <div className="arrow-icon">
                <FaWrench />
              </div>
            </div>

            <div className="right-info-box">
              <div className="text-content">
                <h1>Start</h1>
                <p>Set up and install  to use Qiskit</p>
              </div>
              <div className="arrow-icon">
                <FaCompressArrowsAlt />
              </div>
            </div>

            <div className="right-info-box">
              <div className="text-content">
                <h1>Start</h1>
                <p>Set up and install  to use Qiskit</p>
              </div>
              <div className="arrow-icon">
                <FaCheck />
              </div>
            </div>
            <div className="right-info-box">
              <div className="text-content">
                <h1>Start</h1>
                <p>Set up and install  to use Qiskit</p>
              </div>
              <div className="arrow-icon">
                <FaServer />
              </div>
            </div>
          </div>
        </div>

      </Upper>




      <Lower theme={theme}>
        <LowerInner>
          <DocTitle theme={theme}>
            Document
          </DocTitle>
          <DocPara theme={theme}>
            Whether you are ready to code your first circuit or execute a large research workload, you can find documentation for using Qiskit and IBM Quantum hardware at the links below.
          </DocPara>


          {/* <Box1>

            <InnerBox>
              <h1> get Started with quick</h1>
              <p>
                run the hello world
              </p>
            </InnerBox>


            <InnerEndBox>
            <FaArrowRight className="arrow-icon" />
            </InnerEndBox>
          </Box1> */}

          <div className="main-boxdiv">

            <div className="info-box">
              <div className="text-content">
                <h1>Get started with Qiskit</h1>
                <p>Run the Hello World</p>
              </div>
              <div className="arrow-icon">
                <FaArrowRight />
              </div>
            </div>



            <div className='right-box'>

              <div className="right-info-box">
                <div className="text-content">
                  <h1>Start</h1>
                  <p>Set up and install  to use Qiskit</p>
                </div>
                <div className="arrow-icon">
                  <FaPlay />
                </div>
              </div>



              <div className="right-info-box">
                <div className="text-content">
                  <h1>Start</h1>
                  <p>Set up and install  to use Qiskit</p>
                </div>
                <div className="arrow-icon">
                  <FaWrench />
                </div>
              </div>

              <div className="right-info-box">
                <div className="text-content">
                  <h1>Start</h1>
                  <p>Set up and install  to use Qiskit</p>
                </div>
                <div className="arrow-icon">
                  <FaCompressArrowsAlt />
                </div>
              </div>

              <div className="right-info-box">
                <div className="text-content">
                  <h1>Start</h1>
                  <p>Set up and install  to use Qiskit</p>
                </div>
                <div className="arrow-icon">
                  <FaCheck />
                </div>
              </div>
              <div className="right-info-box">
                <div className="text-content">
                  <h1>Start</h1>
                  <p>Set up and install  to use Qiskit</p>
                </div>
                <div className="arrow-icon">
                  <FaServer />
                </div>
              </div>
            </div>
          </div>
        </LowerInner>
      </Lower>
      {/* </Main> */}
      <Footer />
    </Container>
  );
}

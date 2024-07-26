"use client";

import styled from 'styled-components';
import Header from '../../components/LabHeader';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaPlay, FaWrench, FaCompressArrowsAlt, FaCheck, FaServer } from 'react-icons/fa';

import './style.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // height: 160vh;
  width: 100%;
  overflow-x: hidden;
  padding:0;
margin:0;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
`;

const Upper = styled.div`
  display: block;
  width: 95%;
  margin: 20px auto;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
`;

const Lower = styled.div`
  display: block;
  margin: 3% auto;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
`;

const LowerInner = styled.div`
  width: 95%;
  margin: 2% auto;
`;
// 21272a
// 
const DocTitle = styled.h1`
  font-weight: 300;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => (theme === 'dark' ? '#f2f4f8' : '#161616')};
`;

const DocPara = styled.div`
  font-size: 0.875rem;
  line-height: 1.42857;
  letter-spacing: 0.16px;
  max-width: 500px;
  font-weight: 400;
  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#525252')};
`;

const ApiTitle = styled.h1`
    font-size: 1.75rem;
    font-weight: 400;
    line-height: 1.28572;
    width:100%;
    letter-spacing: 0;
  color: ${({ theme }) => (theme === 'dark' ? '#f2f4f8' : '#161616')};
`;


const TutTitle = styled.h1`
  font-size: 1.75rem;
font-weight: 400;
line-height: 1.28572;
letter-spacing: 0;
  color: ${({ theme }) => (theme === 'dark' ? '#f2f4f8' : '#161616')};
`;


const ApiPara = styled.div`
    font-size: .875rem;
    line-height: 1.42857;
    letter-spacing: .16px; 

  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#525252')};
`;

const ApiParaLink = styled.div`
font-size: .875rem;
line-height: 2.42857;
letter-spacing: .16px;

  color: ${({ theme }) => (theme === 'dark' ? '#0f62fe' : '#0f62fe')};
`;


const RightBoxApi = styled.div`
 
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  
    &:hover{
  

  background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};
  }
`;
const RightBoxDoc = styled.div`
 
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
    &:hover{
  

  background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};
  }
  
`;


const RightBoxTut = styled.div`
 
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};

  &:hover{
  

  background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};
  }
  h2{
  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#161616')};}
  p{
  
  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#525252')};}
  }
  
  .arrow-icon{
  button{
  
  background-color: ${({ theme }) => (theme === 'dark' ? '#4d5358' : '#e0e0e0')};
  
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#525252')};}
  }
  }
`;

const Apicontent = styled.div`

h1{
  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#161616')};}
  p{
  
  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#525252')};}
  }
`

const DocContent = styled.div`

h1{
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#161616')};}
  p{
  
  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#525252')};}
  }
`


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

      <Upper theme={theme}>
        <DocTitle theme={theme}>Documentation</DocTitle>
        <DocPara theme={theme}>
          Whether you are ready to code your first circuit or execute a large research workload, you can find documentation for using Qiskit and IBM Quantum hardware at the links below.
        </DocPara>

        <div className="main-boxdiv">
          <div className="info-box">
            <div className="text-content">
              <h1>Get started with Qiskit</h1>
              <p>Run the Hello World</p>
            </div>
            <div className="arrow-iconz">
              <FaArrowRight />
            </div>
          </div>

          <div className="right-box">
            <RightBoxDoc className="right-info-box" theme={theme}>
              <DocContent className="text-content-right" theme={theme}>
                <h1>Start</h1>
                <p>Set up and install to use Qiskit</p>
              </DocContent>
              <div className="arrow-icon">
                <FaPlay />
              </div>
            </RightBoxDoc>

            <RightBoxDoc className="right-info-box" theme={theme}>
              <DocContent className="text-content-right" theme={theme}>
                <h1>Build</h1>
                <p>Design and develop quantum  circuits</p>
              </DocContent>
              <div className="arrow-icon">
                <FaWrench />
              </div>
            </RightBoxDoc>

            <RightBoxDoc className="right-info-box" theme={theme}>
              <DocContent className="text-content-right" theme={theme}>
                <h1>Transpile</h1>
                <p>Optimize circuits to efficiently run on hardware</p>
              </DocContent>
              <div className="arrow-icon">
                <FaCompressArrowsAlt />
              </div>
            </RightBoxDoc>

            <RightBoxDoc className="right-info-box" theme={theme}>
              <DocContent className="text-content-right" theme={theme}>
                <h1>Verify</h1>
                <p>Validate and evaluate  your quantum </p>
              </DocContent>
              <div className="arrow-icon">
                <FaCheck />
              </div>
            </RightBoxDoc>

            <RightBoxDoc className="right-info-box" theme={theme}>
              <DocContent className="text-content-right" theme={theme}>
                <h1>Start</h1>
                <p>Set up and install to use Qiskit</p>
              </DocContent>
              <div className="arrow-icon">
                <FaServer />
              </div>
            </RightBoxDoc>
          </div>
        </div>
      </Upper>

      <Lower theme={theme}>
        <LowerInner>


          <div className="main-boxdiv-lower">
            <div className="Api-box">
              <ApiTitle theme={theme}>API Reference </ApiTitle>
              <ApiPara theme={theme}>
                Guidance on how to use our key APIs
              </ApiPara>
            </div>

            <div className="right-box">
              <RightBoxApi className="right-info-box" theme={theme}>
                <Apicontent className="text-content-right" theme={theme}>
                  <h1>Start</h1>
                  <p>Set up and install to use Qiskit</p>
                </Apicontent>
                <div className="arrow-icon">
                  <FaPlay />
                </div>
              </RightBoxApi>

              <RightBoxApi className="right-info-box" theme={theme}>
                <Apicontent className="text-content-right" theme={theme}>
                  <h1>Start</h1>
                  <p>Set up and install to use Qiskit</p>
                </Apicontent>
                <div className="arrow-icon">
                  <FaWrench />
                </div>
              </RightBoxApi>

              <RightBoxApi className="right-info-box" theme={theme}>
                <Apicontent className="text-content-right" theme={theme}>
                  <h1>Start</h1>
                  <p>Set up and install to use Qiskit</p>
                </Apicontent>
                <div className="arrow-icon">
                  <FaCompressArrowsAlt />
                </div>
              </RightBoxApi>

              <RightBoxApi className="right-info-box" theme={theme}>
                <Apicontent className="text-content-right" theme={theme}>
                  <h1>Start</h1>
                  <p>Set up and install to use Qiskit</p>
                </Apicontent>
                <div className="arrow-icon">
                  <FaCheck />
                </div>
              </RightBoxApi>

              <RightBoxApi className="right-info-box" theme={theme}>
                <Apicontent className="text-content-right" theme={theme}>
                  <h1>Start</h1>
                  <p>Set up and install to use Qiskit</p>
                </Apicontent>
                <div className="arrow-icon">
                  <FaServer />
                </div>
              </RightBoxApi>
              <RightBoxApi className="right-info-box" theme={theme}>
                <Apicontent className="text-content-right" theme={theme}>
                  <h1>Start</h1>
                  <p>Set up and install to use Qiskit</p>
                </Apicontent>
                <div className="arrow-icon">
                  <FaPlay />
                </div>
              </RightBoxApi>
            </div>



          </div>
        </LowerInner>
        <LowerInner>

          <div className="main-boxdiv-lower">

            <div className="tut-box">
              <TutTitle theme={theme}>Tutorial  </TutTitle>
              <ApiPara theme={theme}>
                Explore utility-grade algorithms and applications with Qiskit Runtime


              </ApiPara>
              <ApiParaLink theme={theme}>
                View all in learning


              </ApiParaLink>
            </div>

            <div className="right-box">
              <RightBoxTut className="right-info-box" theme={theme}>
                <div className="text-content-right">
                  <h2>How to </h2>
                  <p>Submit transpiled circuits</p>
                </div>
                <div className="arrow-icon">
                  <button>Transpilation</button>
                </div>
              </RightBoxTut>

              <RightBoxTut className="right-info-box" theme={theme}>
                <div className="text-content-right">
                  <h2>Work flow example</h2>
                  <p>CHSH Inequality</p>
                </div>
                <div className="arrow-icon">
                  <button>Qiskit Pattermn</button>
                </div>
              </RightBoxTut>

              <RightBoxTut className="right-info-box" theme={theme}>
                <div className="text-content-right">
                  <h2>Work flow example</h2>
                  <p>Quantum approximate optimzation algorithm</p>
                </div>
                <div className="arrow-icon">
                  <button>Scheduling</button>
                </div>
              </RightBoxTut>



            </div>
          </div>
        </LowerInner>
      </Lower>
      <Footer />
    </Container>
  );
}

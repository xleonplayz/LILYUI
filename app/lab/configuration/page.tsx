"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  overflow-x: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 3%;
  padding: 0;
`;

const LeftSide = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  // padding: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
   padding: 10px ;
`;

const Card = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div:first-child {
    padding: 20px;
  }
`;

const CardHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CardBadge = styled.span`
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border-radius: 12px;
  padding: 5px 10px;
  font-size: 0.8rem;
`;
const CardBadgeV = styled.span`
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#bae6ff')};
  color: ${({ theme }) => (theme === 'dark' ? '#a4d4ff' : '#053e71')};
  border-radius: 12px;
  padding: 5px 10px;
  font-size: 0.8rem;
`;

const CardBody = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#ccc' : '#333')};
  margin-bottom: 20px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  // padding-top: 10px;
  height:50px;
`;

const LessonsCount = styled.div`
  display: flex;
  align-items: center;
 width:35%;
 margin:20px;
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#ccc' : '#333')};
`;

const StartCourseLink = styled.a`
  font-size: 1rem;
  color: #0e62fe;
  text-align:left;
  
 margin:10px;
  width:65%;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;

const VerticalLine = styled.div`
  height: 50px;
  width: 1px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  // margin: 0 10px;
`;

const RightSide = styled.div`
  width: 30%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StepIndicator = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#4d5357' : '#fff')};
  box-sizing: border-box;
  height: 50px;
`;

const ButtonC = styled.button`
  background-color: ${({ theme }) => (theme === 'dark' ? '#393939' : '#e0e0e0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  width: 33.25%;
  cursor: pointer;
  margin: 0;
  height: 100%;
`;

const ButtonB = styled.button`
  background-color: ${({ theme }) => (theme === 'dark' ? '#393939' : '#e0e0e0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  width: 33.25%;
  cursor: pointer;
  margin: 0;
  height: 100%;
`;

const ButtonN = styled.button`
  background-color: ${({ theme }) => (theme === 'dark' ? '#0e62fe' : '#0e62fe')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  width: 33.25%;
  cursor: pointer;
  margin: 0;
  height: 100%;
`;

export default function HomePage() {
  const theme = useSelector((state) => state.theme.theme);
  const [activeTopNav, setActiveTopNav] = useState('configuration');
  const [activeSidebar, setActiveSidebar] = useState('lab');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleTopNavClick = (option: string) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option: string) => {
    setActiveSidebar(option);
  };

  return (
    <Container theme={theme}>
      <Header
        activeTopNav={activeTopNav}
        activeSidebar={activeSidebar}
        onTopNavClick={handleTopNavClick}
        onSidebarClick={handleSidebarClick}
      />
      <MainContent>
        <LeftSide theme={theme}>
          <CardGrid>
            <Card theme={theme}>
              <div>
                <CardHeader>Basics of Quantum Information</CardHeader>
                <BadgeContainer>
                
                  <CardBadge theme={theme}>Badge</CardBadge>
                  <CardBadgeV theme={theme} color="#a4d4ff">Video</CardBadgeV>
                </BadgeContainer>
                <CardBody theme={theme}>
                  A detailed course covering mathematical aspects of quantum computing, comparable to an advanced undergraduate or introductory...
                </CardBody>
              </div>
              <CardFooter>
                <LessonsCount theme={theme}>
                  <span>Lessons 4</span>
                </LessonsCount>
                <VerticalLine theme={theme} />
                <StartCourseLink href="#">Start course →</StartCourseLink>
              </CardFooter>
            </Card>
            <Card theme={theme}>
              <div>
                <CardHeader>Fundamentals of Quantum Algorithms</CardHeader>
                <BadgeContainer>
                
                <CardBadgeV theme={theme} color="#a4d4ff">Video</CardBadgeV>
                </BadgeContainer>
                <CardBody theme={theme}>
                  Use quantum computers to solve problems more efficiently, including problems with real-world relevance such as searching and...
                </CardBody>
              </div>
              <CardFooter>
                <LessonsCount theme={theme}>
                  <span>Lessons 4</span>
                </LessonsCount>
                <VerticalLine theme={theme} />
                <StartCourseLink href="#">Start course →</StartCourseLink>
              </CardFooter>
            </Card>
            <Card theme={theme}>
              <div>
                <CardHeader>Variational Algorithm Design</CardHeader>
                <BadgeContainer>
                  <CardBadge theme={theme}>Badge</CardBadge>
                </BadgeContainer>
                <CardBody theme={theme}>
                  This course covers variational algorithms, hybrid classical quantum algorithms which play to the strengths of current quantum...
                </CardBody>
              </div>
              <CardFooter>
                <LessonsCount theme={theme}>
                  <span>Lessons 7</span>
                </LessonsCount>
                <VerticalLine theme={theme} />
                <StartCourseLink href="#">Start course →</StartCourseLink>
              </CardFooter>
            </Card>
            <Card theme={theme}>
              <div>
                <CardHeader>Quantum Computing in Practice</CardHeader>
                <BadgeContainer>
                  <CardBadge theme={theme}>New</CardBadge>
                
                  <CardBadgeV theme={theme} color="#a4d4ff">Video</CardBadgeV>
                </BadgeContainer>
                <CardBody theme={theme}>
                  Learn about realistic potential use cases for quantum computing and best practices for experimenting with quantum processors...
                </CardBody>
              </div>
              <CardFooter>
                <LessonsCount theme={theme}>
                  <span>Lessons 2</span>
                </LessonsCount>
                <VerticalLine theme={theme} />
                <StartCourseLink href="#">Start course →</StartCourseLink>
              </CardFooter>
            </Card>
          </CardGrid>
          <ButtonContainer theme={theme}>
            <ButtonC theme={theme}>Cancel</ButtonC>
            <ButtonB theme={theme} onClick={handleBack}>Back</ButtonB>
            <ButtonN theme={theme} onClick={handleNext}>Next</ButtonN>
          </ButtonContainer>
        </LeftSide>
        <RightSide theme={theme}>
          <StepIndicator>Step {step}/5</StepIndicator>
        </RightSide>
      </MainContent>
      <Footer />
    </Container>
  );
}

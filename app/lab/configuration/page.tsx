"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';

import {  useSelector } from 'react-redux';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  // background-color: #121619; /* Noch dunklerer Grauton */
  background-color:   ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  overflow-x: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const LeftSide = styled.div`
  width: 45%; /* Weniger breit */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  
  border-left: 0.25px solid  ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')}; /* Dünnerer und dunklerer grauer Trennstrich */
`;

const RightSide = styled.div`
  width: 55%; /* Angepasst, um den Platz auszugleichen */
  padding: 20px;
  box-sizing: border-box;
  border-left: 0.25px solid  ${({ theme }) => (theme === 'dark' ? '#444' : '#ffff')}; /* Dünnerer und dunklerer grauer Trennstrich */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  background-color:   ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
  // background-color:#121619;
`;

const TopRightSegment = styled.div`
  height: 33.33%; /* Ein Drittel der Höhe */
  border-bottom: 0.25px solid #444; /* Dünnere Trennlinie */
  display: flex;
  padding: 20px;
`;

const BottomRightSegment = styled.div`
  height: 66.66%; /* Zwei Drittel der Höhe */
`;

const Box = styled.div`
  width: 65%; /* Etwas breiter */
  height: 140px; /* Etwas höhere Boxen */
  margin: 20px 0;
  
  background-color:   ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  // background-color: #21272a; /* Neuer Grauton für die Boxen */
  // color: #fff;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-size: 18px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: 14px;
  // color: #bbb; /* Farbe der Beschriftung */
  
  color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};

`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 0.25px;
  // background-color: #444; /* Dünnerer und dunklerer grauer Strich */
  
  background-color:   ${({ theme }) => (theme === 'dark' ? '#444' : '#fff')};

  margin: 10px 0;
`;

const Segment = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 50px); /* Höhe abzüglich Header und Linien */
`;

const LeftSegment = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RightSegment = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const VerticalLine = styled.div`
  width: 0.25px;
  background-color:  ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};

`;

const Description = styled.div`
  font-size: 12px;
  color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};

  margin-bottom: 10px;
`;

const UploadButton = styled.button`
  background-color: transparent; /* Transparenter Button */

  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: 1px solid #888;
  padding: 5px 20px; /* Angepasste Button-Größe */
  font-size: 14px;
  cursor: pointer;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #888; /* Dunkelgrauer Pfeil */
  margin: 10px 0;
`;

const VerificationList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const VerificationItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const VerificationDots = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 5px; /* Weniger Abstand zwischen den Spalten */
`;

const Item = styled.div`
  font-size: 14px;
  color: #bbb;
  margin-bottom: 10px;
`;

export default function HomePage() {
  const theme = useSelector((state) => state.theme.theme);
  const [activeTopNav, setActiveTopNav] = useState('home');
  const [activeSidebar, setActiveSidebar] = useState('lab');

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
          <Box theme={theme}>
            <BoxHeader>
              <Label theme={theme}>Model Type</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description theme={theme}>
                  <p>Please select the model type</p>
                  <p>and upload your file.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton theme={theme}>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
          <Arrow />
          <Box theme={theme}>
            <BoxHeader>
              <Label theme={theme}>Box 2</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description theme={theme}>
                  <p>Description for Box 2</p>
                  <p>Additional information.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton theme={theme}>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
          <Arrow />
          <Box theme={theme}>
            <BoxHeader>
              <Label theme={theme}>Box 3</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description theme={theme}>
                  <p>Description for Box 3</p>
                  <p>Additional information.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton theme={theme}>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
          <Arrow />
          <Box theme={theme}>
            <BoxHeader >
              <Label theme={theme}>Box 4</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description theme={theme}>
                  <p>Description for Box 4</p>
                  <p>Additional information.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton theme={theme}>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
        </LeftSide>
        <RightSide theme={theme}>
          <TopRightSegment>
            <VerificationList>
              <VerificationItems theme={theme}>
                <Item>Verify Model Configuration</Item>
                <Item>Verify Training set</Item>
                <Item>Verify Backend</Item>
                <Item>Verify Values</Item>
                <Item>Complete Verification</Item>
              </VerificationItems>
              <VerificationDots>
                <Item>...</Item>
                <Item>...</Item>
                <Item>...</Item>
                <Item>...</Item>
                <Item>...</Item>
              </VerificationDots>
            </VerificationList>
          </TopRightSegment>
          <BottomRightSegment>
            {/* Inhalt des unteren Segments */}
          </BottomRightSegment>
        </RightSide>
      </MainContent>
      <Footer />
    </Container>
  );
}

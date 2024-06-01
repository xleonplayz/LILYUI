"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #181818; /* Noch dunklerer Grauton */
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
`;

const RightSide = styled.div`
  width: 55%; /* Angepasst, um den Platz auszugleichen */
  padding: 20px;
  box-sizing: border-box;
  border-left: 0.25px solid #444; /* Dünnerer und dunklerer grauer Trennstrich */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  background-color: #2b272a; /* Neuer Grauton für die Boxen */
  color: #fff;
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
  color: #bbb; /* Farbe der Beschriftung */
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 0.25px;
  background-color: #444; /* Dünnerer und dunklerer grauer Strich */
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
  background-color: #444; /* Dünnerer und dunklerer grauer vertikaler Strich */
`;

const Description = styled.div`
  font-size: 12px;
  color: #bbb;
  margin-bottom: 10px;
`;

const UploadButton = styled.button`
  background-color: transparent; /* Transparenter Button */
  color: #fff;
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
  return (
    <Container>
      <Header activeOption="home" onOptionClick={() => {}} />
      <MainContent>
        <LeftSide>
          <Box>
            <BoxHeader>
              <Label>Model Type</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description>
                  <p>Please select the model type</p>
                  <p>and upload your file.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
          <Arrow />
          <Box>
            <BoxHeader>
              <Label>Box 2</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description>
                  <p>Description for Box 2</p>
                  <p>Additional information.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
          <Arrow />
          <Box>
            <BoxHeader>
              <Label>Box 3</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description>
                  <p>Description for Box 3</p>
                  <p>Additional information.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
          <Arrow />
          <Box>
            <BoxHeader>
              <Label>Box 4</Label>
            </BoxHeader>
            <HorizontalLine />
            <Segment>
              <LeftSegment>
                <Description>
                  <p>Description for Box 4</p>
                  <p>Additional information.</p>
                </Description>
              </LeftSegment>
              <VerticalLine />
              <RightSegment>
                <UploadButton>Upload</UploadButton>
              </RightSegment>
            </Segment>
          </Box>
        </LeftSide>
        <RightSide>
          <TopRightSegment>
            <VerificationList>
              <VerificationItems>
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

"use client";

import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #2b272a;
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;  // Zentriert den Inhalt
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #2b272a;
  position: relative;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 100;
  color: white; /* Normal weiß */
  margin-right: 20px; /* Abstand zwischen Titel und Trennstrich */
`;

const Divider = styled.div`
  height: 40px;
  width: 2px;
  background-color: #ccc; /* Grauer Trennstrich */
  margin-right: 20px; /* Abstand zwischen Trennstrich und Statusinformationen */
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #ccc; /* Grauer Text */
  margin-right: 20px; /* Abstand zwischen Statusinformationen und LilyQML */
`;

const Executed = styled.div`
  font-size: 1rem;
  color: #ccc; /* Grauer Text */
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Kleiner Abstand zu On Target */
`;

const ExecutedIcon = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 0, 80% 0, 36% 74%);
  margin-left: 5px;
`;

const OnTarget = styled.div`
  font-size: 1rem;
  color: #ccc; /* Grauer Text */
  display: flex;
  align-items: center;
`;

const OnTargetIcon = styled.div`
  width: 10px;
  height: 10px;
  border: 2px solid white;
  border-radius: 50%;
  border-top: 2px solid transparent;
  margin-left: 5px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LilyQML = styled.div`
  font-size: 2rem; /* Größere Schriftgröße */
  color: #ccc; /* Grauer Text */
  position: absolute;
  right: 200px; /* Weiter nach links verschoben */
`;

const BoldQML = styled.span`
  font-weight: bold;
`;

const HorizontalDivider = styled.div`
  position: absolute;
  top: 200px;
  left: 15%;
  width: 75%;
  height: 1px;
  background-color: lightgrey; /* Grauer und dünner */
`;

const MilestoneContainer = styled.div`
  position: absolute;
  top: 160px;
  left: 15%;
  width: 75%;
  display: flex;
  justify-content: space-between;
`;

const Milestone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #ccc; /* Grauer Text */
`;

const MilestoneText = styled.div`
  font-size: 2rem; /* Größere Schriftgröße für M */
  display: flex;
  align-items: center;
`;

const MilestoneSubText = styled.div`
  font-size: 1rem; /* Kleinere Schriftgröße für (1/2) und (2/2) */
  margin-left: 5px;
`;

const MilestoneDescription = styled.div`
  font-size: 0.8rem; /* Kleinerer Text unter den Meilensteinen */
  margin-top: 20px; /* Größerer Abstand über der Beschreibung */
`;

const Sidebar = styled.div`
  position: absolute;
  top: 350px; /* Tiefer gesetzt */
  left: 80px; /* Weiter rechts */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #ccc; /* Grauer Text */
  font-size: 1.2rem;
`;

const Frontend = styled.div`
  margin-bottom: 7rem; /* Mehr Abstand zu Backend */
`;

const Model = styled.div`
  margin-top: 7rem; /* Mehr Abstand zu Backend */
`;

const TableContainer = styled.div`
  position: absolute;
  top: 330px; /* Höher gesetzt */
  left: 15%;
  width: 75%;
  color: #ccc; /* Grauer Text */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #ccc; /* Grauer Text */
  table-layout: fixed; /* Alle Zellen gleich groß */
`;

const Th = styled.th`
  border: 1px solid #ccc; /* Graue Rahmen */
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ccc; /* Graue Rahmen */
  padding: 8px;
  text-align: left;
  height: 7rem; /* Höhere Zeilen */
`;

const PinkTd = styled(Td)`
  background-color: #eb34e8; /* Angegebener Pinkton */
  color: black;
`;

const LighterPinkTd = styled(Td)`
  background-color: #f19bf1; /* Hellerer Pinkton */
  color: black;
`;

const LightestPinkTd = styled(Td)`
  background-color: #f6d1f6; /* Hellster Pinkton */
  color: black;
`;

const SmallText = styled.small`
  display: block;
  margin-top: 5px;
`;

const WhiteCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  margin-left: 5px;
`;

export default function HomePage() {
  const handleOptionClick = (option: string) => {
    // Option click handler
  };

  return (
    <Container>
      <Header activeOption="home" onOptionClick={handleOptionClick} />
      <TitleContainer>
        <LeftContainer>
          <Title>Development Roadmap</Title>
          <Divider />
          <StatusContainer>
            <Executed>
              Executed
              <ExecutedIcon />
            </Executed>
            <OnTarget>
              on target
              <OnTargetIcon />
            </OnTarget>
          </StatusContainer>
        </LeftContainer>
        <LilyQML>
          LILY <BoldQML>QML</BoldQML>
        </LilyQML>
        <HorizontalDivider />
        <MilestoneContainer>
          <Milestone>
            <MilestoneText>M1<MilestoneSubText>(1/2)</MilestoneSubText></MilestoneText>
            <MilestoneDescription>Text unter M1 (1/2)</MilestoneDescription>
          </Milestone>
          <Milestone>
            <MilestoneText>M1<MilestoneSubText>(2/2)</MilestoneSubText></MilestoneText>
            <MilestoneDescription>Text unter M1 (2/2)</MilestoneDescription>
          </Milestone>
          <Milestone>
            <MilestoneText>M2<MilestoneSubText>(1/2)</MilestoneSubText></MilestoneText>
            <MilestoneDescription>Text unter M2 (1/2)</MilestoneDescription>
          </Milestone>
          <Milestone>
            <MilestoneText>M2<MilestoneSubText>(2/2)</MilestoneSubText></MilestoneText>
            <MilestoneDescription>Text unter M2 (2/2)</MilestoneDescription>
          </Milestone>
          <Milestone>
            <MilestoneText>M3<MilestoneSubText>(1/2)</MilestoneSubText></MilestoneText>
            <MilestoneDescription>Text unter M3 (1/2)</MilestoneDescription>
          </Milestone>
          <Milestone>
            <MilestoneText>M3<MilestoneSubText>(2/2)</MilestoneSubText></MilestoneText>
            <MilestoneDescription>Text unter M3 (2/2)</MilestoneDescription>
          </Milestone>
        </MilestoneContainer>
        <Sidebar>
          <Frontend>Frontend</Frontend>
          <div>Backend</div>
          <Model>Model</Model>
        </Sidebar>
        <TableContainer>
          <Table>
            <tbody>
              <tr>
                <Td></Td>
                <LighterPinkTd>
                  First Frontend <OnTargetIcon />
                  <SmallText>Design of the frontend basic structure</SmallText>
                </LighterPinkTd>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </tr>
              <tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </tr>
              <tr>
                <PinkTd colSpan="2">
                  Appaloosa <WhiteCircle />
                  <SmallText>QML model to interpret simple matrices</SmallText>
                </PinkTd>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </TitleContainer>
      <Main>
        {/* Hauptinhalt hier hinzufügen */}
      </Main>
      <Footer />
    </Container>
  );
}

"use client";

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Menü-Symbol

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #282828; /* Grau */
`;

const Header = styled.header`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Platz zwischen Titel und Nav */
  border-bottom: 1px solid #444; /* Dünnerer, weniger auffälliger Strich */
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px; /* Kleiner */
  color: #bbb; /* Weniger auffällig */
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
  background-color: #444; /* Gleiche Farbe und Dicke wie der horizontale Strich */
  margin: 0 10px; /* Platzierung auf beiden Seiten */
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  position: relative; /* Für die Platzierung des horizontalen Balkens */
`;

const NavLink = styled.a<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#bbb')}; /* Weiß, wenn aktiv */
  text-decoration: none;
  font-size: 16px; /* Kleiner */
  position: relative;
  &:hover {
    color: #fff; /* Weiße Farbe beim Hover */
  }
`;

const HorizontalIndicator = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #007bff; /* Dunkler Blauton */
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')}; /* Nur anzeigen, wenn aktiv */
`;

const Icon = styled.div`
  color: #bbb; /* Gleiche Farbe wie der Text */
  font-size: 20px;
  cursor: pointer; /* Zeigt an, dass es anklickbar ist */
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
  background-color: #007bff; /* Dunkler Blauton */
  position: absolute;
  left: -10px;
  top: 0;
  bottom: 0;
`;

const SidebarLink = styled.a`
  color: #bbb;
  text-decoration: none;
  font-size: 18px;
  margin: 10px 0;
  cursor: pointer; /* Zeigt an, dass es anklickbar ist */
  &:hover {
    color: #fff; /* Weiße Farbe beim Hover */
  }
`;

const SidebarDescription = styled.p`
  color: #bbb;
  font-size: 14px;
  margin: 5px 0 15px 0;
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

const Main = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  height: calc(100vh - 60px); /* Header-Höhe berücksichtigen */
`;

const Quadrant = styled.div`
  position: relative;
  padding: 20px;
  overflow: hidden;
`;

const SectionTitle = styled.h1`
  color: #bbb; /* Gleiche Farbe wie LILY QML, aber etwas kleiner */
  font-size: 18px; /* Etwas kleiner als LILY QML */
  margin: 0;
  text-align: left;
  font-weight: bold;
`;

const SubTitle = styled.h2`
  color: #bbb;
  font-size: 16px;
  font-weight: normal;
  margin-top: 20px; /* Abstand nach oben */
`;

const ProgressBarContainer = styled.div`
  background-color: #444;
  border-radius: 5px;
  overflow: hidden;
  width: 100%; /* Gleiche Breite wie die Tabellen */
  margin-top: 10px;
  position: relative; /* Um die Prozentangabe zu positionieren */
  display: flex;
  align-items: center;
  height: 10px; /* Höhe halbiert */
`;

const ProgressBar = styled.div<{ width: number }>`
  background-color: #007bff;
  height: 100%;
  width: ${({ width }) => width}%;
  transition: width 0.3s;
`;

const ProgressBarLabel = styled.span`
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-y: auto;
  max-height: 120px; /* Begrenze die Höhe für Scrollen */
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #444 #282828; /* Farbe der Scrollbar und des Hintergrunds */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #444;
  color: #bbb;
  padding: 10px;
  text-align: left;
  position: sticky;
  top: 0; /* Statische Kopfzeile */
  z-index: 1; /* Sicherstellen, dass die Kopfzeile über den restlichen Zeilen bleibt */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #333;
  }
`;

const TableCell = styled.td`
  color: #bbb;
  padding: 10px;
  border: 1px solid #444;
`;

const SmallTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const SmallTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #333;
  }
`;

const SmallTableCell = styled.td`
  color: #bbb;
  padding: 8px;
  border: 1px solid #444;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 20px; /* Platz über dem Button */
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    background-color: #0056b3; /* Dunklere Farbe beim Hover */
  }
`;

const Divider = styled.div`
  position: absolute;
  background-color: #444;
`;

const HorizontalDivider = styled(Divider)`
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
`;

const VerticalDivider = styled(Divider)`
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
`;

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('home'); // Standard auf "home" gesetzt

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleOptionClick = (option: string) => {
    setActiveOption(option);
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
    <Container>
      <Header>
        <TitleContainer>
          <Title>
            <NormalText>LILY </NormalText>
            <BoldText>QML</BoldText>
            <VerticalLine />
          </Title>
          <Nav>
            <NavLink href="#home" $isActive={activeOption === 'home'} onClick={() => handleOptionClick('home')}>
              Home
              <HorizontalIndicator $isActive={activeOption === 'home'} />
            </NavLink>
            <NavLink href="#jobs" $isActive={activeOption === 'jobs'} onClick={() => handleOptionClick('jobs')}>
              Jobs
              <HorizontalIndicator $isActive={activeOption === 'jobs'} />
            </NavLink>
            <NavLink href="#parameter" $isActive={activeOption === 'parameter'} onClick={() => handleOptionClick('parameter')}>
              Parameter
              <HorizontalIndicator $isActive={activeOption === 'parameter'} />
            </NavLink>
            <NavLink href="#results" $isActive={activeOption === 'results'} onClick={() => handleOptionClick('results')}>
              Results
              <HorizontalIndicator $isActive={activeOption === 'results'} />
            </NavLink>
          </Nav>
        </TitleContainer>
        <Icon onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </Icon>
      </Header>
      <Sidebar className="sidebar" $isOpen={isSidebarOpen}>
        <SidebarOption $isActive={activeOption === 'lab'}>
          {activeOption === 'lab' && <ActiveIndicator />}
          <div>
            <SidebarLink href="#lab" onClick={() => handleOptionClick('lab')}>LAB</SidebarLink>
            <SidebarDescription>Development environment for Quantum Machine Learning models</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption $isActive={activeOption === 'docs'}>
          {activeOption === 'docs' && <ActiveIndicator />}
          <div>
            <SidebarLink href="#docs" onClick={() => handleOptionClick('docs')}>DOCS</SidebarLink>
            <SidebarDescription>Documentation about LILY and using the platform</SidebarDescription>
          </div>
          <HorizontalLine />
        </SidebarOption>
        <SidebarOption $isActive={activeOption === 'road'}>
          {activeOption === 'road' && <ActiveIndicator />}
          <div>
            <SidebarLink href="#road" onClick={() => handleOptionClick('road')}>ROAD</SidebarLink>
            <SidebarDescription>Roadmap of the LILY QML project, information, contact, etc.</SidebarDescription>
          </div>
        </SidebarOption>
      </Sidebar>
      <Overlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
      <Main>
        <Quadrant>
          <SectionTitle>Status</SectionTitle>
          <SmallTable>
            <tbody>
              <SmallTableRow>
                <SmallTableCell>Server</SmallTableCell>
                <SmallTableCell>Example Server</SmallTableCell>
              </SmallTableRow>
              <SmallTableRow>
                <SmallTableCell>Uptime</SmallTableCell>
                <SmallTableCell>24 days</SmallTableCell>
              </SmallTableRow>
              <SmallTableRow>
                <SmallTableCell>Errors</SmallTableCell>
                <SmallTableCell>None</SmallTableCell>
              </SmallTableRow>
            </tbody>
          </SmallTable>
          <SubTitle>Server Load <ProgressBarLabel>65%</ProgressBarLabel></SubTitle>
          <ProgressBarContainer>
            <ProgressBar width={65} />
          </ProgressBarContainer>
          <SubTitle>Jobs (20)</SubTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Progress</TableHeader>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 20 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>Job {i + 1}</TableCell>
                    <TableCell>Running</TableCell>
                    <TableCell>{`${Math.floor(Math.random() * 100)}%`}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Quadrant>
        <Quadrant>
          <SectionTitle>Model Configurations</SectionTitle>
          <SubTitle>Currently Available Models</SubTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>Model {i + 1}</TableCell>
                    <TableCell>Description of model {i + 1}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <SubTitle>Custom Configurations</SubTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Description</TableHeader>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>Custom Config {i + 1}</TableCell>
                    <TableCell>Description of custom config {i + 1}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Quadrant>
        <Quadrant>
          <SectionTitle>Data Status</SectionTitle>
          <SmallTable>
            <tbody>
              <SmallTableRow>
                <SmallTableCell>Allocated Storage</SmallTableCell>
                <SmallTableCell>50GB</SmallTableCell>
              </SmallTableRow>
              <SmallTableRow>
                <SmallTableCell>Total Storage</SmallTableCell>
                <SmallTableCell>200GB</SmallTableCell>
              </SmallTableRow>
              <SmallTableRow>
                <SmallTableCell>Total Model Configurations</SmallTableCell>
                <SmallTableCell>15</SmallTableCell>
              </SmallTableRow>
              <SmallTableRow>
                <SmallTableCell>Trained Datasets</SmallTableCell>
                <SmallTableCell>10</SmallTableCell>
              </SmallTableRow>
              <SmallTableRow>
                <SmallTableCell>Ready for Export</SmallTableCell>
                <SmallTableCell>5</SmallTableCell>
              </SmallTableRow>
            </tbody>
          </SmallTable>
          <Button>Export Data</Button>
        </Quadrant>
        <Quadrant>
          <SectionTitle>Profile Information</SectionTitle>
        </Quadrant>
        <HorizontalDivider />
        <VerticalDivider />
      </Main>
    </Container>
  );
}

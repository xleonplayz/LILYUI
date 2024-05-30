"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { FaSearch, FaSync, FaFileExport } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #181818; /* Noch dunklerer Grauton */
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column; /* Vertikale Anordnung */
  padding: 20px;
  gap: 20px; /* Abstand zwischen den Elementen */
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 70px 5vw; /* Padding links und rechts relativ zur Bildschirmbreite */
  background-color: #2b272a; /* Ursprünglicher Grauton der Seite */
  color: white;
  margin-top: 0px;
  position: relative;
  border-bottom: 1px solid #4a4a4a; /* Trennstrich am Ende des Banners */
`;

const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* Mehr nach links verschieben */
`;

const BannerTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem; /* Große dünne Schrift */
  font-weight: 300;
`;

const BannerSubtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #a9a9a9; /* Grauerer kleinerer Text */
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 50px; /* Höhe des Trennstrichs halbiert */
  background-color: #4a4a4a; /* Vertikaler Trennstrich */
  margin: 0 20px;
`;

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white; /* Weiße Schrift für "Monthly usage" */
`;

const UsageTitle = styled.span`
  font-size: 1rem; /* Kleine Schrift */
  margin-bottom: 5px;
`;

const UsageDetail = styled.span`
  font-size: 0.875rem; /* Kleinere Schrift */
  color: #a9a9a9; /* Graue Schrift für die Details */
`;

const UsageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const ContentBox = styled.div`
  background-color: #2b272a; /* Gleiche Farbe wie der Banner */
  padding: 20px;
  border-radius: 0; /* Spitz an den Ecken */
  margin: 20px 20px 40px; /* Abstand oben, links, rechts und unten */
  height: 700px; /* Größere Höhe */
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: -20px; /* Weiter nach oben verschieben */
  margin-left: -20px; /* Weiter nach links verschieben */
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px; /* Maximale Breite des Eingabefelds */
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a9a9a9; /* Graueres Icon */
  font-size: 0.875rem; /* Kleinere Größe */
`;

const SearchInput = styled.input`
  background-color: #2b272a; /* Gleiche Farbe wie die Box */
  color: white;
  border: none;
  padding: 10px 10px 10px 30px; /* Platz für die Lupe */
  font-size: 0.875rem; /* Kleinere Schrift */
  width: 100%;
  border-radius: 0; /* Spitz an den Ecken */
  &::placeholder {
    color: #a9a9a9; /* Graue Schrift für Platzhaltertext */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px; /* Weiter nach oben verschieben */
  right: 5px; /* Weiter nach rechts verschieben */
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #2b272a;
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  background-color: #4a4a4a;
`;

const Button = styled.button`
  background-color: inherit;
  color: white;
  border: none;
  padding: 10px 20px; /* Breitere Schaltflächen */
  cursor: pointer;
  font-size: 0.875rem; /* Kleinere Schrift */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a3a3a;
  }

  &:focus {
    outline: none;
  }
`;

const RefreshIcon = styled(FaSync)`
  font-size: 0.875rem; /* Kleinere Schrift */
`;

const ExportIcon = styled(FaFileExport)`
  font-size: 0.875rem; /* Kleinere Schrift */
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4a4a4a; /* Hellerer Grauton */
  padding: 15px; /* Etwas höherer Balken */
  margin-top: 0.3%; /* Abstand zur Suchleiste */
  color: white;
  font-weight: 300;
  width: 102.8%; /* Breite auf 100% setzen */
  box-sizing: border-box; /* Beinhaltet Padding in der Breite */
  margin-left: -1.4%; /* Verschiebt den TableHeader nach links */
`;

const HeaderItem = styled.span`
  flex: 1;
  text-align: center;
  font-size: 0.875rem; /* Kleinere Schrift */
  &:first-child {
    text-align: left;
    flex: 0.5; /* Weniger Platz für die Checkbox */
  }

  &:nth-child(2) {
    text-align: left; /* Job Id direkt hinter der Checkbox */
  }

  &:nth-child(3) {
    text-align: left; /* Session Id weiter nach links */
    padding-left: 20px; /* Mehr Abstand nach links */
  }

  &:nth-child(8) {
    text-align: left; /* Tags weiter nach links */
    padding-left: 40px; /* Mehr Abstand nach links */
  }

  &:last-child {
    text-align: right;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px; /* Abstand zur linken Seite */
  width: 20px; /* Größere Checkbox */
  height: 20px; /* Größere Checkbox */
  border: 2px solid white; /* Weißer Umriss */
  background-color: transparent; /* Transparente Checkbox */
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b272a; /* Gleiche Farbe wie der Banner */
  padding: 15px;
  margin-top: 2px; /* Abstand zwischen den Zeilen */
  color: white;
  font-size: 0.875rem;

  &:not(:first-child) {
    border-top: 1px solid #4a4a4a; /* Trennstrich oben, außer bei der ersten Zeile */
  }
`;

const TableDataItem = styled.span`
  flex: 1;
  text-align: center;
  font-size: 0.875rem;
  &:nth-child(3) {
    padding-left: 20px; /* Mehr Abstand nach links für Session Id */
  }

  &:not(:first-child) {
    border-left: 1px solid #4a4a4a; /* Vertikale Trennlinie zwischen den Elementen */
  }
`;

export default function HomePage() {
  return (
    <Container>
      <Header activeOption="home" onOptionClick={() => {}} />
      <Banner>
        <BannerText>
          <BannerTitle>Jobs</BannerTitle>
          <BannerSubtitle>Manage your jobs and monitor their progress</BannerSubtitle>
        </BannerText>
        <UsageWrapper>
          <VerticalDivider />
          <UsageContainer>
            <UsageTitle>Monthly usage</UsageTitle>
            <UsageDetail>0ms / 10m used</UsageDetail>
          </UsageContainer>
        </UsageWrapper>
      </Banner>
      <Main>
        <ContentBox>
          <SearchContainer>
            <SearchInputContainer>
              <SearchIcon />
              <SearchInput placeholder="Search for Jobs by ID, name or tag" />
            </SearchInputContainer>
          </SearchContainer>
          <ButtonContainer>
            <ButtonGroup>
              <Button>
                <RefreshIcon />
              </Button>
              <Divider />
              <Button>
                <ExportIcon />
              </Button>
            </ButtonGroup>
          </ButtonContainer>
          <TableHeader>
            <HeaderItem>
              <Checkbox />
            </HeaderItem>
            <HeaderItem>Job Id</HeaderItem>
            <HeaderItem>Session Id</HeaderItem>
            <HeaderItem>Status</HeaderItem>
            <HeaderItem>Completed</HeaderItem>
            <HeaderItem>Program</HeaderItem>
            <HeaderItem>Compute Resource</HeaderItem>
            <HeaderItem>Usage</HeaderItem>
            <HeaderItem>Tags</HeaderItem>
          </TableHeader>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableDataItem><Checkbox /></TableDataItem>
              <TableDataItem>{index + 1}</TableDataItem>
              <TableDataItem>Session{index + 1}</TableDataItem>
              <TableDataItem>{index % 2 === 0 ? 'Running' : 'Completed'}</TableDataItem>
              <TableDataItem>{index % 2 === 0 ? 'No' : 'Yes'}</TableDataItem>
              <TableDataItem>Program{index + 1}</TableDataItem>
              <TableDataItem>Resource{index + 1}</TableDataItem>
              <TableDataItem>{(index + 1) * 5}ms</TableDataItem>
              <TableDataItem>Tag{index + 1}</TableDataItem>
            </TableRow>
          ))}
        </ContentBox>
        <div style={{ marginBottom: '40px' }} /> {/* Abstand nach der ContentBox */}
      </Main>
      <Footer />
    </Container>
  );
}

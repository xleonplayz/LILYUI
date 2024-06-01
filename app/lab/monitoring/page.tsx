"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #181818; /* Noch dunklerer Grauton */
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  flex: 1;
  max-width: 25%; /* Ursprüngliche Breite der Sidebar */
  background-color: #2b272a; /* Ursprünglicher Grauton der Seite */
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 1px;
  background-color: #4a4a4a; /* Vertikaler Trennstrich */
`;

const ThinSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 1.5%; /* Sehr dünne Sidebar */
  background-color: #2b272a;
  justify-content: space-between;
  padding: 10px;
`;

const ThinSidebarSegment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #4a4a4a;
  position: relative;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const ThinSidebarText = styled.span`
  color: white;
  font-size: 1rem;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  left: -5px; /* Positioniert den Strich links vom Segment */
  height: 100%;
  width: 2px; /* Dünnerer Strich */
  background-color: #0f62fe; /* Blau */
`;

const MainContent = styled.div`
  flex: 3;
  background-color: #181818; /* Noch dunklerer Grauton */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 100%;
`;

const GridItem = styled.div`
  background-color: #2b272a;
  padding: 20px;
  position: relative;
`;

const GridTitle = styled.h3`
  color: white;
  font-weight: 300;
  position: absolute;
  top: 10px;
  left: 20px;
  margin: 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  background-color: #4a4a4a;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const HeaderOption = styled.div`
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  position: relative;

  &:hover {
    color: #0f62fe; /* Blau bei Hover */
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: transparent;
  }

  &.active::after {
    background-color: #0f62fe; /* Blau bei Aktiv */
  }
`;

const HorizontalSection = styled.div`
  flex: ${props => props.flex || 1};
  padding: 20px;
`;

const HorizontalDivider = styled.div`
  height: 1px;
  width: 80%; /* Die Breite des Trennstrichs, so dass es die Seiten nicht berührt */
  background-color: #4a4a4a;
  margin: 10px auto; /* Zentriert den Trennstrich */
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 20px;
  font-weight: 300; /* Dünnerer Text */
`;

const JobTable = styled.div`
  width: 100%;
  color: white;
  margin-bottom: 20px;
  max-height: 200px; /* Maximale Höhe der Tabelle */
  overflow-y: auto; /* Scrollbar, falls Inhalte zu groß sind */
`;

const JobTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #4a4a4a;
`;

const JobTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #4a4a4a;
  cursor: pointer;

  &:hover {
    background-color: #3a3a3a; /* Hintergrundfarbe beim Mouse-Over */
  }
`;

const JobTableHeaderItem = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 20px;
`;

const JobTableDataItem = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px; /* Reduzierte Breite des Eingabefelds */
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a9a9a9; /* Graueres Icon */
  font-size: 1rem;
`;

const SearchInput = styled.input`
  background-color: #2b272a; /* Gleiche Farbe wie die Box */
  color: white;
  border: none;
  padding: 10px 10px 10px 30px; /* Platz für die Lupe */
  font-size: 1rem;
  width: 100%;
  border-radius: 0;
  &::placeholder {
    color: #a9a9a9; /* Graue Schrift für Platzhaltertext */
  }
`;

const SearchButton = styled.button`
  background-color: #4a4a4a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: auto; /* Automatischer linker Rand, um den Button nach rechts zu schieben */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0f62fe; /* Blau bei Hover */
  }
`;

const SearchButtonIcon = styled(FaSearch)`
  font-size: 1rem;
  color: white;
`;

const SelectedJobTitle = styled.h3`
  color: white;
  margin-top: 0px; /* Höher gesetzt */
  font-weight: 300; /* Dünnerer Text */
`;

const JobDetails = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const JobDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const JobDetailLabel = styled.span`
  text-align: left;
`;

const JobDetailValue = styled.span`
  text-align: right;
`;

const DownloadButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const DownloadButton = styled.button`
  background-color: #4a4a4a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0f62fe; /* Blau bei Hover */
  }
`;

const DownloadButtonIcon = styled(FaDownload)`
  font-size: 1rem;
  color: white;
  margin-left: 10px;
`;

export default function HomePage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [inputJob, setInputJob] = useState("");
  const [activeSegment, setActiveSegment] = useState(null);
  const [activeOption, setActiveOption] = useState(null);

  const handleJobClick = (jobId) => {
    setSelectedJob(jobId);
  };

  const handleInputChange = (e) => {
    setInputJob(e.target.value);
  };

  const handleSearchClick = () => {
    setSelectedJob(inputJob);
  };

  const handleSegmentClick = (segment) => {
    setActiveSegment(segment);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <Container>
      <Header activeOption="home" onOptionClick={() => {}} />
      <Content>
        <Sidebar>
          <HorizontalSection flex={1}>
            <Title>Recent Jobs</Title>
            <JobTable>
              <JobTableHeader>
                <JobTableHeaderItem>Job Id</JobTableHeaderItem>
              </JobTableHeader>
              {[...Array(5)].map((_, index) => (
                <JobTableRow key={index} onClick={() => handleJobClick(`Job ${index + 1}`)}>
                  <JobTableDataItem>Job {index + 1}</JobTableDataItem>
                </JobTableRow>
              ))}
            </JobTable>
            <SearchContainer>
              <SearchInputContainer>
                <SearchIcon />
                <SearchInput placeholder="Enter Job Id" value={inputJob} onChange={handleInputChange} />
              </SearchInputContainer>
              <SearchButton onClick={handleSearchClick}>
                <SearchButtonIcon />
              </SearchButton>
            </SearchContainer>
          </HorizontalSection>
          <HorizontalDivider />
          <HorizontalSection flex={2}>
            <SelectedJobTitle>{selectedJob ? selectedJob : "Select a job"}</SelectedJobTitle>
            <JobDetails>
              <JobDetailRow>
                <JobDetailLabel>Start</JobDetailLabel>
                <JobDetailValue>2023-06-01</JobDetailValue>
              </JobDetailRow>
              <JobDetailRow>
                <JobDetailLabel>End</JobDetailLabel>
                <JobDetailValue>2023-06-02</JobDetailValue>
              </JobDetailRow>
              <HorizontalDivider />
              <JobDetailRow>
                <JobDetailLabel>Qubits</JobDetailLabel>
                <JobDetailValue>5</JobDetailValue>
              </JobDetailRow>
              <JobDetailRow>
                <JobDetailLabel>Depth</JobDetailLabel>
                <JobDetailValue>20</JobDetailValue>
              </JobDetailRow>
              <JobDetailRow>
                <JobDetailLabel>Complete Depth</JobDetailLabel>
                <JobDetailValue>22</JobDetailValue>
              </JobDetailRow>
              <HorizontalDivider />
              <DownloadButtonsContainer>
                <DownloadButton>
                  Model Data
                  <DownloadButtonIcon />
                </DownloadButton>
                <DownloadButton>
                  Training Data
                  <DownloadButtonIcon />
                </DownloadButton>
              </DownloadButtonsContainer>
            </JobDetails>
          </HorizontalSection>
        </Sidebar>
        <Divider />
        <ThinSidebar>
          <ThinSidebarSegment onClick={() => handleSegmentClick('ML')}>
            {activeSegment === 'ML' && <ActiveIndicator />}
            <ThinSidebarText>M</ThinSidebarText>
            <ThinSidebarText>L</ThinSidebarText>
          </ThinSidebarSegment>
          <ThinSidebarSegment onClick={() => handleSegmentClick('QML')}>
            {activeSegment === 'QML' && <ActiveIndicator />}
            <ThinSidebarText>Q</ThinSidebarText>
            <ThinSidebarText>M</ThinSidebarText>
            <ThinSidebarText>L</ThinSidebarText>
          </ThinSidebarSegment>
          <ThinSidebarSegment onClick={() => handleSegmentClick('QML2')}>
            {activeSegment === 'QML2' && <ActiveIndicator />}
            <ThinSidebarText>Q</ThinSidebarText>
            <ThinSidebarText>M</ThinSidebarText>
            <ThinSidebarText>L</ThinSidebarText>
          </ThinSidebarSegment>
        </ThinSidebar>
        <Divider />
        <MainContent>
          {activeSegment === 'ML' && (
            <GridContainer>
              <GridItem>
                <GridTitle>Heatmap</GridTitle>
                {/* Inhalt des ersten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>SHAP</GridTitle>
                {/* Inhalt des zweiten Segments */}
              </GridItem>
              <GridItem>
                <HeaderContainer>
                  <HeaderOption className={activeOption === 'accuracy' ? 'active' : ''} onClick={() => handleOptionClick('accuracy')}>
                    Accuracy
                  </HeaderOption>
                  <HeaderOption className={activeOption === 'precision' ? 'active' : ''} onClick={() => handleOptionClick('precision')}>
                    Precision
                  </HeaderOption>
                  <HeaderOption className={activeOption === 'recall' ? 'active' : ''} onClick={() => handleOptionClick('recall')}>
                    Recall
                  </HeaderOption>
                </HeaderContainer>
                {/* Inhalt des dritten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>Hyperparameter Tuning</GridTitle>
                {/* Inhalt des vierten Segments */}
              </GridItem>
            </GridContainer>
          )}
          {activeSegment === 'QML' && (
            <GridContainer>
              <GridItem>
                <GridTitle>Quantum Heatmap</GridTitle>
                {/* Inhalt des ersten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>Quantum SHAP</GridTitle>
                {/* Inhalt des zweiten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>Quantum Header</GridTitle>
                {/* Inhalt des dritten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>Quantum Hyperparameter Tuning</GridTitle>
                {/* Inhalt des vierten Segments */}
              </GridItem>
            </GridContainer>
          )}
          {activeSegment === 'QML2' && (
            <GridContainer>
              <GridItem>
                <GridTitle>Advanced Quantum Heatmap</GridTitle>
                {/* Inhalt des ersten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>Advanced Quantum SHAP</GridTitle>
                {/* Inhalt des zweiten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>Advanced Quantum Header</GridTitle>
                {/* Inhalt des dritten Segments */}
              </GridItem>
              <GridItem>
                <GridTitle>Advanced Quantum Hyperparameter Tuning</GridTitle>
                {/* Inhalt des vierten Segments */}
              </GridItem>
            </GridContainer>
          )}
        </MainContent>
      </Content>
      <Footer />
    </Container>
  );
}

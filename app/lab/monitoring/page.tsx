"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Scat from './scatter';
import HeatmapComponent from './heatmap';
import Dendrogram from './dendogramm';
import AccuracyPrecisionRecall from './accuracyPrecisionRecall';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  flex: ${({ hasSidebar }) => (hasSidebar ? '3' : '4')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  transition: flex 0.3s ease;
`;

const Sidebar = styled.div`
  flex: 1;
  max-width: ${({ isVisible }) => (isVisible ? '20%' : '0')}; /* Dynamic width based on visibility */
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f4f4f4')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  flex-direction: column;
  overflow-x: hidden;
  transition: max-width 0.3s ease; /* Smooth transition */
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')}; /* Hide when not visible */
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
`;

const ThinSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width:2%; /* Fixed width for the thin sidebar */
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  justify-content: space-between;
  padding: 10px;
`;

const ThinSidebarSegment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  position: relative;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const ThinSidebarText = styled.span`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-size: 1rem;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  left: -8px; /* Positioniert den Strich links vom Segment */
  height: 100%;
  width: 2px; /* Dünnerer Strich */
  background-color: #0f62fe; /* Blau */
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 49%);
  gap: 5px;
  height: auto; /* Remove fixed height */
  width: 100%;
  overflow: hidden; /* Ensure no overflow */
`;

const GridItem = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  position: relative;
  height: 100%; /* Each item occupies full height of its row */
`;


const FullHeightGridItem = styled(GridItem)`
  grid-row: span 2;
`;

const GridTitle = styled.h3`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-weight: 300;
  padding: 10px 20px;
  align-items: center;
  margin: 5px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const HeaderOption = styled.div`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
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
  flex: ${(props) => props.flex || 1};
  padding: 20px;
`;

const HorizontalDivider = styled.div`
  height: 1px;
  width: 80%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  margin: 10px auto;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-weight: 300;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const JobTable = styled.div`
  width: 100%;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const JobTableHeader = styled.div`
  display: flex;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  justify-content: space-between;
  padding: 10px 0;
  background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
`;

const JobTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #4a4a4a;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#3a3a3a' : '#e0e0e0')};
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
  left: 0;
  width: 92%;
  z-index: 0;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  color: #a9a9a9;
  font-size: 1rem;
  z-index: 1;
`;

const SearchInput = styled.input`
  background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  padding: 10px 10px 10px 30px;
  font-size: 1rem;
  width: 100%;
  border-radius: 0;
  z-index: 1;

  &::placeholder {
    color: #a9a9a9;
  }
`;

const SelectedJobTitle = styled.h3`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  margin-top: 0;
  font-weight: 300;
`;

const JobDetails = styled.div`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
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
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const DownloadButton = styled.button`
  background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0f62fe;
  }
`;

const DownloadButtonIcon = styled(FaDownload)`
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  margin-left: 10px;
`;

export default function HomePage() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [selectedJob, setSelectedJob] = useState(null);
  const [inputJob, setInputJob] = useState("");
  const [activeSegment, setActiveSegment] = useState('ML');
  const [activeOption, setActiveOption] = useState('accuracy');

  const handleJobClick = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleInputChange = (e) => {
    setInputJob(e.target.value);
  };

  const handleSearchClick = () => {
    setSelectedJob(inputJob);
    setSidebarVisible(true);
  };

  const handleSegmentClick = (segment) => {
    setActiveSegment(segment);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const [activeTopNav, setActiveTopNav] = useState('home');
  const [activeSidebar, setActiveSidebar] = useState('lab');

  const handleTopNavClick = (option) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option) => {
    setActiveSidebar(option);
  };

  return (
    <Container theme={theme}>
      <Header
        theme={theme}
        activeTopNav={activeTopNav}
        activeSidebar={activeSidebar}
        onTopNavClick={handleTopNavClick}
        onSidebarClick={handleSidebarClick}
      />
      <Content theme={theme}>
        <ThinSidebar theme={theme}>
          <ThinSidebarSegment onClick={handleJobClick} theme={theme}>
            {isSidebarVisible && <ActiveIndicator />}
            <ThinSidebarText theme={theme}>Job</ThinSidebarText>
          </ThinSidebarSegment>
          <ThinSidebarSegment onClick={() => handleSegmentClick('ML')} theme={theme}>
            {activeSegment === 'ML' && <ActiveIndicator />}
            <ThinSidebarText theme={theme}>M</ThinSidebarText>
            <ThinSidebarText theme={theme}>L</ThinSidebarText>
          </ThinSidebarSegment>
          <ThinSidebarSegment onClick={() => handleSegmentClick('QML')} theme={theme}>
            {activeSegment === 'QML' && <ActiveIndicator />}
            <ThinSidebarText theme={theme}>Q</ThinSidebarText>
            <ThinSidebarText theme={theme}>M</ThinSidebarText>
            <ThinSidebarText theme={theme}>L</ThinSidebarText>
          </ThinSidebarSegment>
          <ThinSidebarSegment onClick={() => handleSegmentClick('QML2')} theme={theme}>
            {activeSegment === 'QML2' && <ActiveIndicator />}
            <ThinSidebarText theme={theme}>Q</ThinSidebarText>
            <ThinSidebarText theme={theme}>M</ThinSidebarText>
            <ThinSidebarText theme={theme}>L</ThinSidebarText>
            <ThinSidebarText theme={theme}>2</ThinSidebarText>
          </ThinSidebarSegment>
        </ThinSidebar>
        <Divider />
        {isSidebarVisible && (
          <>
            <Sidebar theme={theme} isVisible={isSidebarVisible}>
              <HorizontalSection flex={1}>
                <Title theme={theme}>Recent Jobs</Title>
                <JobTable theme={theme}>
                  <JobTableHeader theme={theme}>
                    <JobTableHeaderItem theme={theme}>Job Id</JobTableHeaderItem>
                  </JobTableHeader>
                  {[...Array(5)].map((_, index) => (
                    <JobTableRow key={index} onClick={() => handleJobClick(`Job ${index + 1}`)} theme={theme}>
                      <JobTableDataItem theme={theme}>Job {index + 1}</JobTableDataItem>
                    </JobTableRow>
                  ))}
                </JobTable>
                <SearchContainer>
                  <SearchInputContainer>
                    <SearchInput placeholder="Enter Job Id" value={inputJob} onChange={handleInputChange} theme={theme} />
                    <SearchIcon />
                  </SearchInputContainer>
                </SearchContainer>
              </HorizontalSection>
              <HorizontalDivider />
              <HorizontalSection flex={2}>
                <SelectedJobTitle theme={theme}>{selectedJob ? selectedJob : "Select a job"}</SelectedJobTitle>
                <JobDetails theme={theme}>
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
                    <DownloadButton theme={theme}>
                      Model Data
                      <DownloadButtonIcon theme={theme} />
                    </DownloadButton>
                    <DownloadButton theme={theme}>
                      Training Data
                      <DownloadButtonIcon theme={theme} />
                    </DownloadButton>
                  </DownloadButtonsContainer>
                </JobDetails>
              </HorizontalSection>
            </Sidebar>
            <Divider />
          </>
        )}
        <MainContent theme={theme} hasSidebar={isSidebarVisible}>
          {activeSegment === 'ML' && (
            <GridContainer theme={theme}>
              <GridItem theme={theme}>
                <HeatmapComponent theme={theme} />
              </GridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>SHAP</GridTitle>
                <Scat theme={theme} />
              </GridItem>
              <GridItem theme={theme}>
                <HeaderContainer theme={theme}>
                  <HeaderOption theme={theme} className={activeOption === 'accuracy' ? 'active' : ''} onClick={() => handleOptionClick('accuracy')}>
                    Accuracy
                  </HeaderOption>
                  <HeaderOption theme={theme} className={activeOption === 'precision' ? 'active' : ''} onClick={() => handleOptionClick('precision')}>
                    Precision
                  </HeaderOption>
                  <HeaderOption theme={theme} className={activeOption === 'recall' ? 'active' : ''} onClick={() => handleOptionClick('recall')}>
                    Recall
                  </HeaderOption>
                </HeaderContainer>
                <AccuracyPrecisionRecall selectedMetric={activeOption} />
              </GridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Hyperparameter Tuning</GridTitle>
                <Dendrogram />
              </GridItem>
            </GridContainer>
          )}
          {activeSegment === 'QML' && (
            <GridContainer theme={theme}>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Quantum Heatmap</GridTitle>
              </GridItem>
              <FullHeightGridItem theme={theme}>
                <GridTitle theme={theme}>Quantum SHAP</GridTitle>
              </FullHeightGridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Quantum Header</GridTitle>
              </GridItem>
            </GridContainer>
          )}
          {activeSegment === 'QML2' && (
            <GridContainer theme={theme}>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Advanced Quantum Heatmap</GridTitle>
              </GridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Advanced Quantum SHAP</GridTitle>
              </GridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Advanced Quantum Header</GridTitle>
              </GridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Advanced Quantum Hyperparameter Tuning</GridTitle>
              </GridItem>
            </GridContainer>
          )}
        </MainContent>
      </Content>
      <Footer />
    </Container>
  );
}

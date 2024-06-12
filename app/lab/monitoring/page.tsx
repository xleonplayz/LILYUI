
"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Scat from './scatter';
import HeatmapComponent from './heatmap';
import Dendrogram from './dendogramm';
import AccuracyPrecisionRecall from './accuracyPrecisionRecall';
import ProbabilityChart from './modelcomp';

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
  max-width: ${({ isVisible }) => (isVisible ? '20%' : '0')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f4f4f4')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  flex-direction: column;
  overflow-x: hidden;
  transition: max-width 0.3s ease;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
`;

const ThinSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 3%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  justify-content: space-between;
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
  margin-left: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

const ThinSidebarTextJob = styled.span`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-size: 1rem;
`;

const ThinSidebarSegmentJob = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  }
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  cursor: pointer;
`;

const ThinSidebarText = styled.span`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-size: 1rem;
  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  left: -8px;
  height: 100%;
  width: 2px;
  background-color: #0f62fe;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 49%);
  gap: 5px;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const GridItem = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  position: relative;
  height: 100%;
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
    color: #0f62fe;
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
    background-color: #0f62fe;
  }
`;

const HorizontalDivider = styled.div`
  height: 1px;
  width: 80%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  margin: 10px auto;
`;

const Title = styled.h3`
  font-weight: 300;
  text-align: left;
  font-size: 18px;
  margin-left: 20px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const Para = styled.h3`
  font-weight: 300;
  font-size: 12px;
  text-align: left;
  margin-left: 20px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px auto;
`;

const SearchInputContainer = styled.div`
  position: relative;
  left: 20px;
  width: 80%;
  z-index: 0;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
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
  padding: 10px 5px 10px 30px;
  font-size: 1rem;
  width: 100%;
  border-radius: 0;
  z-index: 1;

  &::placeholder {
    color: #a9a9a9;
  }
`;

const HorizontalSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const JobList = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#fff')};
  }
  border-radius: 4px;
  cursor: pointer;
`;

const JobSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const JobStatus = styled.span`
  color: ${(props) => props.theme.statusColor};
  display: flex;
  align-items: center;
`;

const JobTime = styled.span`
  color: ${(props) => props.theme.timeColor};
`;

const JobId = styled.span`
  color: ${(props) => props.theme.idColor};
`;

const JobActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ThreeDots = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  &:before {
    content: '⋮';
    font-size: 20px;
  }
`;

const TickIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 5px;

  &:before {
    content: '✔️';
    font-size: 14px;
    margin-right: 5px;
    color: green;
  }
`;

const CollapsibleSection = styled.div`
  margin-top: 10px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
`;

const SectionTitle = styled.span`
  font-weight: bold;
`;

const SectionContent = styled.div`
  max-height: ${({ isVisible }) => (isVisible ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const JobDetailsContainer = styled.div`
  padding: 20px;
  // background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f4f4f4')};
  border-radius: 8px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const jobsData = [
  {
    id: 'cq4e8ha28rp0008xxmg0',
    time: 'Feb 11, 2024 4:14 PM',
    status: 'Completed',
    completedTime: 'Feb 11, 2024 6:07 PM (in 1h 53m 24.4s)',
    computeResource: 'ibm_brisbane',
    statusTimeline: 'Completed',
    results: '{"quasi_dists": [{"0000": 0.50}]}'
  },
  {
    id: 'cq4bw307z1hg008dqnv0',
    time: 'Feb 11, 2024 1:31 PM',
    status: 'Completed',
    completedTime: 'Feb 11, 2024 3:24 PM (in 1h 53m 24.4s)',
    computeResource: 'ibm_brisbane',
    statusTimeline: 'Completed',
    results: '{"quasi_dists": [{"0000": 0.50}]}'
  },
];

export default function HomePage() {
  const [inputJob, setInputJob] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeSegment, setActiveSegment] = useState('ML');
  const [activeOption, setActiveOption] = useState('accuracy');
  const [collapsedSections, setCollapsedSections] = useState({
    statusTimeline: true,
    details: true,
    results: true
  });

  const handleInputChange = (event) => {
    setInputJob(event.target.value);
  };

  const handleJobClick = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleSegmentClick = (segment) => {
    setActiveSegment(segment);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleTopNavClick = (option) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option) => {
    setActiveSidebar(option);
  };

  const toggleJobDetails = (jobId) => {
    const job = jobsData.find((job) => job.id === jobId);
    setSelectedJob(selectedJob === job ? null : job);
    setSidebarVisible(true);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

  const toggleSection = (section) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section]
    });
  };



  const [activeTopNav, setActiveTopNav] = useState('home');
  const [activeSidebar, setActiveSidebar] = useState('lab');

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
          <ThinSidebarSegmentJob onClick={handleJobClick} theme={theme}>
            {isSidebarVisible && <ActiveIndicator />}
            <ThinSidebarTextJob theme={theme}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <foreignObject width="100%" height="100%">
                  <div xmlns="http://www.w3.org/1999/xhtml">
                    <svg viewBox="0 0 16 16" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M7 6.00024V10.0002L10.5 8.00024L7 6.00024Z" fill="currentColor"></path>
                      <path d="M8.95068 13.3998L9.10069 14.3998C9.85069 14.2498 10.5507 13.9998 11.2007 13.6498L10.7007 12.7998C10.2007 13.0998 9.60068 13.2998 8.95068 13.39982" fill="currentColor"></path>
                      <path d="M12.2007 11.5504L12.9507 12.2003C13.4507 11.6503 13.8007 10.9504 14.0507 10.2504L13.1007 9.90039C12.9507 10.5004 12.6007 11.0504 12.2007 11.5504Z" fill="currentColor"></path>
                      <path d="M4.75 13.6002C5.4 13.9502 6.1 14.2502 6.85 14.3502L7 13.3502C6.35 13.2502 5.75 13.0002 5.2 12.7002L4.75 13.6002Z" fill="currentColor"></path>
                      <path d="M2.8499 9.90039L1.8999 10.2504C2.1499 10.9504 2.5499 11.6503 2.9999 12.2003L3.1499 12.0504L3.7499 11.5504C3.3999 11.0504 3.0499 10.5004 2.8499 9.900397" fill="currentColor"></path>
                      <path d="M14.4999 8C14.4999 7.2 14.3499 6.45005 14.0999 5.80005L13.1499 6.15002C13.3499 6.75002 13.4999 7.35005 13.4999 8.05005H14.4999V8Z" fill="currentColor"></path>
                      <path d="M13 3.80005C11.8 2.40005 10 1.5 8 1.5C6 1.5 4.2 2.39998 3 3.84998V2.75H2V6H5V5H3.4C4.4 3.5 6.05 2.5 8 2.5C9.7 2.5 11.2 3.24995 12.2 4.44995L13 3.80005Z" fill="currentColor"></path>
                    </svg>
                  </div>
                </foreignObject>
              </svg>
            </ThinSidebarTextJob>
          </ThinSidebarSegmentJob>
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
              {selectedJob ? (
                <JobDetailsContainer theme={theme}>
                  <button onClick={handleBackToList}>Back to list</button>
                  <h4>Job Details</h4>
                  <p><strong>Job ID:</strong> {selectedJob.id}</p>
                  <p><strong>Completed:</strong> {selectedJob.completedTime}</p>
                  <p><strong>Compute resource:</strong> {selectedJob.computeResource}</p>
                  <CollapsibleSection>
                    <SectionHeader onClick={() => toggleSection('statusTimeline')} theme={theme}>
                      <SectionTitle>Status timeline</SectionTitle>
                      <span>{collapsedSections.statusTimeline ? '▼' : '▲'}</span>
                    </SectionHeader>
                    <SectionContent isVisible={!collapsedSections.statusTimeline} theme={theme}>
                      <p><strong>Status timeline:</strong> {selectedJob.statusTimeline}</p>
                    </SectionContent>
                  </CollapsibleSection>
                  <CollapsibleSection>
                    <SectionHeader onClick={() => toggleSection('details')} theme={theme}>
                      <SectionTitle>Details</SectionTitle>
                      <span>{collapsedSections.details ? '▼' : '▲'}</span>
                    </SectionHeader>
                    <SectionContent isVisible={!collapsedSections.details} theme={theme}>
                      <p>Details content goes here.</p>
                    </SectionContent>
                  </CollapsibleSection>
                  <CollapsibleSection>
                    <SectionHeader onClick={() => toggleSection('results')} theme={theme}>
                      <SectionTitle>Results</SectionTitle>
                      <span>{collapsedSections.results ? '▼' : '▲'}</span>
                    </SectionHeader>
                    <SectionContent isVisible={!collapsedSections.results} theme={theme}>
                      <p>{selectedJob.results}</p>
                    </SectionContent>
                  </CollapsibleSection>
                </JobDetailsContainer>
              ) : (
                <HorizontalSection>
                  <Title theme={theme}>Compose Jobs</Title>
                  <Para theme={theme}>Compose Jobs</Para>
                  <SearchContainer>
                    <SearchInputContainer>
                      <SearchInput
                        placeholder="Enter Job Id"
                        value={inputJob}
                        onChange={handleInputChange}
                        theme={theme}
                      />
                      <SearchIcon />
                    </SearchInputContainer>
                  </SearchContainer>
                  <JobList>
                    {jobsData.length === 0 ? (
                      <NoJobsContainer theme={theme}>
                        <NoJobsImage src="path-to-your-image.png" alt="No jobs icon" />
                        <h3>You have not run any jobs for this file</h3>
                        <p>
                          Once you have run a circuit on a system, you can track the job’s status and view details from this panel.
                        </p>
                        <a href="#">Learn how to run jobs</a>
                      </NoJobsContainer>
                    ) : (
                      jobsData.map((job) => (
                        <JobItem key={job.id} theme={theme} onClick={() => toggleJobDetails(job.id)}>
                          <JobSummary>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {job.status === 'Completed' && <TickIcon />}
                              <JobInfo>
                                <JobStatus theme={theme}>{job.status}</JobStatus>
                                <JobTime theme={theme}>{job.time}</JobTime>
                                <JobId theme={theme}>{job.id}</JobId>
                              </JobInfo>
                            </div>
                            <JobActions>
                              <ThreeDots />
                            </JobActions>
                          </JobSummary>
                        </JobItem>
                      ))
                    )}
                  </JobList>
                </HorizontalSection>
              )}
              <HorizontalDivider />
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
                <ProbabilityChart/>
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

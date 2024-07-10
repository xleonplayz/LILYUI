'use client';
import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem, OutlinedInput } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const dummyDatabase = ['item1', 'item2', 'item3'];

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
  padding: 0;
`;

const LeftSide = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  .available-not {
    margin: 0px 20px;
  }
`;

const CustomSelect = styled(Select)`
  width: 70%;
  margin: 20px;
  display: inline-block;
  margin-right: 10px;
  font-size: 0.87rem;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};

  .MuiOutlinedInput-root {
    padding: 0px 0px;
    border: none;
    background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
    box-shadow: ${({ theme }) => (theme === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.1)')};
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiSvgIcon-root {
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
    background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  }

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};

    .MuiSvgIcon-root {
      background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};
    }
  }
`;

const CustomMenuItem = styled(MenuItem)`
  background-color: ${({ theme, selected }) => (theme === 'dark' ? (selected ? '#2b3236' : '#21272a') : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};
  }
  &.Mui-selected {
    background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')} !important;
    &:hover {
      background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};
    }
  }
`;

const InputField = styled.input`
  width: 70%;
  padding: 10px 0px;
  margin-bottom: 20px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  outline: ${({ theme }) => (theme === 'dark' ? 'none' : '1px solid #0e62fe')};
  margin: 20px;
`;

const UploadButton = styled.button`
  width: 70%;
  padding: 10px;
  margin: 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 70%;
  height: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  border-radius: 4px;
  overflow: hidden;
  margin: 20px;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#0e62fe' : '#0e62fe')};
  transition: width 0.4s ease;
`;

const AdvancedMenuButton = styled.button`
  width: 70%;
  padding: 10px 0px;
  margin: 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  background-color: #fe7eb5;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  cursor: pointer;
  margin-bottom: 20px;
`;

const StatusItem = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusIcon = styled.span`
  margin-left: 10px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div:first-child {
    padding: 0px 20px;
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
  height: 50px;
`;

const LessonsCount = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
  margin: 20px;
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#ccc' : '#333')};
`;

const StartCourseLink = styled.a`
  font-size: 1rem;
  color: #0e62fe;
  text-align: left;
  margin: 10px;
  width: 65%;
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
`;

const RightSide = styled.div`
  width: 30%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StepIndicator = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 120px;
  width: 70%;
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
  &:disabled {
    background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#ccc')};
    cursor: not-allowed;
  }
`;

const CheckDataButton = styled(ButtonN)`
  width: 33.25%;
  background-color: ${({ isFormComplete, theme }) => (isFormComplete ? '#0e62fe' : theme === 'dark' ? '#444' : '#ccc')};
  cursor: ${({ isFormComplete }) => (isFormComplete ? 'pointer' : 'not-allowed')};
`;


const CheckDataButton3 = styled(ButtonN)`
  width: 33.25%;
  background-color: ${({ isFormComplete, theme }) => (isFormComplete ? '#0e62fe' : theme === 'dark' ? '#444' : '#ccc')};
  // cursor: ${({ isFormComplete }) => (isFormComplete ? 'pointer' : 'not-allowed')};
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 20px;
`;

const ResourceItem = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
  border: ${({ selected, theme }) => (selected ? '2px solid #0e62fe' : `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`)};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#3a3a3a' : '#f4f4f4')};
  }
`;

const Line = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  margin: 20px 0;
`;

const CResource = styled.h2`
  font-weight: 600;
  margin: 20px 20px 0px;
  // padding: 230px;
`;

export default function HomePage() {
  const theme = useSelector((state) => state.theme.theme);
  const [activeTopNav, setActiveTopNav] = useState('configuration');
  const [activeSidebar, setActiveSidebar] = useState('lab');
  const [step, setStep] = useState(1);
  const [modelType, setModelType] = useState('');
  const [isModelTypeSelected, setIsModelTypeSelected] = useState(false);
  const [isModelUploaded, setIsModelUploaded] = useState(false);
  const [isTrainingDataUploaded, setIsTrainingDataUploaded] = useState(false);
  const [status, setStatus] = useState({
    modelFound: false,
    modelConfigurable: false,
    trainingDataGood: false,
    trainingDataInRightFormat: false,
  });
  const [sobNom, setSobNom] = useState('');
  const [availability, setAvailability] = useState('');
  const [progress, setProgress] = useState(0);
  const [isDataChecked, setIsDataChecked] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleNext = () => {
    if ((step === 2 || step === 3) && isDataChecked) {
      setStep(step + 1);
    } else {
      setStep((prevStep) => Math.min(prevStep + 1, 5));
    }
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleTopNavClick = (option) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option) => {
    setActiveSidebar(option);
  };

  const handleDropdownChange = (e) => {
    setModelType(e.target.value);
    setIsModelTypeSelected(e.target.value !== '');
  };

  const handleModelUpload = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsModelUploaded(true);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);
  };

  const handleTrainingDataUpload = () => {
    setIsTrainingDataUploaded(true);
  };

  const handleCheckData = () => {
    const newStatus = {
      modelFound: false,
      modelConfigurable: false,
      trainingDataGood: false,
      trainingDataInRightFormat: false,
    };
    setStatus(newStatus);

    setTimeout(() => {
      setStatus((prevStatus) => ({ ...prevStatus, modelFound: true }));
    }, 1000);
    setTimeout(() => {
      setStatus((prevStatus) => ({ ...prevStatus, modelConfigurable: true }));
    }, 2000);
    setTimeout(() => {
      setStatus((prevStatus) => ({ ...prevStatus, trainingDataGood: true }));
    }, 3000);
    setTimeout(() => {
      setStatus((prevStatus) => ({ ...prevStatus, trainingDataInRightFormat: true }));
      setIsDataChecked(true);
    }, 4000);
  };

  const [checkSelection,setCheckSelection]=useState(false);
  const handleCheckDatastep3 = () => {
    if (selectedResource) {
      // setIsDataChecked(true);
      setCheckSelection(true)
    }
  };

  const checkAvailability = () => {
    setAvailability(dummyDatabase.includes(sobNom) ? 'Available' : 'Not Available');
  };

  const handleResourceClick = (item) => {
    if (selectedResource === item) {
      setSelectedResource(null); // Unselect if the same item is clicked again
    } else {
      setSelectedResource(item);
    }
  };

  const isFormComplete = isModelTypeSelected && isModelUploaded && isTrainingDataUploaded;

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
          {step === 1 && (
            <CardGrid>
              <Card theme={theme}>
                <div>
                  <CardHeader>Basics of Quantum Information</CardHeader>
                  <BadgeContainer>
                    <CardBadge theme={theme}>Badge</CardBadge>
                    <CardBadgeV theme={theme} color="#a4d4ff">
                      Video
                    </CardBadgeV>
                  </BadgeContainer>
                  <CardBody theme={theme}>
                    A detailed course covering mathematical aspects of quantum computing,
                    comparable to an advanced undergraduate or introductory...
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
                    <CardBadgeV theme={theme} color="#a4d4ff">
                      Video
                    </CardBadgeV>
                  </BadgeContainer>
                  <CardBody theme={theme}>
                    Use quantum computers to solve problems more efficiently, including problems
                    with real-world relevance such as searching and...
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
                    This course covers variational algorithms, hybrid classical quantum algorithms
                    which play to the strengths of current quantum...
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
                    <CardBadgeV theme={theme} color="#a4d4ff">
                      Video
                    </CardBadgeV>
                  </BadgeContainer>
                  <CardBody theme={theme}>
                    Learn about realistic potential use cases for quantum computing and best
                    practices for experimenting with quantum processors...
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
          )}

          {step === 2 && (
            <>
              <InputField
                theme={theme}
                placeholder="SOB Nom"
                value={sobNom}
                onChange={(e) => setSobNom(e.target.value)}
                onBlur={checkAvailability}
              />
              <div className="available-not">{availability}</div>
              <CustomSelect
                value={modelType}
                onChange={handleDropdownChange}
                displayEmpty
                input={<OutlinedInput />}
                renderValue={(selected) => selected || 'Select Model Type'}
                theme={theme}
              >
                <CustomMenuItem value="" theme={theme} disabled>
                  Select Model Type
                </CustomMenuItem>
                <CustomMenuItem value="type1" theme={theme}>Type 1</CustomMenuItem>
                <CustomMenuItem value="type2" theme={theme}>Type 2</CustomMenuItem>
              </CustomSelect>
              <UploadButton theme={theme} onClick={handleModelUpload}>
                Upload Model
              </UploadButton>
              <ProgressBar theme={theme}>
                <Progress theme={theme} progress={progress} />
              </ProgressBar>
              <UploadButton theme={theme} onClick={handleTrainingDataUpload}>
                Upload Training Data
              </UploadButton>
              <ProgressBar theme={theme}>
                <Progress theme={theme} progress={isTrainingDataUploaded ? 100 : 0} />
              </ProgressBar>
              <AdvancedMenuButton theme={theme}>Advanced Menu</AdvancedMenuButton>
            </>
          )}

          {step === 3 && (
            <>
              <CResource>Choose Resource</CResource>
              <ResourceGrid theme={theme}>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <ResourceItem
                    key={item}
                    theme={theme}
                    selected={selectedResource === item}
                    onClick={() => handleResourceClick(item)}
                  >
                    {item}
                  </ResourceItem>
                ))}
              </ResourceGrid>
            </>
          )}

          {step === 4 && (
            <div>
              <p>Step 4 Content: Model Evaluation</p>
              {/* Add more content for step 4 as needed */}
            </div>
          )}
          {step === 5 && (
            <div>
              <p>Step 5 Content: Finalizing and Deployment</p>
              {/* Add more content for step 5 as needed */}
            </div>
          )}

          <ButtonContainer theme={theme}>
            <ButtonC theme={theme}>Cancel</ButtonC>
            <ButtonB theme={theme} onClick={handleBack}>
              Back
            </ButtonB>
            {step === 2 ? (
              isDataChecked ? (
                <ButtonN theme={theme} onClick={handleNext}>
                  Next
                </ButtonN>
              ) : (
                <CheckDataButton
                  theme={theme}
                  isFormComplete={isFormComplete}
                  onClick={handleCheckData}
                  disabled={!isFormComplete}
                >
                  Check Data
                </CheckDataButton>
              )
            ) : step === 3 ? (
              checkSelection ? (

                <ButtonN theme={theme} onClick={handleNext}>
                Next
              </ButtonN>
               
               
              ) : (
                <CheckDataButton3
                theme={theme}
                onClick={handleCheckDatastep3}
              >
                Check Data
              </CheckDataButton3>
            
              
              )
            ) : (
              <ButtonN theme={theme} onClick={handleNext}>
                Next
              </ButtonN>
            )}
          </ButtonContainer>
        </LeftSide>
        <RightSide theme={theme}>
          <StepIndicator>Step {step}/5</StepIndicator>

          {step === 2 && (
            <>
              <StatusItem>
                Model Found
                <StatusIcon>
                  {status.modelFound ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                </StatusIcon>
              </StatusItem>
              <StatusItem>
                Model Configurable
                <StatusIcon>
                  {status.modelConfigurable ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                </StatusIcon>
              </StatusItem>
              <StatusItem>
                Training Data Good
                <StatusIcon>
                  {status.trainingDataGood ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                </StatusIcon>
              </StatusItem>
              <StatusItem>
                Training Data in Right Format
                <StatusIcon>
                  {status.trainingDataInRightFormat ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                </StatusIcon>
              </StatusItem>
              {status.modelFound &&
                status.modelConfigurable &&
                status.trainingDataGood &&
                status.trainingDataInRightFormat && <p>Job created successfully</p>}
            </>
          )}

          {step === 3 && (
            <>
              <h3>Recommended Configuration: Ice Lake</h3>
              <Line theme={theme} />
              {isDataChecked && selectedResource && checkSelection &&(
                <>
                  <p>Estimated time on Ice Lake: 3h</p>
                  <h4>Resources</h4>
                  <ul>
                    <li>Resource {selectedResource}</li>
                  </ul>
                </>
              )}
            </>
          )}
        </RightSide>
      </MainContent>
      <Footer />
    </Container>
  );
}

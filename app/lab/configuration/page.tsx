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

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Tooltip as MuiTooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  // Select,
  // MenuItem,
} from '@mui/material';
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
  flex: 1;F
  padding: 0;
`;

const LeftSide = styled.div`
  width: 18%;
  display: flex;
  flex-direction: column;
  // justify-content:center;
  // align-item:center;

  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  // margin: 5% 0;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  .available-not {
    margin: 0px 20px;
  }
`;

// const LeftMenu = styled.div`
//   padding: 10px;
//   background-color: #fff;
//   border-right: 1px solid #ddd;
// `;

// const MenuItemButton = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   position: relative;
//   &:hover {
//     background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#f0f0f0')}; /* Light gray on hover */
//   }
//   ${({ active }) =>
//     active &&
//     `
//     border: 1px solid #0e62fe; /* Blue border for the selected step */
//     background-color: #ffffff; /* White background for the selected step */
//     border-radius: 4px;
//   `}
// `;


const MenuItemButton = styled.div`
  padding: 0px 15px;
  cursor: pointer;
  position: relative;
  line-height:3.0rem;
  
align-item:center;
justify-content:center;
  font-size:1.0rem;
  &:hover {
    // background-color: #f0f0f0;
    
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f0f0f0')};
  }
  ${({ active }) =>
    active &&
    `
    &:before {
      content: '';
      position: absolute;
      left: 0px;
      top: 0;
      height: 95%;
      margin:auto;
align-item:center;
justify-content:center;
      width: 4px;
      background-color: #0e62fe;

    }
    
  `}
`;

const LeftMenu = styled.div`
  // position: fixed;
  // left: 0;
  // top: ${({ step }) => `calc(${step * 60}px + 20px)`}; // Adjust this calculation based on the height of each step
  // width: 200px;
  padding: 10px;
  // background-color: #fff;
  
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  min-height: 90vh;
  // border-right: 1px solid #ddd;
`;



const CenterSide = styled.div`
  width: 66%;
  display: flex;
  flex-direction: column;
  // justify-content:center;
  // align-item:center;

  // margin: 5% 0;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  .available-not {
    margin: 0px 20px;
  }
`;



const RightSide = styled.div`
  width: 18%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  margin: 20px auto;
  
  // height:0px;
  display: inline-block;
  // margin-right: 10px;
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

  // height:40px;
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
  width: 99%;
  height:47px;
  padding:0px ;
  padding-left:5px;
  // margin: 20px;
  border-radius: 2px;

   margin: 20px auto;
  // border: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  // outline: ${({ theme }) => (theme === 'dark' ? 'none' : '1px solid #0e62fe')};

  .inputcheck{
   width:50px;
  // margin:20px 0px;
  }
  
`;

const UploadButton = styled.button`
  width: 97%;
  padding: 10px;
  margin: 20px auto;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  background-color: ${({ theme }) => (theme === 'dark' ? '#2a2a2a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 97%;
  height: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  border-radius: 4px;
  overflow: hidden;
  margin: 20px auto;
`;


const VerticalLineLeftBar = styled.div`
  position: absolute;
  left: 12px;
  top: 55px;
  height: 26vh;
  width: 2px;
  background-color: #ddd; /* Light gray vertical line */
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#0e62fe' : '#0e62fe')};
  transition: width 0.4s ease;
`;

const AdvancedMenuButton = styled.button`
  // width: 64.65%;
  position:absolute;
  bottom:113px;
 left:18.7%; 
 width: 62.75%;
  padding: 10px 0px;
  // margin: 20px auto;
  // border-radius: 4px;
  border: 0px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#ddd')};
  background-color: #fe7eb5;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  cursor: pointer;
  // margin-bottom: 20px;
  height:50px;
`;

const StatusItem = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size:1.1rem;
`;

const StatusIcon = styled.span`
  margin-left: 10px;
`;

const CardGrid = styled.div`
 display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;  /* Adjust gap to make cards wider */
  padding: 10px 20px;
  justify-content: center;  

  margin : 1% auto;
`;

const HeaderContainer = styled.div`
  // width: 70%;
  margin:1% 0% 0% 0.2%;
  width:400px;
  border-radius:5px;
  padding: 20px 0px 0px   20px ;
  // background-color: rgb(128,26,27);
  // color: white;
  // text-align: center;
  font-size: 1.5rem;
  font-weight:500;
  box-sizing: border-box;
`;


const ParaContainer = styled.div`

  margin:0% 0.3%;
  width:400px;
  border-radius:5px;
  padding:10px 0px 0px   20px ;

  font-size: 0.8rem;
  font-weight:400;
  box-sizing: border-box;
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
  margin: 20px 10px;
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

const StepIndicator = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
 bottom:63.5px;
 left:18.7%; 
 width: 62.75%;
 
  background-color: ${({ theme }) => (theme === 'dark' ? '#4d5357' : '#fff')};
  box-sizing: border-box;
  height: 50px;
  margin:auto;
`;

const ButtonC = styled.button`
  background-color: ${({ theme }) => (theme === 'dark' ? '#393939' : '#e0e0e0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  width: 33.25%;
  cursor: pointer;
  // margin: 0;
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

const Step2 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  // div{
  // width:50%;
  // }
 .spinner {
 margin-left:50%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #0070f3;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    align-item:center;
    justify-content:center;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`;


const UploadButtonStep2 = styled.button`
 
  background-color: ${({  theme }) => (  theme === 'dark' ? '#444' : '#ccc')};
    width: 100%;
  height:47px;
  // padding:0px 5px;
  // margin: 20px;
  border-radius: 2px;
   margin: 20px auto;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background-color: rgba(0, 112, 243, 0.1);
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
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme === 'dark' ? '#21272a' : '#f4f4f4',
    color: theme === 'dark' ? 'white' : 'black',
  },
  '& .MuiButton-root': {
    color: theme === 'dark' ? 'white' : 'black',
  },
  '& .MuiTextField-root': {
    '& .MuiInputBase-input': {
      color: theme === 'dark' ? 'white' : 'black',
      '-webkit-appearance': 'none', // Remove arrows in WebKit browsers
      '-moz-appearance': 'textfield', // Remove arrows in Firefox
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme === 'dark' ? 'white' : 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme === 'dark' ? 'white' : 'black',
      },
      '&:hover fieldset': {
        borderColor: theme === 'dark' ? 'white' : 'black',
      },
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme === 'dark' ? 'white' : 'black',
  },
}));

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

  const [modalOpen, setModalOpen] = useState(false);
  const [quantumRegisters, setQuantumRegisters] = useState([{ name: 'q', qubits: 4 }]);
  const [classicalRegisters, setClassicalRegisters] = useState([{ name: 'c', bits: 4 }]);


  const handleOpenModal = () => {
    setModalOpen(true);

  };

  const handleCloseModal = () => {


    setModalOpen(false);

  };

  const handleCloseModalOk = () => {


    setModalOpen(false);


    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsModelUploaded(true);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);
  };

  const handleAddQuantumRegister = () => {
    setQuantumRegisters([...quantumRegisters, { name: '', qubits: 1 }]);
  };

  const handleAddClassicalRegister = () => {
    setClassicalRegisters([...classicalRegisters, { name: '', bits: 1 }]);
  };

  const handleRemoveQuantumRegister = (index) => {
    setQuantumRegisters(quantumRegisters.filter((_, i) => i !== index));
  };

  const handleRemoveClassicalRegister = (index) => {
    setClassicalRegisters(classicalRegisters.filter((_, i) => i !== index));
  };
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

  // const handleModelUpload = () => {
  //   setProgress(0);
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) => {
  //       if (prevProgress >= 100) {
  //         clearInterval(interval);
  //         setIsModelUploaded(true);
  //         return 100;
  //       }
  //       return prevProgress + 10;
  //     });
  //   }, 100);
  // };

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

  const [checkSelection, setCheckSelection] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = () => {
      setIsLoading(true);
      // Simulate a network request
      setTimeout(() => {
          setIsLoading(false);
          alert('Upload complete');
      }, 2000);
  };

  const [isModelUpload, setIsModelUpload] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsModelUpload(e.target.checked);
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
      <MainContent>  <LeftSide theme={theme}>
        <LeftMenu theme={theme}>
          <VerticalLineLeftBar></VerticalLineLeftBar>
          <MenuItemButton active={step === 1} theme={theme}>Preconfiguration</MenuItemButton>
          <MenuItemButton active={step === 2} theme={theme}>Specific Model Configuration
          </MenuItemButton>
          <MenuItemButton active={step === 3} theme={theme}>Final Model Configuration
          </MenuItemButton>
          <MenuItemButton active={step === 4} theme={theme}>Server Configuration
          </MenuItemButton>
          <MenuItemButton active={step === 5} theme={theme}>Overview</MenuItemButton>
          {/* <MenuItemButton active={step === 6}>Aktuelle Nachrichten</MenuItemButton>
          <MenuItemButton active={step === 7}>Branchenberichte</MenuItemButton>
          <MenuItemButton active={step === 8}>Nächste Schritte</MenuItemButton> */}
        </LeftMenu>
      </LeftSide>
        <CenterSide theme={theme}>
          {step === 1 && (
            <>
              <HeaderContainer>Header</HeaderContainer>

              <ParaContainer>Pre-configured models</ParaContainer>
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
            </>
          )}

          {step === 2 && (
            <>
            <Step2 style={{display:"flex",width:'100%'}}>
              <div className='inputField'>
              <InputField
                theme={theme}
                placeholder="Job Nom"
                value={sobNom}
                onChange={(e) => setSobNom(e.target.value)}
                onBlur={checkAvailability}
              />
              <div className="available-not">{availability}</div>
              </div>
              <div className='selectmenufield'>
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
              </div>
              </Step2>
              

              
            <Step2 style={{display:"flex",width:'100%'}}>
              <div className='inputField'>
              <InputField
                theme={theme}
                placeholder="Input"
                value={sobNom}
                onChange={(e) => setSobNom(e.target.value)}
                onBlur={checkAvailability}
              />
              {/* <div className="available-not">{availability}</div> */}
              </div>
              <div className='selectmenufield'>
              <CustomSelect
                value={modelType}
                onChange={handleDropdownChange}
                displayEmpty
                input={<OutlinedInput />}
                renderValue={(selected) => selected || 'DWN Menu'}
                theme={theme}
              >
                <CustomMenuItem value="" theme={theme} disabled>
                  Select Model Type
                </CustomMenuItem>
                <CustomMenuItem value="type1" theme={theme}>Type 1</CustomMenuItem>
                <CustomMenuItem value="type2" theme={theme}>Type 2</CustomMenuItem>
              </CustomSelect>
              </div>
              </Step2>


              
              
            <Step2 style={{display:"flex",width:'100%'}}>
            {/* <Step2Wrapper> */}
            <div className="inputFieldCheck">
        <div>Would you like to upload your own model?</div>
        <label>
          <input
          className='inputcheck'
            type="checkbox"
            checked={isModelUpload}
            onChange={handleCheckboxChange}
          />
          {/* Yes */}
        </label>
      </div>
              
              <div className='selectmenufield'></div>
              </Step2>


            {/* <Step2 style={{display:"flex",width:'100%'}}>
              <div className='inputField'>
              <InputField
                theme={theme}
                placeholder="SOB Nom"
                value={sobNom}
                onChange={(e) => setSobNom(e.target.value)}
                onBlur={checkAvailability}
              />
              </div>
              <div className='selectmenufield'>
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
              </div>
              </Step2> */}


              
              
            <Step2 style={{display:"flex",width:'100%'}}>
            {/* <Step2Wrapper> */}
      <div className="inputField">
      <UploadButtonStep2 theme={theme} onClick={handleUpload}>
          Upload
        </UploadButtonStep2>
      </div>
      <div className="Spinner">
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          ''
        )}
      </div>
              </Step2>
              {/* </div> */}
              {/* <UploadButton theme={theme} onClick={handleOpenModal}>
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
             
              <AdvancedMenuButton theme={theme}>Advanced Menu</AdvancedMenuButton> */}



              <StyledDialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth theme={theme}>
                <DialogTitle>Manage registers</DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    A quantum register is a collection of qubits on which gates and other operations act. A classical register consists of bits that can be written to and read within the quantum circuit's coherence time.
                  </Typography>
                  <Box mb={2}>
                    <Typography variant="subtitle1" gutterBottom style={{ margin: '15px 0px' }}>Quantum registers</Typography>
                    {quantumRegisters.map((register, index) => (
                      <Box key={index} display="flex" alignItems="center" mb={1}>
                        <TextField
                          label="Name"
                          variant="outlined"
                          value={register.name}
                          onChange={(e) => {
                            const newRegisters = [...quantumRegisters];
                            newRegisters[index].name = e.target.value;
                            setQuantumRegisters(newRegisters);
                          }}
                          style={{ marginRight: 10 }}
                        />
                        <TextField
                          label="Number of qubits"
                          variant="outlined"
                          type="number"
                          value={register.qubits}
                          onChange={(e) => {
                            const newRegisters = [...quantumRegisters];
                            newRegisters[index].qubits = parseInt(e.target.value, 10);
                            setQuantumRegisters(newRegisters);
                          }}
                          style={{ marginRight: 10 }}
                        />
                        <IconButton onClick={() => handleRemoveQuantumRegister(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddQuantumRegister}>
                      Add new
                    </Button>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="subtitle1" gutterBottom style={{ margin: '15px 0px' }}>Classical registers</Typography>
                    {classicalRegisters.map((register, index) => (
                      <Box key={index} display="flex" alignItems="center" mb={1}>
                        <TextField
                          label="Name"
                          variant="outlined"
                          value={register.name}
                          onChange={(e) => {
                            const newRegisters = [...classicalRegisters];
                            newRegisters[index].name = e.target.value;
                            setClassicalRegisters(newRegisters);
                          }}
                          style={{ marginRight: 10 }}
                        />
                        <TextField
                          label="Number of bits"
                          variant="outlined"
                          type="number"
                          value={register.bits}
                          onChange={(e) => {
                            const newRegisters = [...classicalRegisters];
                            newRegisters[index].bits = parseInt(e.target.value, 10);
                            setClassicalRegisters(newRegisters);
                          }}
                          style={{ marginRight: 10 }}
                        />
                        <IconButton onClick={() => handleRemoveClassicalRegister(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddClassicalRegister}>
                      Add new
                    </Button>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} style={{ color: 'grey' }}>
                    Cancel
                  </Button>
                  <Button onClick={handleCloseModalOk} variant="contained" style={{ backgroundColor: '#0071eb', color: 'white' }}>
                    Ok
                  </Button>
                </DialogActions>
              </StyledDialog>


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
              <p>Step 4 Content: Server Configuration</p>
              {/* Add more content for step 4 as needed */}
            </div>
          )}
          {step === 5 && (
            <div>
              <p>Step 5 Content: Overview</p>
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
        </CenterSide>
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
              {isDataChecked && selectedResource && checkSelection && (
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

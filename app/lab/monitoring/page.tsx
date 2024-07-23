"use client";

import styled from "styled-components";
import Header from "../../../components/LabHeader";
import Footer from "../../../components/Footer";
import { useState } from "react";
import { FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Scat from "./scatter";
import HeatmapComponent from "./heatmap";
import Dendrogram from "./dendogramm";
import AccuracyPrecisionRecall from "./accuracyPrecisionRecall";
import ProbabilityChart from "./modelcomp";
import Plot from "./density";
import Unique from "./uniqness";
import { GrRedo, GrUndo } from 'react-icons/gr';
// import { BiRedo } from 'react-icons/bi';

import { Select, MenuItem, OutlinedInput } from '@mui/material';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#121619" : "#f4f4f4"};
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  flex: ${({ hasSidebar }) => (hasSidebar ? "3" : "4")};
  background-color: ${({ theme }) =>
    theme === "dark" ? "#121619" : "#f4f4f4"};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  transition: flex 0.3s ease;
`;

const Sidebar = styled.div`
  flex: 1;
  max-width: ${({ isVisible }) => (isVisible ? "20%" : "0")};
  background-color: ${({ theme }) => (theme === "dark" ? "#343a3f" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  flex-direction: column;
  overflow-x: hidden;
  transition: max-width 0.3s ease;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
`;

const ThinSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 3%;
  background-color: ${({ theme }) => (theme === "dark" ? "#21272a" : "#fff")};
  justify-content: space-between;
`;

const ThinSidebarSegment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  position: relative;
  cursor: pointer;
  margin-left: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

const ThinSidebarTextJob = styled.span`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  font-size: 1rem;
`;

const ThinSidebarSegmentJob = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ isActive, theme }) => (isActive ? (theme === "dark" ? "#4a4a4a" : "#ddd") : "transparent")};
  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  }
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  cursor: pointer;
`;

const ThinSidebarText = styled.span`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  font-size: 1rem;
  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
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
  grid-template-rows: repeat(2, 49.5%);
  gap: 2px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => (theme === "dark" ? "#4d5357" : "#e3e4e4")};
`;

const GridItem = styled.div`
  background-color: ${({ theme }) => (theme === "dark" ? "#21272a" : "#fff")};
  position: relative;
  height: 100%;
`;

const FullHeightGridItem = styled(GridItem)`
  grid-row: span 2;
`;

const FullWidthGridItem = styled(GridItem)`
  grid-column: span 2;
`;

const GridTitle = styled.h3`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  font-weight: 300;
  padding: 10px 20px;
  align-items: center;
  margin: 5px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  background-color: ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const HeaderOption = styled.div`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  cursor: pointer;
  padding: 5px 10px;
  position: relative;

  &:hover {
    color: #0f62fe;
  }

  &::after {
    content: "";
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
  height: 0.5px;
  width: 100%;
  background-color: ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
  margin: 20px 0;
`;

const Title = styled.h3`
  font-weight: 300;
  text-align: left;
  font-size: 18px;
  margin: 20px 0px 7px 18px;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

const Para = styled.h3`
  font-weight: 300;
  font-size: 12px;
  text-align: left;
  margin: 0px 20px;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
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
  width: 100%;
  margin:auto;
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
  background-color: ${({ theme }) => (theme === "dark" ? "#21272a" : "#f4f4f4")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  border: none;
  padding: 10px 5px 10px 30px;
  font-size: 1rem;
  width: 80%;
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
    background-color: ${({ theme }) => (theme === "dark" ? "#343a3f" : "#fff")};
  }
  border-radius: 4px;
  cursor: pointer;
`;

const JobSummary = styled.div`
  display: flex;
  width: 95%;
  margin: auto;
  justify-content: space-between;
  align-items: center;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

const JobStatus = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const JobTime = styled.span`
  color: #bec3ca;
  margin-left: 5px;
  font-size: 14px;
`;

const JobId = styled.span`
  color: #bec3ca;
  font-size: 13px;
  margin-left:30px;
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
    content: "⋮";
    font-size: 20px;
  }
`;

const TickIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 5px;

  &:before {
    content: "✔️";
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
  border-bottom: 1px solid ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
`;

const SectionTitle = styled.span`
  font-weight: bold;
`;

const SectionContent = styled.div`
  max-height: ${({ isVisible }) => (isVisible ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const JobDetailsContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};

  p {
    font-size: 13px;
  }
`;

const JobDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JobDetailTitle = styled.div`
  font-size: 0.8rem;
  span{
  
  color: ${({ theme }) => (theme === "dark" ? "#61dafb" : "#0f62fe")};
  //  margin-left:10px;
  }
 
`;

const DetailButton = styled.button`
  background-color: #0f62fe;
  color: #fff;
  border: none;
  padding:8px 17px;
  border-radius: 2px;
  float:right;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #0353e9;
  }
  svg {
    margin-left: 10px; /* Adjust the space between the text and the icon */
  }
`;

const DetailText = styled.span`
  color: ${({ theme }) => (theme === "dark" ? "#61dafb" : "#0f62fe")};
`;

const jobsData = [
  {
    id: "cq4e8ha28rp0008xxmg0",
    time: "Feb 11, 2024 4:14 PM",
    status: "Completed",
    completedTime: "Feb 11, 2024 6:07 PM (in 1h 53m 24.4s)",
    computeResource: "ibm_brisbane",
    statusTimeline: "Completed",
    results: '{"quasi_dists": [{"0000": 0.50}]}',
  },
  {
    id: "cq4bw307z1hg008dqnv0",
    time: "Feb 11, 2024 1:31 PM",
    status: "Completed",
    completedTime: "Feb 11, 2024 3:24 PM (in 1h 53m 24.4s)",
    computeResource: "ibm_brisbane",
    statusTimeline: "Completed",
    results: '{"quasi_dists": [{"0000": 0.50}]}',
  },
];

import { FaChevronDown, } from "react-icons/fa";

const HeaderContainerAccu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 10px;

  
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#2a2a2a")};
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    color: #0f62fe;
  }


  .undo,.redo{
  
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#2a2a2a")};
  }
`;

const DividerAccu = styled.div`
  height: 30px;
  align-item:center;
  width: 1px;

  
  background-color: ${({ theme }) => (theme === "dark" ? "#4a4a4a" : "#e0e0e0")};
  // margin: 0 10px;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;

  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#161616")};
  cursor: pointer;
  display: flex;
  align-items: center;

  font-size: .8275rem;
  font-weight:400;
  &:hover {
    color: #0f62fe;
  }

  svg {
    margin-left: 8px; /* Adjust this value to increase or decrease the space between text and arrow */
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${({ theme }) => (theme === "dark" ? "#21272a" : "#e0e0e0")};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
      font-size: .875rem;
      font-weight:400;
`;

const DropdownItem = styled.a`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#343a3f" : "#ddd")};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleLabel = styled.span`
  color: ${({ theme }) => (theme === "dark" ? "#c1c7cd" : "#525252")};
  margin-right: 10px;
      font-size: .75rem;
          font-weight: 400;
          margin-left:10px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 14px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  & .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 0;
    bottom: 0;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
`;

const CustomSelect = styled(Select)`
  padding: 4px 8px;
  outline:none;
  border:none;
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

import { Tooltip, IconButton } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const ThemedIconButton = styled(IconButton)`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
`;

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-end" arrow />
))`
  & .MuiTooltip-tooltip {
    background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    border-radius: 4px;
    padding: 10px;
    align-items: center;
    margin-right: 20px;
    max-width: 220px;
  }
  & .MuiTooltip-arrow {
    color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  }
`;

export default function HomePage() {
  const [inputJob, setInputJob] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeSegment, setActiveSegment] = useState("ML");
  const [activeOption, setActiveOption] = useState("accuracy");
  const [collapsedSections, setCollapsedSections] = useState({
    statusTimeline: true,
    details: true,
    results: true,
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
      [section]: !collapsedSections[section],
    });
  };

  const generateDataPoints = (numPoints) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: 15000 + Math.random() * 25000,
        y: Math.random(),
      });
    }
    return points;
  };

  const dataPoints = generateDataPoints(200);

  const [activeTopNav, setActiveTopNav] = useState("monitoring");
  const [activeSidebar, setActiveSidebar] = useState("lab");

  const [isActive, setIsActive] = useState(false);

  const handleForeignObjectClick = () => {
    setIsActive(!isActive);
  };


  const [modelType, setModelType] = useState('Statevector');

  const handleDropdownChange = (e) => {
    setModelType(e.target.value);
  };

  const [modelTypeShape, setModelTypeShape] = useState('Statevector');

  const handleDropdownChangeShape = (e) => {
    setModelTypeShape(e.target.value);
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
          <ThinSidebarSegmentJob
            onClick={handleJobClick}
            theme={theme}
            isActive={isActive}
          >
            {isSidebarVisible && <ActiveIndicator />}
            <ThinSidebarTextJob theme={theme}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <foreignObject
                  width="100%"
                  height="100%"
                  onClick={handleForeignObjectClick}
                >
                  <div xmlns="http://www.w3.org/1999/xhtml">
                    <svg
                      viewBox="0 0 16 16"
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path
                        d="M7 6.00024V10.0002L10.5 8.00024L7 6.00024Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M8.95068 13.3998L9.10069 14.3998C9.85069 14.2498 10.5507 13.9998 11.2007 13.6498L10.7007 12.7998C10.2007 13.0998 9.60068 13.2998 8.95068 13.39982"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M12.2007 11.5504L12.9507 12.2003C13.4507 11.6503 13.8007 10.9504 14.0507 10.2504L13.1007 9.90039C12.9507 10.5004 12.6007 11.0504 12.2007 11.5504Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M4.75 13.6002C5.4 13.9502 6.1 14.2502 6.85 14.3502L7 13.3502C6.35 13.2502 5.75 13.0002 5.2 12.7002L4.75 13.6002Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M2.8499 9.90039L1.8999 10.2504C2.1499 10.9504 2.5499 11.6503 2.9999 12.2003L3.1499 12.0504L3.7499 11.5504C3.3999 11.0504 3.0499 10.5004 2.8499 9.900397"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.4999 8C14.4999 7.2 14.3499 6.45005 14.0999 5.80005L13.1499 6.15002C13.3499 6.75002 13.4999 7.35005 13.4999 8.05005H14.4999V8Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M13 3.80005C11.8 2.40005 10 1.5 8 1.5C6 1.5 4.2 2.39998 3 3.84998V2.75H2V6H5V5H3.4C4.4 3.5 6.05 2.5 8 2.5C9.7 2.5 11.2 3.24995 12.2 4.44995L13 3.80005Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </foreignObject>
              </svg>
            </ThinSidebarTextJob>
          </ThinSidebarSegmentJob>
          <ThinSidebarSegment onClick={() => handleSegmentClick("ML")} theme={theme}>
            {activeSegment === "ML" && <ActiveIndicator />}
            <ThinSidebarText theme={theme}>M</ThinSidebarText>
            <ThinSidebarText theme={theme}>L</ThinSidebarText>
          </ThinSidebarSegment>
          <ThinSidebarSegment onClick={() => handleSegmentClick("QML")} theme={theme}>
            {activeSegment === "QML" && <ActiveIndicator />}
            <ThinSidebarText theme={theme}>Q</ThinSidebarText>
            <ThinSidebarText theme={theme}>M</ThinSidebarText>
            <ThinSidebarText theme={theme}>L</ThinSidebarText>
          </ThinSidebarSegment>
          <ThinSidebarSegment onClick={() => handleSegmentClick("QML2")} theme={theme}>
            {activeSegment === "QML2" && <ActiveIndicator />}
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
                  {/* <button onClick={handleBackToList}>Back to list</button> */}
                  <JobDetailHeader>
                    <JobDetailTitle theme={theme}>
                      <span>   Jobs   <span style={{ color: 'white' }}>/</span> </span>
                    </JobDetailTitle>
                    <ThreeDots />
                  </JobDetailHeader>

                  <div>{selectedJob.id}</div>
                  <br /><br />
                  <DetailButton>
                    See more details <FaExternalLinkAlt />
                  </DetailButton>
                  <br /><br />

                  <br />
                  <div>
                    <p><strong>Completed:</strong> </p>
                    <p>{selectedJob.completedTime}</p>
                    <p><strong>Compute resource:</strong></p>
                    <p> {selectedJob.computeResource}</p>
                  </div>
                  <CollapsibleSection>
                    <SectionHeader onClick={() => toggleSection("statusTimeline")} theme={theme}>
                      <SectionTitle>Status timeline</SectionTitle>
                      <span>{collapsedSections.statusTimeline ? "▼" : "▲"}</span>
                    </SectionHeader>
                    <SectionContent isVisible={!collapsedSections.statusTimeline} theme={theme}>
                      <p><strong>Status timeline:</strong> {selectedJob.statusTimeline}</p>
                    </SectionContent>
                  </CollapsibleSection>
                  <CollapsibleSection>
                    <SectionHeader onClick={() => toggleSection("details")} theme={theme}>
                      <SectionTitle>Details</SectionTitle>
                      <span>{collapsedSections.details ? "▼" : "▲"}</span>
                    </SectionHeader>
                    <SectionContent isVisible={!collapsedSections.details} theme={theme}>
                      <p>Details content goes here.</p>
                    </SectionContent>
                  </CollapsibleSection>
                  <CollapsibleSection>
                    <SectionHeader onClick={() => toggleSection("results")} theme={theme}>
                      <SectionTitle>Results</SectionTitle>
                      <span>{collapsedSections.results ? "▼" : "▲"}</span>
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
                            <JobInfo>
                              <JobStatus theme={theme}>
                                {job.status === "Completed" && <TickIcon />}
                                Completed:
                                <JobTime theme={theme}>{job.time}</JobTime>
                              </JobStatus>
                              <JobId theme={theme}>ID: {job.id} | {job.computeResource}</JobId>
                            </JobInfo>
                            <JobActions>
                              <ThreeDots />
                            </JobActions>
                          </JobSummary>
                          <HorizontalDivider theme={theme} />
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
          {activeSegment === "ML" && (
            <GridContainer theme={theme}>
              <GridItem theme={theme}>
                <HeatmapComponent theme={theme} />
              </GridItem>
              <GridItem theme={theme}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <HeaderContainerAccu theme={theme}>
                    <Button theme={theme}>
                      <GrUndo className="undo" />
                    </Button>
                    <Button theme={theme}>
                      <GrRedo className="redo" />
                    </Button>
                    <DividerAccu theme={theme} />


                    <CustomSelect
                      className="customselectz"
                      value={modelTypeShape}
                      onChange={handleDropdownChangeShape}
                      displayEmpty
                      renderValue={(selected) => selected || 'Select Model Type'}
                      theme={theme}
                    >
                      <CustomMenuItem value="Statevector" theme={theme}>Statevector</CustomMenuItem>
                      <CustomMenuItem value="Probabilities" theme={theme}>Probabilities</CustomMenuItem>
                    </CustomSelect>
                    <DividerAccu theme={theme} />
                    <ToggleContainer>
                      <ToggleLabel theme={theme}>Inspect</ToggleLabel>
                      <ToggleSwitch>
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </ToggleSwitch>
                    </ToggleContainer>
                  </HeaderContainerAccu>
                  <CustomTooltip
                    title="This visualization shows a  of randomly generated values."
                    theme={theme}
                    arrow
                  >
                    <ThemedIconButton size="small" theme={theme}>
                      <InfoOutlinedIcon style={{ marginRight: "20px" }} />
                    </ThemedIconButton>
                  </CustomTooltip>
                </div>
                <Scat theme={theme} dataPoints={dataPoints} />
              </GridItem>
              <GridItem theme={theme}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <HeaderContainerAccu theme={theme}>
                    <Button theme={theme}>
                      <GrUndo className="undo" />
                    </Button>
                    <Button theme={theme}>
                      <GrRedo className="redo" />
                    </Button>
                    <DividerAccu theme={theme} />


                    <CustomSelect
                      className="customselectz"
                      value={modelType}
                      onChange={handleDropdownChange}
                      displayEmpty
                      renderValue={(selected) => selected || 'Select Model Type'}
                      theme={theme}
                    >
                      <CustomMenuItem value="Statevector" theme={theme}>Statevector</CustomMenuItem>
                      <CustomMenuItem value="Probabilities" theme={theme}>Probabilities</CustomMenuItem>
                    </CustomSelect>
                    <DividerAccu theme={theme} />
                    <ToggleContainer>
                      <ToggleLabel theme={theme}>Inspect</ToggleLabel>
                      <ToggleSwitch>
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </ToggleSwitch>
                    </ToggleContainer>
                  </HeaderContainerAccu>
                  <CustomTooltip
                    title="This visualization shows a  of randomly generated values."
                    theme={theme}
                    arrow
                  >
                    <ThemedIconButton size="small" theme={theme}>
                      <InfoOutlinedIcon style={{ marginRight: "20px" }} />
                    </ThemedIconButton>
                  </CustomTooltip>
                </div>
                <AccuracyPrecisionRecall selectedMetric={activeOption} theme={theme} />
              </GridItem>
              <GridItem theme={theme}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <GridTitle theme={theme}>Hyperparameter Tuning</GridTitle>
                  <CustomTooltip
                    title="This visualization shows a  of randomly generated values."
                    theme={theme}
                    arrow
                  >
                    <ThemedIconButton size="small" theme={theme}>
                      <InfoOutlinedIcon style={{ marginRight: "20px" }} />
                    </ThemedIconButton>
                  </CustomTooltip>
                </div>
                <Dendrogram theme={theme} />
              </GridItem>
            </GridContainer>
          )}
          {activeSegment === "QML" && (
            <GridContainer theme={theme}>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Quantum Heatmap</GridTitle>
                <ProbabilityChart theme={theme} />
              </GridItem>
              <FullHeightGridItem theme={theme}>
                <GridTitle theme={theme}>Quantum SHAP</GridTitle>
              </FullHeightGridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Quantum Header</GridTitle>
                <Plot theme={theme} />
              </GridItem>
            </GridContainer>
          )}
          {activeSegment === "QML2" && (
            <GridContainer theme={theme}>
              <FullWidthGridItem theme={theme}>
                <GridTitle theme={theme}>Advanced Quantum Heatmap</GridTitle>
              </FullWidthGridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Advanced Quantum SHAP</GridTitle>
                <Unique theme={theme} />
              </GridItem>
              <GridItem theme={theme}>
                <GridTitle theme={theme}>Advanced Quantum Header</GridTitle>
              </GridItem>
            </GridContainer>
          )}
        </MainContent>
      </Content>
      <Footer />
    </Container>
  );
}

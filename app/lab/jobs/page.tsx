"use client";

import { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
// import { FaSearch, FaSync, FaFileExport } from 'react-icons/fa';
import { FaSearch, FaSync, FaFileExport, FaChevronLeft, FaChevronRight, FaCheckCircle, FaBan } from 'react-icons/fa';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 3vw;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? 'white' : '#000')};
  margin-top: 0px;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
`;

const BannerText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BannerTitle = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.28572;
`;

const BannerSubtitle = styled.p`
  font-size: 0.875rem;
  letter-spacing: 0.16px;
  line-height: 1.28572;
  color: ${({ theme }) => (theme === 'dark' ? '#c1c7cd' : '#000')};
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 50px;
  background-color: #4a4a4a;
  margin: 0 20px;
`;

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const UsageTitle = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.32px;
  line-height: 1.33333;
  margin-bottom: 5px;
  text-align: left;
  color: #a9a9a9;
`;

const UsageDetail = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.32px;
  line-height: 1.33333;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  span {
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  }
`;

const UsageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled.div`
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  padding: 0px;
  margin: 0;
  border-radius: 0;
  height: auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content:space-between;
  .search-div {
    width: 90.5%;
  }
  .btn-div {
    width:9.5%;
    display:flex;
    justify-content:flex-end;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 98%;
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a9a9a9;
  font-size: 0.875rem;
`;

const SearchInput = styled.input`
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  padding: 15px 10px 15px 40px;
  font-size: 0.875rem;
  width: 100%;
  border-radius: 0;
  &::placeholder {
    color: #a9a9a9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  height: 100%;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 4.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid  ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#e0e0e0')}; ; 
  
  transition: background-color 0.3s;
  &:hover{
    
  background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e8e8e8')};
  }
  &:focus {
    outline: none;
  }
`;

const RefreshIcon = styled(FaSync)`
  font-size: 0.875rem;
  color: ${({ theme }) => (theme === 'dark' ? '#f2f4f8' : '#000')};
`;

const ExportIcon = styled(FaFileExport)`
  font-size: 0.875rem;
  color: ${({ theme }) => (theme === 'dark' ? '#f2f4f8' : '#000')};
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#e0e0e0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const HeaderItem = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  font-size: 0.875rem;
  font-weight: bold;
  margin: auto;
  flex: 1;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border-radius: 2px;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  &:checked {
    background-color: white;
    border: 2px solid white;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M20.285 6.277c-.39-.39-1.024-.39-1.414 0L9 16.148l-4.871-4.87c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l5.585 5.586c.39.39 1.024.39 1.414 0L20.285 7.69c.39-.39.39-1.024 0-1.414z"/></svg>');
    background-repeat: no-repeat;
    background-position: center;
  }
  &:focus {
    outline: none;
  }
`;


const TableRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  padding: 15px 0px;
  color: ${({ theme }) => (theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#000')};
  font-size: 0.875rem;
  position: relative;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  }

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#e0e0e0')};
  }

  &:hover .hover-info {
    display: block;
  }
`;


const TableDataItem = styled.span`
  flex: 1;
  text-align: center;
  font-size: 0.875rem;
  position: relative;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#e0e0e0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 0.75rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const PaginationButton = styled.button`
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#e0e0e0')};
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #4a4a4a;
  padding-left: 10px;

  .icon {
    color: ${({ theme }) => (theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#000')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0px;
  color: ${({ theme }) => (theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#000')};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
`;

const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#000')};
  font-size: 0.875rem;
  border-left: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  padding: 0px 10px;
  text-align: center;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#000')};
  font-size: 0.875rem;
  border-left: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  padding-left: 10px;

  span {
    padding-right: 5px;
  }
`;

const ItemsPerPage = styled.span`
  margin-right: 10px;
  color: ${({ theme }) => (theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : '#000')};
  font-size: 0.875rem;
  border-right: 1px solid ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#e0e0e0')};
  padding-right: 10px;
`;

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const theme = useSelector((state) => state.theme.theme);
  const [currentPage, setCurrentPage] = useState(1);
  const items = Array.from({ length: 30 }).map((_, index) => ({
    id: index + 1,
    session: `Session${index + 1}`,
    status: index % 2 === 0 ? 'Completed' : 'Cancelled',
    completed: index % 2 === 0 ? 'Yes' : 'No',
    program: `Program${index + 1}`,
    resource: `Resource${index + 1}`,
    usage: `${(index + 1) * 5}ms`,
    tags: `Tag${index + 1}`,
    created: new Date(`2024-04-10T03:44:00`).toLocaleString(), // Example date
  }));

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);
  const [activeTopNav, setActiveTopNav] = useState('jobs');
  const [activeSidebar, setActiveSidebar] = useState('lab');

  const handleTopNavClick = (option: string) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option: string) => {
    setActiveSidebar(option);
  };

  return (
    <Container theme={theme}>
      <Header
        activeTopNav={activeTopNav}
        activeSidebar={activeSidebar}
        onTopNavClick={handleTopNavClick}
        onSidebarClick={handleSidebarClick}
      />
      <Banner theme={theme}>
        <BannerText>
          <BannerTitle>Jobs</BannerTitle>
          <BannerSubtitle theme={theme}>Manage your jobs and monitor their progress</BannerSubtitle>
        </BannerText>
        <UsageWrapper>
          <VerticalDivider />
          <UsageContainer>
            <UsageTitle>Monthly usage</UsageTitle>
            <UsageDetail theme={theme}>0ms used / <span>10m</span></UsageDetail>
          </UsageContainer>
        </UsageWrapper>
      </Banner>
      <Main theme={theme}>
        <ContentBox theme={theme}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div className="search-div">
              <SearchContainer>
                <SearchInputContainer>
                  <SearchInput placeholder="Search for Jobs by ID, name or tag" theme={theme} />
                  <SearchIcon />
                </SearchInputContainer>
              </SearchContainer>
            </div>
            <div className="btn-div">
              <ButtonContainer>
                <ButtonGroup>
                  <Button theme={theme}>
                    <RefreshIcon theme={theme} />
                  </Button>
                  <Divider />
                  <Button theme={theme}>
                    <ExportIcon theme={theme} />
                  </Button>
                </ButtonGroup>
              </ButtonContainer>
            </div>
          </div>
          <TableHeader theme={theme}>
            <HeaderItem theme={theme}>
              <Checkbox theme={theme} />
            </HeaderItem>
            <HeaderItem>Job Id</HeaderItem>
            <HeaderItem>Session Id</HeaderItem>
            <HeaderItem>Status</HeaderItem>
            <HeaderItem>Created</HeaderItem>
            <HeaderItem>Completed</HeaderItem>
            <HeaderItem>Program</HeaderItem>
            <HeaderItem>Compute Resource</HeaderItem>
            <HeaderItem>Usage</HeaderItem>
            <HeaderItem>Tags</HeaderItem>
          </TableHeader>
          {currentItems.map((item) => (
            <TableRow key={item.id} theme={theme}>
              <TableDataItem theme={theme}>
                <Checkbox theme={theme} />
              </TableDataItem>
              <TableDataItem>{item.id}</TableDataItem>
              <TableDataItem>{item.session}</TableDataItem>
              <TableDataItem>
                <StatusContainer>
                  {item.status === 'Completed' ? (
                    <FaCheckCircle style={{ color: 'green' }} />
                  ) : (
                    <FaBan style={{ color: 'red' }} />
                  )}
                  {item.status}
                </StatusContainer>
              </TableDataItem>
              <TableDataItem theme={theme}>
                About 2 months ago
              </TableDataItem>
              <TableDataItem>{item.completed}</TableDataItem>
              <TableDataItem>{item.program}</TableDataItem>
              <TableDataItem>{item.resource}</TableDataItem>
              <TableDataItem>{item.usage}</TableDataItem>
              <TableDataItem>{item.tags}</TableDataItem>
              <Tooltip className="hover-info" theme={theme}>
                {item.created}
              </Tooltip>
            </TableRow>
          ))}
          <PaginationContainer theme={theme}>
            <PaginationInfo theme={theme}>
              <ItemsPerPage theme={theme}>Items per page: {ITEMS_PER_PAGE}</ItemsPerPage>
              0-0 of 0 items
            </PaginationInfo>
            <PaginationControls theme={theme}>
              <span>Page {currentPage} of {totalPages}</span>
              <PaginationButton
                theme={theme}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft className="icon" />
              </PaginationButton>
              <PaginationButton
                theme={theme}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight className="icon" />
              </PaginationButton>
            </PaginationControls>
          </PaginationContainer>
        </ContentBox>
        <div style={{ marginBottom: '40px' }} />
      </Main>
      <Footer />
    </Container>
  );
}

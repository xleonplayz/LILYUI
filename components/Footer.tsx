'use client';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../redux/slices/themesSlice';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import PublicIcon from '@mui/icons-material/Public'; // Importing the globe icon

const FooterContainer = styled.div`
  width: 100%;
  padding: 15px 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};

  .outlined-icon {
    color: transparent;
    stroke: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#666')};
    stroke-width: 0.5; /* Adjust the width of the outline as needed */
  }

  .box {
    border: 1px solid ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#c7c7c7')};
    border-radius: 10px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden; /* Prevent overflow */
    margin-right: 20px;

    .divider {
      width: 1px;
      height: 100%; /* Adjust the height as needed */
      background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#c7c7c7')}; /* Same color as the border */
    }

    div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease; /* Smooth transition for hover effect */
      
      &:hover, &:active, &.active {
        background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#c6c6c6')};
      }
      
      &:first-child {
        border-right: 1px solid ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#c7c7c7')}; /* Divider line */
      }
    }
  }

  .left {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .link {
      margin-right: 15px;
      font-size:13px;
      cursor: pointer;
      color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .outicon {
color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};
    stroke: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#666')};
    stroke-width: 0.5; /* Adjust the width of the outline as needed */
  }
`;

export default function Footer() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [activeTheme, setActiveTheme] = useState(theme);

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  return (
    <FooterContainer theme={theme}>
      <div className='left'>
        <PublicIcon className='outicon' style={{ marginRight: '20px' }} /> {/* Adding the globe icon */}
        <span className="link">Terms</span>
        <span className="link">Privacy</span>
        <span className="link">Cookie preferences</span>
        <span className="link">Support</span>
      </div>
      <div className='box'>
        <div 
          onClick={() => {
            dispatch(setLightTheme());
            setActiveTheme('light');
          }}
          className={activeTheme === 'light' ? 'active' : ''}
        >
          <WbSunnyIcon className="outlined-icon" fontSize="small" />
        </div>
        <div 
          onClick={() => {
            dispatch(setDarkTheme());
            setActiveTheme('dark');
          }}
          className={activeTheme === 'dark' ? 'active' : ''}
        >
          <NightsStayOutlinedIcon className="outlined-icon" fontSize="small" />
        </div>
      </div>
    </FooterContainer>
  );
}

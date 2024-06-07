// components/Footer.tsx
'use client';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../redux/slices/themesSlice';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';

const FooterContainer = styled.div`
  width: 100%;
  padding: 10px 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#fff')};
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
    stroke: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
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
    margin-left: 20px;
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
      <div className='left'>© 2024 Your Company Name</div>
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
        {/* <div className="divider" /> */}
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

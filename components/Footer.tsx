// components/Footer.tsx
'use client';

import styled from 'styled-components';
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../redux/slices/themesSlice';

const FooterContainer = styled.div`
  width: 100%;
  padding: 10px 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#fff')};
  border-top: 1px solid   ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  
  bottom: 0;
  z-index: 1000;
  color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};
  div {
  
  }
  .outlined-icon {
  color: transparent;
  stroke:   ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  stroke-width: 15; /* Adjust the width of the outline as needed */
  
}
  .box{
  border:1px solid   ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};;; ;
  border-radius:32px;
  width:100px;
  padding:5px;
  align-item:center;
  // margin-left:50px;
  justify-content:space-between;
  }

  .left{
  padding-left:30px;}
`;



export default function Footer() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <FooterContainer theme={theme}>
      <div  className ='left'>© 2024 Your Company Name</div>
      <div style={{ display: 'flex', gap: '0px' }} className='box'>
        <div
          onClick={() => dispatch(setLightTheme())}
          style={{
            cursor: 'pointer',
            paddingRight: '0px',
            
            paddingLeft: '15px',
            // height: '20px',
            // border: '1px solid  #343a3f',
            // backgroundColor: theme === 'light' ? '#bbb' : 'transparent',
            // borderRight:'1px solid black'
          }}
        >
          <FaSun className="outlined-icon"  size={15}/>
        </div>
        <div
          onClick={() => dispatch(setDarkTheme())}
          style={{
            cursor: 'pointer',
            paddingRight: '20px',
            
            paddingLeft: '15px',
            // height: '20px',
            // border: '1px solid  #343a3f',
            // backgroundColor: theme === 'light' ? '#bbb' : 'transparent',
              borderLeft:'1px solid #343a3f'
          }}
        >
          <FaMoon size={15}  className='  outlined-icon '/>
        </div>
      </div>
    </FooterContainer>
  );
}

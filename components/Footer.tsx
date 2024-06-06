// components/Footer.tsx
'use client';

import styled from 'styled-components';
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../redux/slices/themesSlice';

const FooterContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
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
    padding-right: 30px;
  }
`;

export default function Footer() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <FooterContainer theme={theme}>
      <div>© 2024 Your Company Name</div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div
          onClick={() => dispatch(setLightTheme())}
          style={{
            cursor: 'pointer',
            padding: '8px 10px',
            height: '20px',
            border: '1px solid  #343a3f',
            backgroundColor: theme === 'light' ? '#bbb' : 'transparent',
          }}
        >
          <FaSun size={22} />
        </div>
        <div
          onClick={() => dispatch(setDarkTheme())}
          style={{
            cursor: 'pointer',
            padding: '8px 10px',
            height: '20px',
            border: '1px solid  #343a3f',
            backgroundColor: theme === 'dark' ? '#343a3f' : 'transparent',
          }}
        >
          <FaMoon size={22} />
        </div>
      </div>
    </FooterContainer>
  );
}

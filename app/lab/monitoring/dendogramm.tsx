'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Tree from 'react-d3-tree';

import { Slider, MenuItem, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { OutlinedInput, Select } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface NodeData {
  name: string;
  children?: NodeData[];
}

const DendrogramContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 90%;
  width: 100%;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
`;

const CustomSelect = styled(Select)`
  outline: none;
  border: none;
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

const ThemedIconButton = styled(IconButton)<{ theme: string }>`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-end" arrow />
))`
  & .MuiTooltip-tooltip {
    background-color: ${({ theme }) => (theme === 'dark' ? '#343a3e' : '#fff')};
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    border-radius: 4px;
    padding: 15px;
    max-width: 220px;
  }
  & .MuiTooltip-arrow {
    color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`;

const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 17%;
`;

const data: NodeData = {
  name: 'root',
  children: [
    {
      name: '1',
      children: [
        { name: '2' },
        { name: '10' },
      ],
    },
    {
      name: '3',
      children: [
        { name: '4' },
        { name: '6' },
        { name: '7' },
      ],
    },
    {
      name: '5',
      children: [
        { name: '8' },
        { name: '9' },
      ],
    },
  ],
};

const Dendrogram: React.FC<{ theme: string }> = ({ theme }) => {
  const [modelTypeDendrogram, setModelTypeDendrogram] = useState('Statevector');

  const handleDropdownChangeShape = (e) => {
    setModelTypeDendrogram(e.target.value);
  };

  return (
    <>
      <TitleContainer theme={theme}>
        <HeaderSection>
          <CustomSelect
            value={modelTypeDendrogram}
            onChange={handleDropdownChangeShape}
            displayEmpty
            input={<OutlinedInput />}
            theme={theme}
          >
            <CustomMenuItem value="Statevector" theme={theme}>Statevector</CustomMenuItem>
            <CustomMenuItem value="Probabilities" theme={theme}>Probabilities</CustomMenuItem>
          </CustomSelect>
        </HeaderSection>
        <ControlsSection>
          <ThemedIconButton size="small" theme={theme}>
            <RefreshIcon />
          </ThemedIconButton>
          <CustomTooltip title="This visualization shows the probability of outputs across the computational basis states, for up to 8 qubits." theme={theme} arrow>
            <ThemedIconButton size="small" theme={theme}>
              <InfoOutlinedIcon />
            </ThemedIconButton>
          </CustomTooltip>
          <ThemedIconButton size='small' theme={theme}>
            <MoreVertIcon />
          </ThemedIconButton>
        </ControlsSection>
      </TitleContainer>

      {/* <DendrogramContainer>
        <Tree
          data={data}
          orientation="horizontal"
          pathFunc="step"
          translate={{ x: 100, y: 200 }}
          styles={{
            links: {
              stroke: 'blue',
              strokeWidth: 2,
            },
            nodes: {
              node: {
                circle: {
                  fill: 'blue',
                },
                name: {
                  stroke: theme === 'dark' ? '#fff' : '#000',
                },
              },
              leafNode: {
                circle: {
                  fill: 'blue',
                },
                name: {
                  stroke: theme === 'dark' ? '#fff' : '#000',
                },
              },
            },
          }}
        />
      </DendrogramContainer> */}
    </>
  );
};

export default Dendrogram;

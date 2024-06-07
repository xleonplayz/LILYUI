// components/HeatmapComponent.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { HeatMap } from 'react-d3-heatmap';
import { Slider, Select, MenuItem, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const HeatmapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const GridTitle = styled.h3`
  color:  ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-weight: 300;
  position: absolute;
  top: 10px;
  left: 20px;
  margin: 0;
`;

function generateRandomMatrix(rows, cols) {
  return Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => Math.random()));
}

export default function HeatmapComponent({ theme }) {
  const [matrix, setMatrix] = useState(generateRandomMatrix(10, 10));
  const [modelSphere, setModelSphere] = useState('Sphere 1');

  const handleSliderChange = (event, newValue) => {
    setMatrix(generateRandomMatrix(10, 10));
  };

  const handleModelSphereChange = (event) => {
    const newModelSphere = event.target.value;
    setModelSphere(newModelSphere);
    const [rows, cols] = newModelSphere === 'Sphere 1' ? [10, 10] : [15, 5];
    setMatrix(generateRandomMatrix(rows, cols));
  };

  return (
    <>
    
      <HeatmapContainer>
        <HeatMap
          data={matrix}
          xLabels={Array.from({ length: matrix[0].length }, (_, i) => i + 1)}
          yLabels={Array.from({ length: matrix.length }, (_, i) => i + 1)}
          width={500}
          height={400}
          cellHeight={20}
          cellWidth={20}
        />
      </HeatmapContainer>
      <ControlsContainer>
        <Slider
          defaultValue={1}
          step={1}
          marks
          min={1}
          max={10}
          onChange={handleSliderChange}
          style={{ width: '70%' }}
        />
        <Select
          value={modelSphere}
          onChange={handleModelSphereChange}
          style={{ width: '25%' }}
        >
          <MenuItem value="Sphere 1">Sphere 1</MenuItem>
          <MenuItem value="Sphere 2">Sphere 2</MenuItem>
        </Select>
      </ControlsContainer>
    </>
  );
}

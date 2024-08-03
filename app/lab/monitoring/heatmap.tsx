'use client'
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Slider, MenuItem, Tooltip, IconButton, Select, OutlinedInput } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HeatmapContainer = styled.div`
  width: 90%;
  height: 300px;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
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

const ThemedIconButton = styled(IconButton) <{ theme: string }>`
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

function generateRandomMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random()));
}

const drawHeatmap = (data: number[][], canvas: HTMLCanvasElement, colorBarCanvas: HTMLCanvasElement, theme: string) => {
  const ctx = canvas.getContext('2d');
  const colorBarCtx = colorBarCanvas.getContext('2d');
  if (!ctx || !colorBarCtx) return;

  const width = canvas.width;
  const height = canvas.height;
  const rows = data.length;
  const cols = data[0].length;
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  const colorScale = (value: number) => {
    if (value <= 0.1) return '#08306b';
    if (value <= 0.2) return '#2171b5';
    if (value <= 0.3) return '#6baed6';
    if (value <= 0.4) return '#bdd7e7';
    if (value <= 0.5) return '#f7fbff';
    if (value <= 0.6) return '#fee0d2';
    if (value <= 0.7) return '#fcae91';
    if (value <= 0.8) return '#fb6a4a';
    if (value <= 0.9) return '#de2d26';
    return '#a50f15';
  };

  ctx.clearRect(0, 0, width, height);

  data.forEach((row, i) => {
    row.forEach((value, j) => {
      ctx.fillStyle = colorScale(value);
      ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    });
  });

  // Draw color bar
  const colorBarWidth = 20;
  const colorBarHeight = height;
  colorBarCanvas.width = colorBarWidth;
  colorBarCanvas.height = colorBarHeight;
  const gradient = colorBarCtx.createLinearGradient(0, 0, 0, colorBarHeight);
  gradient.addColorStop(0, '#a50f15');
  gradient.addColorStop(0.1, '#de2d26');
  gradient.addColorStop(0.2, '#fb6a4a');
  gradient.addColorStop(0.3, '#fcae91');
  gradient.addColorStop(0.4, '#fee0d2');
  gradient.addColorStop(0.5, '#f7fbff');
  gradient.addColorStop(0.6, '#bdd7e7');
  gradient.addColorStop(0.7, '#6baed6');
  gradient.addColorStop(0.8, '#2171b5');
  gradient.addColorStop(0.9, '#08306b');
  gradient.addColorStop(1, '#08306b');

  colorBarCtx.fillStyle = gradient;
  colorBarCtx.fillRect(0, 0, colorBarWidth, colorBarHeight);

  // Add labels to the color bar
  colorBarCtx.fillStyle = theme === 'dark' ? '#fff' : '#000';
  colorBarCtx.textAlign = 'left';
  colorBarCtx.textBaseline = 'middle';
  colorBarCtx.font = '12px Arial';
  const labels = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0];
  labels.forEach((label, i) => {
    colorBarCtx.fillText(label, colorBarWidth + 5, (i * colorBarHeight) / 10);
  });

  ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '12px Arial';

  // Position X and Y labels outside the heatmap
  const xLabelOffset = 30;
  const yLabelOffset = 50;

  ctx.fillText('X LABEL', width / 2, height + xLabelOffset);
  ctx.save();
  ctx.translate(-yLabelOffset, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Y LABEL', 0, 0);
  ctx.restore();
};

const HeatmapComponent = ({ theme }) => {
  const [matrix, setMatrix] = useState(generateRandomMatrix(10, 10));
  const [modelSphere, setModelSphere] = useState('Statevector');
  const canvasRef = useRef(null);
  const colorBarCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const colorBarCanvas = colorBarCanvasRef.current;
    if (canvas && colorBarCanvas) {
      canvas.width = canvas.parentElement.clientWidth - 50; // Leave space for color bar and padding
      canvas.height = canvas.parentElement.clientHeight - 50; // Adjust height for labels
      drawHeatmap(matrix, canvas, colorBarCanvas, theme);
    }
  }, [matrix, theme]);

  const handleSliderChange = (event, newValue) => {
    setMatrix(generateRandomMatrix(10, 10));
  };

  const handleModelSphereChange = (event) => {
    const newModelSphere = event.target.value;
    setModelSphere(newModelSphere);
    const [rows, cols] = newModelSphere === 'Statevector' ? [10, 10] : [15, 5];
    setMatrix(generateRandomMatrix(rows, cols));
  };

  return (
    <>
      <TitleContainer theme={theme}>
        <HeaderSection>
          <CustomSelect
            value={modelSphere}
            onChange={handleModelSphereChange}
            displayEmpty
            input={<OutlinedInput />}
            theme={theme}
          >
            <CustomMenuItem value="Statevector" theme={theme}>Statevector</CustomMenuItem>
            <CustomMenuItem value="Probabilities" theme={theme}>Probabilities</CustomMenuItem>
          </CustomSelect>
        </HeaderSection>
        <ControlsSection>
          <ThemedIconButton size="small" theme={theme} onClick={() => setMatrix(generateRandomMatrix(10, 10))}>
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
      <HeatmapContainer>
        <canvas ref={canvasRef} />
        <canvas ref={colorBarCanvasRef} style={{ marginLeft: '10px' }} />
      </HeatmapContainer>
      <ControlsContainer>
        <Slider
          defaultValue={1}
          step={1}
          marks
          min={1}
          max={10}
          onChange={handleSliderChange}
          style={{ width: '85%' }}
        />
      </ControlsContainer>
    </>
  );
};

export default HeatmapComponent;

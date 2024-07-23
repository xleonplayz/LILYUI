'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Slider, MenuItem, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { OutlinedInput, Select } from '@mui/material';
import * as d3 from 'd3';

const HeatmapContainer = styled.div`
  width: 90%;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
`;

const GridTitle = styled.h3<{ theme: string }>`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-weight: 300;
  margin: 0;
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

// Custom tooltip styles
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
  // min-height:00px;
  }
  & .MuiTooltip-arrow {
    color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
  }
`;

function generateRandomMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random()));
}

interface HeatmapComponentProps {
  theme: string;
}

const drawHeatmap = (data: number[][], container: HTMLDivElement, theme: string) => {
  const margin = { top: 20, right: 80, bottom: 30, left: 50 }; // Increased right margin for color bar
  const width = container.clientWidth - margin.left - margin.right;
  const height = container.clientHeight - margin.top - margin.bottom;

  // Remove the old svg if it exists
  d3.select(container).select('svg').remove();

  const svg = d3.select(container).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const rows = data.length;
  const cols = data[0].length;

  const xScale = d3.scaleBand()
    .domain(d3.range(cols).map(String))
    .range([0, width]);

  const yScale = d3.scaleBand()
    .domain(d3.range(rows).map(String))
    .range([0, height]);

  const colorScale = d3.scaleSequential(d3.interpolateRdBu)
    .domain([1, 0]); // Inverted to match the desired color scale

  svg.selectAll()
    .data(data.flat())
    .enter()
    .append('rect')
    .attr('x', (_, i) => xScale(String(i % cols))!)
    .attr('y', (_, i) => yScale(String(Math.floor(i / cols)))!)
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .attr('fill', d => colorScale(d));

  const labelColor = theme === 'dark' ? '#fff' : '#000';

  // Add X Label
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('fill', labelColor)
    .text('X LABEL');

  // Add Y Label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .style('fill', labelColor)
    .text('Y LABEL');

  // Add color bar
  const colorBarHeight = height;
  const colorBarWidth = 20;

  const colorBarScale = d3.scaleLinear()
    .domain(colorScale.domain())
    .range([colorBarHeight, 0]);

  const colorBarAxis = d3.axisRight(colorBarScale)
    .ticks(6);

  const colorBar = svg.append('g')
    .attr('transform', `translate(${width + 10}, 0)`);

  const gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '100%')
    .attr('x2', '0%')
    .attr('y2', '0%');

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', d3.interpolateRdBu(0));

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', d3.interpolateRdBu(1));

  colorBar.append('rect')
    .attr('width', colorBarWidth)
    .attr('height', colorBarHeight)
    .style('fill', 'url(#gradient)');

  colorBar.append('g')
    .attr('transform', `translate(${colorBarWidth}, 0)`)
    .call(colorBarAxis);
};

export default function HeatmapComponent({ theme }: HeatmapComponentProps) {
  const [matrix, setMatrix] = useState(generateRandomMatrix(10, 10));
  const [modelSphere, setModelSphere] = useState('Statevector');

  useEffect(() => {
    const container = document.getElementById('heatmap-container');
    if (container) {
      drawHeatmap(matrix, container, theme);
    }
  }, [matrix, theme]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMatrix(generateRandomMatrix(10, 10));
  };

  const handleModelSphereChange = (event: ChangeEvent<{ value: unknown }>) => {
    const newModelSphere = event.target.value as string;
    setModelSphere(newModelSphere);
    const [rows, cols] = newModelSphere === 'Sphere 1' ? [10, 10] : [15, 5];
    setMatrix(generateRandomMatrix(rows, cols));
  };

  return (
    <>
      <TitleContainer>
        <GridTitle theme={theme}>Heatmap</GridTitle>
        <CustomTooltip title="This visualization shows the probability of outputs across the computational basis states, for up to 8 qubits." theme={theme} arrow>
          <ThemedIconButton size="small" theme={theme}>
            <InfoOutlinedIcon />
          </ThemedIconButton>
        </CustomTooltip>
      </TitleContainer>

      <HeatmapContainer id="heatmap-container" />
      <ControlsContainer>
        <Slider
          defaultValue={1}
          step={1}
          marks
          min={1}
          max={10}
          onChange={handleSliderChange}
          style={{ width: '30%' }}
        />

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
      </ControlsContainer>
    </>
  );
}

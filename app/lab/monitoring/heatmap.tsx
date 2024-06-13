'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Slider, Select as MuiSelect, MenuItem, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import * as d3 from 'd3';

const HeatmapContainer = styled.div`
  width: 500px;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 280px;
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

const Select = styled(MuiSelect) <{ theme: string }>`
  width: 15%;
  // color: #fff;
  background-color:   ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#f4f4f4')};

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  }

  & .MuiSvgIcon-root {
  color:  ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};

  }

  & .MuiSelect-select {
  color:  ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};

  background-color:   ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#f4f4f4')};
  }
    .menu{
    
    background-color: #343a3f;
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
    background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
    color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    border-radius: 4px;
    padding: 10px;
    max-width: 220px;
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
  const margin = { top: 50, right: 80, bottom: 50, left: 50 }; // Increased right margin for color bar
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
  const [modelSphere, setModelSphere] = useState('Sphere 1');

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
        <CustomTooltip title="This visualization shows a heatmap of randomly generated values." theme={theme} arrow>
          <ThemedIconButton size="small" theme={theme}>
            <InfoIcon />
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
        <Select value={modelSphere} onChange={handleModelSphereChange} theme={theme}>
          <MenuItem value="Sphere 1" className='menu'>Sphere 1</MenuItem>
          <MenuItem value="Sphere 2">Sphere 2</MenuItem>
        </Select>
      </ControlsContainer>
    </>
  );
}

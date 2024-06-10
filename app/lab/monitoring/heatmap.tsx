'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Slider, Select as MuiSelect, MenuItem, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import * as d3 from 'd3';

const HeatmapContainer = styled.div`
  width: 100%;
  margin: auto;
  height: 350px;
  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 10px;
  padding:10px 20px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
`;

const GridTitle = styled.h3<{ theme: string }>`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-weight: 300;
  margin: 0;
`;

const Select = styled(MuiSelect)<{ theme: string }>`
  width: 23%;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const ThemedIconButton = styled(IconButton)<{ theme: string }>`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

function generateRandomMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random()));
}

interface HeatmapComponentProps {
  theme: string;
}

const drawHeatmap = (data: number[][], container: HTMLDivElement) => {
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
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
};

export default function HeatmapComponent({ theme }: HeatmapComponentProps) {
  const [matrix, setMatrix] = useState(generateRandomMatrix(10, 10));
  const [modelSphere, setModelSphere] = useState('Sphere 1');

  useEffect(() => {
    const container = document.getElementById('heatmap-container');
    if (container) {
      drawHeatmap(matrix, container);
    }
  }, [matrix]);

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
        <Tooltip title="This visualization shows a heatmap of randomly generated values.">
          <ThemedIconButton size="small" theme={theme}>
            <InfoIcon />
          </ThemedIconButton>
        </Tooltip>
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
          style={{ width: '52%' }}
        />
        <Select value={modelSphere} onChange={handleModelSphereChange} theme={theme}>
          <MenuItem value="Sphere 1">Sphere 1</MenuItem>
          <MenuItem value="Sphere 2">Sphere 2</MenuItem>
        </Select>
      </ControlsContainer>
    </>
  );
}

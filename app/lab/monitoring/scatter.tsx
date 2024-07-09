import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  CategoryScale,
} from 'chart.js';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  CategoryScale
);

import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const ScatterPlotContainer = styled.div`
  width: 90%;
  height: 310px;
  color: ${({ theme }) => (theme === 'dark' ? 'white' : 'black')};
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  // margin-bottom: 0px;
  margin: auto;
  color: white;
  font-size: 24px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  color: white;
  font-size: 16px;
  padding: 10px;
  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#2b3236' : '#e0e0e0')};
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;

  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 20px;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#e0e0e0')};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  &.dropdown-content {
    display: none;
  }
`;

const DropdownItem = styled.a`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#ddd')};
  }
`;

const ThemedIconButton = styled(IconButton)`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

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
    margin-right: 20px;
    max-width: 220px;
  }
  & .MuiTooltip-arrow {
    color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
  }
`;

const Scat = ({ theme, dataPoints }) => {
  const [selected, setSelected] = useState('Probabilities');
  const textColor = theme === 'dark' ? 'white' : 'black';
  const lineColor = theme === 'dark' ? 'white' : 'black';

  const defaultDataPoints = [
    { x: 20000, y: 0.4 },
    { x: 25000, y: 0.5 },
    { x: 18000, y: 0.3 },
    { x: 22000, y: 0.6 },
    { x: 27000, y: 0.7 },
    { x: 30000, y: 0.8 },
    { x: 35000, y: 0.9 },
    { x: 40000, y: 1.0 },
  ];

  const points = dataPoints && dataPoints.length ? dataPoints : defaultDataPoints;

  const regressionLineData = points
    .sort((a, b) => a.x - b.x)
    .map(({ x }) => ({ x, y: (x - 15000) / 25000 }));

  const data = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: points,
        backgroundColor: '#1a4770',
      },
      {
        label: 'Regression Line',
        type: 'line',
        data: regressionLineData,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Income',
          color: textColor,
          font: {
            size: 14,
            weight: '500',
          },
        },
        min: 15000,
        max: 40000,
        grid: {
          display: true,
          color: '#444',
        },
        ticks: {
          color: textColor,
        },
        border: {
          color: lineColor,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Metro Health Index',
          color: textColor,
          font: {
            size: 14,
            weight: '500',
          },
        },
        min: 0,
        max: 1,
        grid: {
          display: true,
          color: '#444',
        },
        ticks: {
          color: textColor,
          stepSize: 0.2,
        },
        border: {
          color: lineColor,
        },
      },
    },
  };

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <Container theme={theme}>

      <ScatterPlotContainer theme={theme}>
        <Scatter data={data} options={options} />
      </ScatterPlotContainer>
    </Container>
  );
};

Scat.propTypes = {
  theme: PropTypes.string.isRequired,
  dataPoints: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ),
};

Scat.defaultProps = {
  dataPoints: [],
};

export default Scat;

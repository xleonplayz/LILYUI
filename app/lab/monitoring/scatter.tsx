import React from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ScatterPlotContainer = styled.div`
  width: 80%;
  margin: auto;
  height: 350px;
`;

const Scat = ({ theme, dataPoints }) => {
  const textColor = theme === 'dark' ? 'white' : 'black';
  const lineColor = theme === 'dark' ? 'white' : 'black';

  // Default data points if none provided
  const defaultDataPoints = [
    { x: 20000, y: 0.4 },
    { x: 25000, y: 0.5 },
    { x: 18000, y: 0.3 },
    { x: 22000, y: 0.6 },
    { x: 27000, y: 0.7 },
    { x: 30000, y: 0.8 },
    { x: 35000, y: 0.9 },
    { x: 40000, y: 1.0 },
    // Add more default data points as needed
  ];

  const points = dataPoints && dataPoints.length ? dataPoints : defaultDataPoints;

  // Calculate the regression line data
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
            weight: 'bold',
          },
        },
        min: 15000,
        max: 40000,
        grid: {
          display: false,
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
            weight: 'bold',
          },
        },
        min: 0,
        max: 1,
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          stepSize: 0.2,  // This ensures the values on the y-axis have a gap of 0.2
        },
        border: {
          color: lineColor,
        },
      },
    },
  };

  return (
    <ScatterPlotContainer>
      <Scatter data={data} options={options} />
    </ScatterPlotContainer>
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

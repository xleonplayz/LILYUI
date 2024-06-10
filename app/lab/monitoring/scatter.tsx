'use client';
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ScatterPlotContainer = styled.div`
  width: 90%;
  height: 350px;
  margin: 5% auto;
  align-item:center;
`;

interface ScatProps {
  theme: string;
}

const Scat: React.FC<ScatProps> = ({ theme }) => {
  const data = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: Array.from({ length: 200 }, () => ({
          x: Math.random() * 25000 + 15000,
          y: Math.random(),
        })),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Income',
        },
        min: 15000,
        max: 40000,
      },
      y: {
        title: {
          display: true,
          text: 'Metro Health Index',
        },
        min: 0,
        max: 1,
      },
    },
  };

  return (
    <ScatterPlotContainer>
      <Scatter data={data} options={options} />
    </ScatterPlotContainer>
  );
};

export default Scat;

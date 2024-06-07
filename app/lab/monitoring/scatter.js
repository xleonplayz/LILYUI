// components/ScatterPlot.js
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ScatterPlotContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Scat = () => {
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
        type: 'linear',
        position: 'bottom',
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

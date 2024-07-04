import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { IconButton, Tooltip as MuiTooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const HeaderText = styled.div`
  flex: 1;
`;

const CustomTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} classes={{ popper: className }} placement="bottom-end" arrow />
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

const ThemedIconButton = styled(IconButton) <{ theme: string }>`
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  text-align:right;
  position:relative;
  left:140px
`;

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  fill: boolean;
}

interface MetricData {
  labels: number[];
  datasets: Dataset[];
}

interface DummyData {
  accuracy: MetricData;
  precision: MetricData;
  recall: MetricData;
}

const dummyData: DummyData = {
  accuracy: {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      { label: 'AdaBoost', data: [65, 70, 75, 80, 85, 90, 92, 94, 95, 96], borderColor: 'blue', fill: false },
      { label: 'ANN', data: [68, 72, 76, 82, 87, 91, 94, 96, 97, 98], borderColor: 'orange', fill: false },
      { label: 'GBoost', data: [70, 74, 78, 84, 89, 93, 96, 97, 98, 99], borderColor: 'green', fill: false },
      { label: 'KNN', data: [66, 71, 76, 81, 86, 90, 93, 95, 96, 97], borderColor: 'purple', fill: false },
      { label: 'SVM', data: [67, 73, 77, 83, 88, 92, 95, 96, 97, 98], borderColor: 'red', fill: false },
    ],
  },
  precision: {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      { label: 'AdaBoost', data: [60, 65, 70, 75, 80, 85, 88, 90, 92, 93], borderColor: 'blue', fill: false },
      { label: 'ANN', data: [63, 68, 73, 78, 83, 88, 91, 93, 94, 95], borderColor: 'orange', fill: false },
      { label: 'GBoost', data: [65, 70, 75, 80, 85, 90, 93, 94, 95, 96], borderColor: 'green', fill: false },
      { label: 'KNN', data: [61, 66, 71, 76, 81, 85, 88, 90, 91, 92], borderColor: 'purple', fill: false },
      { label: 'SVM', data: [62, 67, 72, 77, 82, 87, 90, 91, 92, 93], borderColor: 'red', fill: false },
    ],
  },
  recall: {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      { label: 'AdaBoost', data: [58, 63, 68, 73, 78, 83, 86, 88, 90, 91], borderColor: 'blue', fill: false },
      { label: 'ANN', data: [61, 66, 71, 76, 81, 86, 89, 91, 92, 93], borderColor: 'orange', fill: false },
      { label: 'GBoost', data: [63, 68, 73, 78, 83, 88, 91, 92, 93, 94], borderColor: 'green', fill: false },
      { label: 'KNN', data: [59, 64, 69, 74, 79, 83, 86, 88, 89, 90], borderColor: 'purple', fill: false },
      { label: 'SVM', data: [60, 65, 70, 75, 80, 85, 88, 89, 90, 91], borderColor: 'red', fill: false },
    ],
  },
};

interface AccuracyPrecisionRecallProps {
  selectedMetric: keyof DummyData;
  theme: string;
}

const AccuracyPrecisionRecall: React.FC<AccuracyPrecisionRecallProps> = ({ selectedMetric, theme }) => {
  const textColor = theme === 'dark' ? 'white' : 'black';
  const borderColor = theme === 'dark' ? 'white' : 'black';
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Number of ICs',
          color: textColor,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: textColor,
        },
        border: {
          color: borderColor,
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Accuracy (%)',
          color: textColor,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: textColor,
        },
        border: {
          color: borderColor,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
          usePointStyle: true,
          boxWidth: 20,
        },
        position: 'right',
        align: 'end',
        fullSize: false,
        padding: 20, // Add padding around the legend
        boxHeight: 20, // Set the height of the legend box
        boxWidth: 20, // Set the width of the legend box
        margin: {
          top: 100, // Add margin at the top
        },
        border: {
          color: borderColor, // Set border color
          width: 1, // Set border width
          padding: 10, // Add padding around the legend border
        },
      },
    },
    elements: {
      point: {
        radius: 0, // remove point markers
      },
      line: {
        borderWidth: 2,
        borderColor: theme === 'dark' ? 'white' : 'black', // Line color based on theme
      },
    },
  };

  return (
    <div style={{ height: '260px', width: '65%', margin: "7.5% auto" }}>
      <HeaderContainer>
        <HeaderText>
          {selectedMetric} of Independent Components (ICs) using various classifiers
        </HeaderText>
        <CustomTooltip title="This visualization shows a  of randomly generated values." theme={theme} arrow>
          <ThemedIconButton size="small" theme={theme}>
            <InfoIcon />
          </ThemedIconButton>
        </CustomTooltip>
      </HeaderContainer>
      <Line data={dummyData[selectedMetric]} options={options} />
    </div>
  );
};

export default AccuracyPrecisionRecall;

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

const HeaderText = styled.div<{ theme: string }>`
  flex: 1;
  color: ${({ theme }) => (theme === 'dark' ? 'white' : '##000')};
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
  top:-48px;
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
}

const dummyData: DummyData = {
  accuracy: {
    labels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    datasets: [
      { label: 'AdaBoost', data: [75, 80, 82, 85, 85, 85, 88, 88, 89, 89], borderColor: 'blue', fill: false },
      { label: 'ANN', data: [75, 83, 88, 91, 93, 94, 95, 95, 95, 95], borderColor: 'orange', fill: false },
      { label: 'GBoost', data: [75, 80, 83, 85, 85, 85, 87, 88, 89, 89], borderColor: 'yellow', fill: false },
      { label: 'KNN', data: [75, 82, 87, 90, 91, 91, 92, 93, 94, 95], borderColor: 'purple', fill: false },
      { label: 'SVM', data: [65, 70, 75, 78, 80, 83, 85, 85, 85, 85], borderColor: 'green', fill: false },
    ],
  },
};

interface AccuracyPrecisionRecallProps {
  selectedMetric: keyof DummyData;
  theme: string;
}

const AccuracyPrecisionRecall: React.FC<AccuracyPrecisionRecallProps> = ({ selectedMetric, theme }) => {
  const textColor = theme === 'dark' ? 'white' : '##000';
  const borderColor = theme === 'dark' ? 'white' : 'black';
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          drawOnChartArea: false, // only want the grid lines for the outermost tick marks
          color: borderColor,
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
          display: true,
          color: borderColor,
          width: 1,
        },
      },
      y: {
        grid: {
          drawOnChartArea: false, // only want the grid lines for the outermost tick marks
          color: borderColor,
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
          callback: function(value) {
            return value + ' %';
          },
        },
        border: {
          display: true,
          color: borderColor,
          width: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'line',
          boxWidth: 40,
          generateLabels: (chart) => {
            const data = chart.data;
            return data.datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor,
              hidden: !chart.isDatasetVisible(i),
              lineCap: dataset.borderCapStyle,
              lineDash: dataset.borderDash,
              lineDashOffset: dataset.borderDashOffset,
              lineJoin: dataset.borderJoinStyle,
              strokeStyle: dataset.borderColor,
              pointStyle: 'line',
              datasetIndex: i,
              fontColor: textColor // Add this line
            }));
          },
        },
        position: 'right',
        align: 'end',
        fullSize: false,
        padding: 20,
        boxHeight: 2,
        boxWidth: 40,
        margin: {
          top: 100,
        },
        border: {
          color: borderColor,
          width: 1,
          padding: 10,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 2,
        borderColor: theme === 'dark' ? 'white' : 'black',
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    }
  };

  return (
    <div style={{ height: '270px', width: '80%', margin: "1.5% auto",  }}>
      <HeaderContainer>
        <HeaderText theme={theme}>
          Accuracy of Independent Components (ICs) using various classifiers
        </HeaderText>
      </HeaderContainer>
      <Line data={dummyData[selectedMetric]} options={options} />
    </div>
  );
};

export default AccuracyPrecisionRecall;

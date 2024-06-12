// components/ProbabilityChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip as MuiTooltip, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProbabilityChart: React.FC = () => {
  const data = {
    labels: ['0000', '0010', '0110', '0111', '1000', '1001', '1100', '1111'],
    datasets: [
      {
        label: 'Probability (%)',
        data: [20, 30, 25, 15, 10, 5, 25, 20], // Adjust these values as needed
        backgroundColor: 'skyblue',
        borderColor: 'skyblue',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
        ticks: {
          stepSize: 5,
          font: {
            size: 12, // Slightly larger font size for y-axis labels
          },
        },
        grid: {
          display: true,
          color: '#333',
          borderDash: [3, 3], // Dashed grid lines for y-axis
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          font: {
            size: 12, // Slightly larger font size for x-axis labels
          },
        },
        grid: {
          display: true, // Display grid lines for x-axis
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 30, // Increase bottom padding to make room for x-axis labels
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, // Set to true to see tooltips if needed
      },
    },
  };

  return (
    <div style={{ flex: 1, margin: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {/* <Typography variant="h6" component="div"> */}
          {/* Probabilities */}
        {/* </Typography> */}
        <FormControl variant="outlined" size="small" style={{ minWidth: 120 ,margin:'0px 10px'}} >
          <InputLabel id="select-label">Options</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            label="Options"
            defaultValue=""
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
        </FormControl>
        <MuiTooltip
        style={{margin:'0px 10px'}}
          title={
            <Box>
              <Typography variant="subtitle1">About visualization</Typography>
              <Typography variant="body2">
                This visualization shows the probability of outputs across the computational basis states, for up to 8 qubits. Learn more.
              </Typography>
            </Box>
          }
          placement="left"
        >
          <InfoOutlinedIcon />
        </MuiTooltip>
      </Box>
      <div style={{  height: '250px', width: '90%', margin: 'auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProbabilityChart;

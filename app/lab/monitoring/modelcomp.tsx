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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Tooltip as MuiTooltip, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProbabilityChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDarkTheme = theme === 'dark';
  const textColor = isDarkTheme ? 'white' : 'black';
  const borderColor = '#888'; // Light grey for axis lines

  const data = {
    labels: [
      '0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111',
      '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'
    ],
    datasets: [
      {
        label: 'Probability (%)',
        data: [20, 30, 25, 15, 10, 5, 25, 20, 10, 5, 15, 25, 30, 20, 10, 5], // Adjust these values as needed
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
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 12, // Slightly larger font size for y-axis labels
            color: textColor, // Set y-axis label color based on theme
          },
          z: 1, // Ensure ticks are above the grid lines
        },
        grid: {
          display: true,
          color: '#444', // Adjust grid line color for better contrast
          borderDash: [3, 3], // Dashed grid lines for y-axis
          drawBorder: false, // Ensure the border is not drawn for the y-axis
          drawTicks: false, // Ensure the ticks are not drawn on the grid lines
          tickLength: 0, // Set tick length to 0 to avoid overlapping with grid lines
        },
        border: {
          color: borderColor, // Set y-axis border color to light grey
        },
        title: {
          display: true,
          text: 'Probability (%)', // Add y-axis label
          color: textColor,
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          font: {
            size: 12, // Slightly larger font size for x-axis labels
            color: textColor, // Set x-axis label color based on theme
          },
          maxRotation: 45, // Tilt the x-axis labels
          minRotation: 45,
        },
        grid: {
          display: false, // Remove grid lines for x-axis
        },
        border: {
          color: borderColor, // Set x-axis border color to light grey
        },
        title: {
          display: true,
          text: 'Computational basis states', // Add x-axis label
          color: textColor,
          font: {
            size: 14,
          },
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
        backgroundColor: isDarkTheme ? '#333' : '#fff', // Tooltip background based on theme
        titleColor: textColor, // Tooltip title color based on theme
        bodyColor: textColor, // Tooltip body color based on theme
        borderColor: borderColor, // Tooltip border color
      },
    },
  };

  return (
    <div style={{ flex: 1, margin: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControl variant="outlined" size="small" style={{ minWidth: 120, margin: '0px 20px' }}>
          <InputLabel id="select-label" style={{ color: textColor }}>Probabilities</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            label="Probabilities"
            defaultValue=""
            style={{ color: textColor, backgroundColor: isDarkTheme ? '#333' : '#fff' }}
          >
            <MenuItem value="Probability">Probability</MenuItem>
            <MenuItem value="Statevector">Statevector</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" alignItems="center">
          <MuiTooltip
            style={{ marginRight: '20px' }}
            title={
              <Box>
                <Typography variant="subtitle1" style={{ color: textColor }}>About visualization</Typography>
                <Typography variant="body2" style={{ color: textColor }}>
                  This visualization shows the probability of outputs across the computational basis states, for up to 8 qubits. Learn more.
                </Typography>
              </Box>
            }
            placement="left"
          >
            <InfoOutlinedIcon style={{ color: textColor, marginRight: '20px' }} />
          </MuiTooltip>
          <MoreVertIcon style={{ color: textColor, marginRight: '20px' }} />
        </Box>
      </Box>
      <div style={{ height: '300px', width: '90%', margin: '3% auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProbabilityChart;

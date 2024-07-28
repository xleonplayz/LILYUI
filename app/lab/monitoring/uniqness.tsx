import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Box,
  Tooltip as MuiTooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const ResponsiveBox = styled(Box)`
  height: 35vh; /* 50% of the viewport height */
  min-height: 250px; /* Minimum height */
  max-height: 500px; /* Maximum height */
  width: 95%;

  margin:10px auto;
  align-item:center;
  justify-content:center;
`;

const Unique = ({ theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [quantumRegisters, setQuantumRegisters] = useState([{ name: 'q', qubits: 4 }]);
  const [classicalRegisters, setClassicalRegisters] = useState([{ name: 'c', bits: 4 }]);
  const [selected, setSelected] = useState('Statevector');

  const handleDropdownSelected = (e) => {
    setSelected(e.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddQuantumRegister = () => {
    setQuantumRegisters([...quantumRegisters, { name: '', qubits: 1 }]);
  };

  const handleAddClassicalRegister = () => {
    setClassicalRegisters([...classicalRegisters, { name: '', bits: 1 }]);
  };

  const handleRemoveQuantumRegister = (index) => {
    setQuantumRegisters(quantumRegisters.filter((_, i) => i !== index));
  };

  const handleRemoveClassicalRegister = (index) => {
    setClassicalRegisters(classicalRegisters.filter((_, i) => i !== index));
  };

  const isDarkTheme = theme === 'dark';
  const textColor = isDarkTheme ? 'white' : 'black';
  const borderColor = '#888';

  const data = {
    labels: [
      '0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111',
      '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'
    ],
    datasets: [
      {
        label: 'Probability (%)',
        data: [20, 30, 25, 15, 10, 5, 25, 20, 10, 5, 15, 25, 30, 20, 10, 5],
        backgroundColor: 'skyblue',
        borderColor: 'skyblue',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 12,
            color: textColor,
          },
          z: 1,
        },
        grid: {
          display: true,
          color: '#444',
          borderDash: [3, 3],
          drawBorder: false,
          drawTicks: false,
          tickLength: 0,
        },
        border: {
          color: borderColor,
        },
        title: {
          display: true,
          text: 'Probability (%)',
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
            size: 12,
            color: textColor,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
        border: {
          color: borderColor,
        },
        title: {
          display: true,
          text: 'Computational basis states',
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
        bottom: 30,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: isDarkTheme ? '#333' : '#fff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: borderColor,
      },
    },
  };

  return (
    <ResponsiveBox >
      <Bar data={data} options={options} />
    </ResponsiveBox>

  );
};

export default Unique;

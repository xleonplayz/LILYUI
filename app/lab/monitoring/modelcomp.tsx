'use client'

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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from 'styled-components';



const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme === 'dark' ? '#21272a' : '#f4f4f4',
    color: theme === 'dark' ? 'white' : 'black',
  },
  '& .MuiButton-root': {
    color: theme === 'dark' ? 'white' : 'black',
  },
  '& .MuiTextField-root': {
    '& .MuiInputBase-input': {
      color: theme === 'dark' ? 'white' : 'black',
      '-webkit-appearance': 'none', // Remove arrows in WebKit browsers
      '-moz-appearance': 'textfield', // Remove arrows in Firefox
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme === 'dark' ? 'white' : 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme === 'dark' ? 'white' : 'black',
      },
      '&:hover fieldset': {
        borderColor: theme === 'dark' ? 'white' : 'black',
      },
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme === 'dark' ? 'white' : 'black',
  },
}));


const ResponsiveBox = styled(Box)`
  height: 40vh; /* 50% of the viewport height */
  min-height: 250px; /* Minimum height */
  max-height: 500px; /* Maximum height */
  width: 95%;

  margin:10px auto;
  align-item:center;
  justify-content:center;
`;

const Plot = ({ theme, modalOpen, handleOpenModal, handleCloseModal }) => {
  const [quantumRegisters, setQuantumRegisters] = useState([{ name: 'q', qubits: 4 }]);
  const [classicalRegisters, setClassicalRegisters] = useState([{ name: 'c', bits: 4 }]);
  const [selected, setSelected] = useState('Statevector');

  const handleDropdownSelected = (e) => {
    setSelected(e.target.value);
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
    <Box sx={{ minHeight: '100%', color: textColor }}>
      {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <HeaderContainerAccu theme={theme}>
          <Button theme={theme}>
            <GrUndo className="undo" />
          </Button>
          <Button theme={theme}>
            <GrRedo className="redo" />
          </Button>
          <DividerAccu theme={theme} />
          <CustomSelect
            value={selected}
            onChange={handleDropdownSelected}
            displayEmpty
            theme={theme}
          >
            <CustomMenuItem value="Statevector" theme={theme} selected={selected === 'Statevector'}>
              Statevector
            </CustomMenuItem>
            <CustomMenuItem value="Probabilities" theme={theme} selected={selected === 'Probabilities'}>
              Probabilities
            </CustomMenuItem>
          </CustomSelect>
          <DividerAccu theme={theme} />
          <ToggleContainer>
            <ToggleLabel theme={theme}>Inspect</ToggleLabel>
            <ToggleSwitch>
              <input type="checkbox" />
              <span className="slider"></span>
            </ToggleSwitch>
          </ToggleContainer>
        </HeaderContainerAccu>
        <CustomTooltip title="This visualization shows a  of randomly generated values." theme={theme} arrow>
          <ThemedIconButton size="small" theme={theme}>
            <InfoOutlinedIcon style={{ marginRight: "20px" }} />
          </ThemedIconButton>
        </CustomTooltip>
        <IconButton onClick={handleOpenModal} style={{ color: textColor }}>
          <MoreVertIcon />
        </IconButton>
      </Box> */}
      <ResponsiveBox >
        <Bar data={data} options={options} />
      </ResponsiveBox>
      <StyledDialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth theme={theme}>
        <DialogTitle>Manage registers</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            A quantum register is a collection of qubits on which gates and other operations act. A classical register consists of bits that can be written to and read within the quantum circuit's coherence time.
          </Typography>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom style={{ margin: '15px 0px' }}>Quantum registers</Typography>
            {quantumRegisters.map((register, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={register.name}
                  onChange={(e) => {
                    const newRegisters = [...quantumRegisters];
                    newRegisters[index].name = e.target.value;
                    setQuantumRegisters(newRegisters);
                  }}
                  style={{ marginRight: 10 }}
                />
                <TextField
                  label="Number of qubits"
                  variant="outlined"
                  type="number"
                  value={register.qubits}
                  onChange={(e) => {
                    const newRegisters = [...quantumRegisters];
                    newRegisters[index].qubits = parseInt(e.target.value, 10);
                    setQuantumRegisters(newRegisters);
                  }}
                  style={{ marginRight: 10 }}
                />
                <IconButton onClick={() => handleRemoveQuantumRegister(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddQuantumRegister}>
              Add new
            </Button>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom style={{ margin: '15px 0px' }}>Classical registers</Typography>
            {classicalRegisters.map((register, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={register.name}
                  onChange={(e) => {
                    const newRegisters = [...classicalRegisters];
                    newRegisters[index].name = e.target.value;
                    setClassicalRegisters(newRegisters);
                  }}
                  style={{ marginRight: 10 }}
                />
                <TextField
                  label="Number of bits"
                  variant="outlined"
                  type="number"
                  value={register.bits}
                  onChange={(e) => {
                    const newRegisters = [...classicalRegisters];
                    newRegisters[index].bits = parseInt(e.target.value, 10);
                    setClassicalRegisters(newRegisters);
                  }}
                  style={{ marginRight: 10 }}
                />
                <IconButton onClick={() => handleRemoveClassicalRegister(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddClassicalRegister}>
              Add new
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} style={{ color: 'grey' }}>
            Cancel
          </Button>
          <Button onClick={handleCloseModal} variant="contained" style={{ backgroundColor: '#0071eb', color: 'white' }}>
            Ok
          </Button>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
};

export default Plot;

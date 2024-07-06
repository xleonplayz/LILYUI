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
  ChartOptions,
} from 'chart.js';
import { FaChevronDown } from 'react-icons/fa';
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

} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from 'styled-components';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#21272a',
    color: 'white',
  },
  '& .MuiButton-root': {
    color: 'white',
  },
  '& .MuiTextField-root': {
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
    },
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
}));

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

const Unique: React.FC<{ theme: string }> = ({ theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [quantumRegisters, setQuantumRegisters] = useState([{ name: 'q', qubits: 4 }]);
  const [classicalRegisters, setClassicalRegisters] = useState([{ name: 'c', bits: 4 }]);
  const [selected, setSelected] = useState('Probabilities');

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

  const handleRemoveQuantumRegister = (index: number) => {
    setQuantumRegisters(quantumRegisters.filter((_, i) => i !== index));
  };

  const handleRemoveClassicalRegister = (index: number) => {
    setClassicalRegisters(classicalRegisters.filter((_, i) => i !== index));
  };

  const handleSelect = (value) => {
    setSelected(value);
  };
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
        data: [20, 30, 25, 15, 10, 5, 25, 20, 10, 5, 15, 25, 30, 20, 10, 5],
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
          maxRotation: 45,  // Tilt the labels
          minRotation: 45,  // Minimum rotation angle for tilting
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
    <Box sx={{ padding: 2, minHeight: '100%', color: textColor }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <DropdownContainer theme={theme}>
          <Dropdown>
            <DropdownButton theme={theme}>
              {selected} <FaChevronDown />
            </DropdownButton>
            <DropdownContent theme={theme} className="dropdown-content">
              <DropdownItem theme={theme} onClick={() => handleSelect('Probabilities')}>Probabilities</DropdownItem>
              <DropdownItem theme={theme} onClick={() => handleSelect('Other Option')}>Other Option</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </DropdownContainer>
        <Box display="flex" alignItems="center">
        <MuiTooltip
            title={
              <Box p={2} sx={{ color: 'white', maxWidth: 300 }}>
                <Typography variant="subtitle1">About visualization</Typography>
                <Typography variant="body2">
                  This visualization shows the probability of outputs across the computational basis states, for up to 8 qubits. Learn more.
                </Typography>
              </Box>
            }
            placement="bottom"
            arrow
          >
            <IconButton style={{ color: textColor }}>
              <InfoOutlinedIcon />
            </IconButton>
          </MuiTooltip>
          <MuiTooltip title="More options" placement="left">
            <IconButton onClick={handleOpenModal} style={{ color: textColor }}>
              <MoreVertIcon />
            </IconButton>
          </MuiTooltip>
        </Box>
      </Box>
      <Box style={{ height: '260px', width: '100%' }}>
        <Bar data={data} options={options} />
      </Box>

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

export default Unique;

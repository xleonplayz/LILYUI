"use client";

import styled from 'styled-components';
import Header from '../../../components/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #282828;
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #282828;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  flex: 2;
  display: flex;
  border-bottom: 1px solid #444;
`;

const BottomSection = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #282828;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SectionTitle = styled.h1`
  color: #bbb;
  font-size: 18px;
  margin: 0;
  text-align: left;
  font-weight: bold;
`;

const SubTitle = styled.h2`
  color: #bbb;
  font-size: 16px;
  font-weight: normal;
  margin-top: 20px;
`;

const UploadSection = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const UploadLabel = styled.label`
  background-color: #444;
  color: #bbb;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #555;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const ValuesSection = styled.div`
  flex: 1;
  padding: 20px;
  border-left: 1px solid #444;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #444;
  color: #bbb;
  padding: 10px;
  text-align: left;
  border: 1px solid #555;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #333;
  }
`;

const TableCell = styled.td`
  color: #bbb;
  padding: 10px;
  border: 1px solid #555;
`;

const Input = styled.input`
  background-color: #333;
  color: #bbb;
  border: 1px solid #555;
  padding: 8px;
  border-radius: 5px;
  width: 80%;
`;

const CheckButton = styled.button`
  background-color: #444;
  color: #bbb;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    background-color: #555;
  }
`;

const StatusSection = styled.div`
  flex: 1;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StatusText = styled.span`
  color: #bbb;
  margin-left: 10px;
`;

const StatusIndicator = styled.div<{ status: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'loading':
        return 'yellow';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }};
`;

const InfoContainer = styled.div`
  flex: 2;
  margin-left: 20px;
`;

const InfoBlock = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 5px;
  color: #bbb;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;

const InputLabel = styled.label`
  color: #bbb;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  background-color: #333;
  color: #bbb;
  border: 1px solid #555;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TrainButton = styled.button`
  background-color: #444;
  color: #bbb;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    background-color: #555;
  }
  align-self: flex-end;
`;

export default function Parameter() {
  return (
    <Container>
      <Header activeOption="parameter" />
      <Main>
        <TopSection>
          <UploadSection>
            <SectionTitle>Upload</SectionTitle>
            <SubTitle>Upload Training Data</SubTitle>
            <UploadLabel>
              Select File
              <UploadInput type="file" />
            </UploadLabel>
            <SubTitle>Upload Model Configuration</SubTitle>
            <UploadLabel>
              Select File
              <UploadInput type="file" />
            </UploadLabel>
          </UploadSection>
          <ValuesSection>
            <SectionTitle>Values</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Parameter</TableHeader>
                  <TableHeader>Value</TableHeader>
                  <TableHeader>Status</TableHeader>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell>Parameter {i + 1}</TableCell>
                    <TableCell><Input type="text" /></TableCell>
                    <TableCell>✔️</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            <CheckButton>Check Values</CheckButton>
          </ValuesSection>
        </TopSection>
        <BottomSection>
          <StatusSection>
            <SectionTitle>Generated Model Configuration</SectionTitle>
            <StatusItem>
              <StatusIndicator status="completed" />
              <StatusText>Check Training Data</StatusText>
            </StatusItem>
            <StatusItem>
              <StatusIndicator status="loading" />
              <StatusText>Check Parameters</StatusText>
            </StatusItem>
            <StatusItem>
              <StatusIndicator status="failed" />
              <StatusText>Check Overall Configuration and Compatibility</StatusText>
            </StatusItem>
            <StatusItem>
              <StatusIndicator status="not_checked" />
              <StatusText>Completion and Revision</StatusText>
            </StatusItem>
          </StatusSection>
          <InfoContainer>
            <InfoBlock>
              Summary of all model configurations and confirmation.
            </InfoBlock>
            <InputContainer>
              <InputLabel>Job Name</InputLabel>
              <TextInput type="text" />
              <TrainButton>Train Model</TrainButton>
            </InputContainer>
          </InfoContainer>
        </BottomSection>
      </Main>
    </Container>
  );
}

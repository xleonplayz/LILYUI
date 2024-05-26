"use client";

import { useState } from 'react';
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
  display: flex;
`;

const Sidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #444;
`;

const TopSection = styled.div`
  flex: 1;
  padding: 20px;
  border-bottom: 1px solid #444;
`;

const BottomSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const Content = styled.div`
  flex: 3;
  padding: 20px;
`;

const SectionTitle = styled.h1`
  color: #bbb;
  font-size: 18px;
  margin: 0;
  text-align: left;
  font-weight: bold;
`;

const TableContainer = styled.div`
  height: 100%;
  overflow-y: auto;
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
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #333;
  }
  cursor: pointer;
`;

const TableCell = styled.td`
  color: #bbb;
  padding: 10px;
  border: 1px solid #555;
`;

export default function Results() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const jobs = Array.from({ length: 20 }, (_, i) => `Job ${i + 1}`);

  const handleJobClick = (job: string) => {
    setSelectedJob(job);
  };

  return (
    <Container>
      <Header activeOption="results" />
      <Main>
        <Sidebar>
          <TopSection>
            <SectionTitle>Completed Jobs</SectionTitle>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>ID</TableHeader>
                    <TableHeader>Name</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <TableRow key={index} onClick={() => handleJobClick(job)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{job}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </TopSection>
          <BottomSection>
            <SectionTitle>{selectedJob ? selectedJob : "Select a job"}</SectionTitle>
          </BottomSection>
        </Sidebar>
        <Content>
          <SectionTitle>{selectedJob ? selectedJob : "Select a job"}</SectionTitle>
        </Content>
      </Main>
    </Container>
  );
}

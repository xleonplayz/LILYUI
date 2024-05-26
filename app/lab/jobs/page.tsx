"use client";

import styled from 'styled-components';
import Header from '../../components/Header';

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
  display: flex;
  background-color: #282828;
`;

const LeftSection = styled.div`
  flex: 3;
  padding: 20px;
  background-color: #282828;
  border-right: 1px solid #444;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #282828;
`;

const SectionTitle = styled.h1`
  color: #bbb;
  font-size: 18px;
  margin: 0;
  text-align: left;
  font-weight: bold;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-y: auto;
  height: calc(100vh - 160px);
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #444 #282828;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #444;
  color: #bbb;
  padding: 10px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #333;
  }
`;

const TableCell = styled.td`
  color: #bbb;
  padding: 10px;
  border: 1px solid #444;
`;

export default function Jobs() {
  return (
    <Container>
      <Header activeOption="jobs" />
      <Main>
        <LeftSection>
          <SectionTitle>Jobs Overview</SectionTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Progress</TableHeader>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 20 }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>Job {i + 1}</TableCell>
                    <TableCell>Running</TableCell>
                    <TableCell>{`${Math.floor(Math.random() * 100)}%`}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </LeftSection>
        <RightSection>
          <SectionTitle>Details</SectionTitle>
          <p>Here you can add more details or other components related to the jobs.</p>
        </RightSection>
      </Main>
    </Container>
  );
}

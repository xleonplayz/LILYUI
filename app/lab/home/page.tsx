"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Häkchen und Kreuze

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #2b272a; /* Neue Hintergrundfarbe für Konsistenz */
  overflow-x: hidden;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: row; /* Zeilenweise Anordnung für linke und rechte Sektionen */
  height: calc(100vh - 60px); /* Header-Höhe berücksichtigen */
  padding: 20px;
  gap: 20px; /* Abstand zwischen den Sektionen */
  overflow-y: auto; /* Ermöglicht Scrollen */
  @media (max-height: 800px) {
    height: calc(100vh - 40px); /* Footer und Header berücksichtigen */
  }
`;

const LeftSection = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Abstand zwischen den Boxen */
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Abstand zwischen den Boxen */
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 20px; /* Abstand zwischen den Boxen */
`;

const BoxLeft = styled.div`
  flex: 3;
  background-color: #3a3a3a; /* Ein wenig heller als der Hintergrund */
  padding: 20px;
  border-radius: 5px; /* Optional: abgerundete Ecken */
  margin: 10px; /* Abstand zu den Rändern und anderen Boxen */
  height: 120px; /* Höhe leicht erhöht */
`;

const BoxRight = styled.div`
  flex: 7;
  background-color: #3a3a3a; /* Ein wenig heller als der Hintergrund */
  padding: 20px;
  border-radius: 5px; /* Optional: abgerundete Ecken */
  margin: 10px; /* Abstand zu den Rändern und anderen Boxen */
  height: 120px; /* Höhe leicht erhöht */
  position: relative;
`;

const LargeBox = styled.div`
  background-color: #3a3a3a; /* Ein wenig heller als der Hintergrund */
  padding: 20px;
  border-radius: 5px; /* Optional: abgerundete Ecken */
  margin: 10px; /* Abstand zu den Rändern */
  height: 350px; /* Weniger hohe Box */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Inhalt nach oben ausrichten */
  position: relative;
`;

const JobSectionTitle = styled.h4`
  position: absolute;
  top: 5px; /* Etwas höher */
  left: 20px; /* Mehr nach rechts */
  font-weight: 300;
  color: white;
`;

const ViewAll = styled.span`
  position: absolute;
  top: 30px; /* Etwas tiefer */
  right: 30px; /* Mehr nach links */
  color: #0f62fe;
  cursor: pointer;
`;

const JobInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 60px; /* Mehr Abstand zur Tabelle */
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin-right: 10px; /* Weniger Abstand zwischen den Job-Infos */
`;

const JobNumber = styled.span`
  font-size: 2rem; /* Kleinere Zahl */
  font-weight: 300; /* Dünnerer Text */
`;

const JobStatus = styled.span`
  font-size: 0.875rem; /* Kleinere Schrift */
  color: grey;
  margin-top: 5px; /* Weniger Abstand zwischen Zahl und Text */
`;

const HeaderBar = styled.div`
  width: 100%; /* Vollständige Breite */
  background-color: #4a4a4a; /* Leicht hellerer Grauton */
  padding: 5px 0; /* Weniger hohe Leiste und keinen Abstand zu den Rändern */
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  color: white; /* Weiße Schrift */
  font-weight: 300;
  font-size: 0.875rem; /* Kleinere Schrift */
`;

const HeaderItem = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    text-align: left;
    padding-left: 20px; /* Abstand zum linken Rand */
  }
  &:last-child {
    text-align: right;
    padding-right: 20px; /* Abstand zum rechten Rand */
  }
`;

const DataRow = styled.div`
  width: 100%;
  background-color: #3a3a3a;
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 10px 0;
  border-top: 1px solid #4a4a4a; /* Trennstrich */
  font-size: 0.875rem; /* Kleinere Schrift */
`;

const DataItem = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    text-align: left;
    padding-left: 20px; /* Abstand zum linken Rand */
  }
  &:last-child {
    text-align: right;
    padding-right: 20px; /* Abstand zum rechten Rand */
  }
`;

const SmallBoxContainer = styled.div`
  display: flex;
  gap: 20px; /* Abstand zwischen den Boxen */
`;

const SmallBox = styled.div`
  flex: 1;
  background-color: #3a3a3a; /* Ein wenig heller als der Hintergrund */
  padding: 20px;
  border-radius: 5px; /* Optional: abgerundete Ecken */
  margin: 10px; /* Abstand zu den Rändern */
  height: 270px; /* Höhe der kleinen Boxen leicht erhöht */
  color: white;
  position: relative;
`;

const HalfBox = styled.div`
  background-color: #3a3a3a; /* Ein wenig heller als der Hintergrund */
  border-radius: 5px; /* Optional: abgerundete Ecken */
  margin: 5px 0; /* Abstand zu den Rändern */
  height: calc(50% - 5px); /* Halbierte Höhe minus Abstand */
  padding: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #4a4a4a;
  margin: 10px 0;
`;

const FooterSpacing = styled.div`
  height: 50px; /* Abstand unter den kleinen Boxen vergrößert */
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 70px;
  background: linear-gradient(90deg, rgba(58,73,214,1) 0%, rgba(160,50,196,1) 100%);
  color: white;
  margin-top: 0px;
`;

const UserInfo = styled.div`
  position: absolute;
  top: 8%;
  left: 1.5%;
  font-size: 12px;
  font-weight: 300;
`;

const BannerText = styled.div`
  position: absolute;
  display: flex;
  top: 18%;
  left: 1.5%;
  flex-direction: column;
  font-size: 12px;
  align-items: flex-start;
`;

const BannerTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 300;
`;

const APIToken = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 300;
  margin-left: 75%; /* Schiebt das Element nach rechts */
  margin-top: 20px; /* Setzt den Bereich nach unten */
`;

const APILabel = styled.label`
  margin-bottom: 5px;
  font-size: 0.875rem;
  font-weight: 300;
`;

const APIInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const APIInput = styled.input`
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 0; /* Eckige Kanten */
  font-size: 0.875rem;
  width: 250px;
  max-width: 500px; /* Länger */
  background-color: rgba(255, 255, 255, 0.3); /* Viel transparenter */
  color: white;
  padding-right: 80px; /* Platz für die Symbole */
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  color: white;
  font-size: 1rem; /* Kleinere Symbole */
`;

const CopyButton = styled(Button)`
  right: 40px; /* Platz für das Aktualisierungssymbol */
`;

const RefreshButton = styled(Button)`
  right: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 300; /* Dünnerer Text für "Monthly usage" */
  font-size: 1.25rem; /* Kleinere Schrift */
`;

const InlineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px; /* Mehr Abstand zwischen "Open Plan" und "View Details" */
`;

const BlueText = styled.span`
  color: #0f62fe;
  font-size: 0.875rem;
  cursor: pointer;
`;

const VerticalDivider = styled.div`
  width: 1px;
  background-color: grey;
  margin: 0 10px;
  height: 20px;
`;

const SmallText = styled.p`
  margin: 0;
  color: grey;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #5a5a5a; /* Dunkleres Grau */
  border-radius: 5px;
  overflow: hidden;
  height: 10px; /* Dünnerer Balken */
  margin-top: 50px; /* Balken noch tiefer gesetzt */
`;

const ProgressBar = styled.div`
  width: 50%; /* Beispielhafter Fortschritt von 50% */
  background-color: #0f62fe;
  height: 100%;
`;

const UsageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 40px; /* Tiefer gesetzt */
  right: 20px;
  color: #a9a9a9; /* Etwas grauer */
`;

const UsageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 20px;
`;

const SmallBoxTitle = styled.h4`
  margin: 0;
  font-weight: 300;
  font-size: 1rem; /* Kleinere Schrift */
`;

const OpenAppLink = styled.span`
  position: absolute;
  top: 20px; /* Etwas höher */
  right: 20px;
  color: #0f62fe;
  font-size: 0.875rem;
  cursor: pointer;
`;

const SmallBoxSegment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Abstand zwischen Überschrift und Text */
  margin-top: 20px; /* Abstand zwischen Segmenten */
`;

const SegmentTitle = styled.h5`
  margin: 0;
  font-weight: 300;
  font-size: 0.875rem;
  color: grey;
`;

const SegmentText = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 0.875rem;
`;

const WhatsNewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Abstand zwischen den Abschnitten */
  margin-top: 20px;
  color: white;
`;

const WhatsNewTitle = styled.h3`
  margin: 0;
  font-weight: 300;
  font-size: 1.5rem;
`;

const BulletPoint = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Bullet = styled.span`
  color: #0f62fe;
  font-size: 1rem;
  margin-right: 10px;
  margin-top: 4px; /* Vertikale Ausrichtung */
`;

const BulletContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const BulletTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 300;
  color: white;
`;

const BulletDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 300;
  color: grey;
`;

const BulletMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  color: grey;
`;

const BulletLink = styled.span`
  color: #0f62fe;
  cursor: pointer;
`;

export default function HomePage() {
  const [apiToken, setApiToken] = useState('••••••••••••••••');
  const [copied, setCopied] = useState(false);

  const handleOptionClick = (option: string) => {
    // Option click handler
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);  // Rückkehr zum Kopiersymbol nach 2 Sekunden
  };

  const refreshToken = () => {
    // Hier die Logik zum Aktualisieren des Tokens einfügen
    const newToken = 'NewTokenValue';  // Beispielwert
    setApiToken(newToken);
  };

  return (
    <Container>
      <Header activeOption="home" onOptionClick={handleOptionClick} />
      <UserInfo>
        Name Surname
      </UserInfo>
      <Banner>
        <BannerText>
          <BannerTitle>LILY Quantum Machine Learning</BannerTitle>
        </BannerText>
        <APIToken>
          <APILabel>API Token</APILabel>
          <APIInputContainer>
            <APIInput type="text" value={apiToken} readOnly />
            <CopyButton onClick={copyToClipboard}>
              {copied ? <FaCheck /> : <FaCopy />}
            </CopyButton>
            <RefreshButton onClick={refreshToken}>
              <FaSync />
            </RefreshButton>
          </APIInputContainer>
        </APIToken>
      </Banner>
      <Main>
        <LeftSection>
          <BoxContainer>
            <BoxLeft>
              <ContentBox>
                <Title>Open Plan</Title>
                <InlineContainer>
                  <BlueText>View Details</BlueText>
                  <VerticalDivider />
                  <BlueText>Upgrade</BlueText>
                </InlineContainer>
                <SmallText>Up to 10 Minutes a Month.</SmallText>
              </ContentBox>
            </BoxLeft>
            <BoxRight>
              <ContentBox>
                <Title>Monthly usage</Title>
                <UsageContainer>
                  <UsageInfo>
                    <span>Used</span>
                    <span>10ms</span>
                  </UsageInfo>
                  <UsageInfo>
                    <span>Remaining</span>
                    <span>9m</span>
                  </UsageInfo>
                </UsageContainer>
                <ProgressBarContainer>
                  <ProgressBar />
                </ProgressBarContainer>
              </ContentBox>
            </BoxRight>
          </BoxContainer>
          <LargeBox>
            <JobSectionTitle>Recent Jobs</JobSectionTitle>
            <ViewAll>View All</ViewAll>
            <JobInfoContainer>
              <JobInfo>
                <JobNumber>0</JobNumber>
                <JobStatus>Pending</JobStatus>
              </JobInfo>
              <JobInfo>
                <JobNumber>9</JobNumber>
                <JobStatus>Completed Jobs</JobStatus>
              </JobInfo>
            </JobInfoContainer>
            <HeaderBar>
              <HeaderItem>Job Id</HeaderItem>
              <HeaderItem>Status</HeaderItem>
              <HeaderItem>Created</HeaderItem>
              <HeaderItem>Completed</HeaderItem>
              <HeaderItem>Compute Resource</HeaderItem>
            </HeaderBar>
            {[...Array(5)].map((_, index) => (
              <DataRow key={index}>
                <DataItem>Job {index + 1}</DataItem>
                <DataItem>
                  {index % 2 === 0 ? <FaCheckCircle /> : <FaTimesCircle />}
                </DataItem>
                <DataItem>2024-05-20</DataItem>
                <DataItem>2024-05-21</DataItem>
                <DataItem>{100 + index}</DataItem>
              </DataRow>
            ))}
          </LargeBox>
          <SmallBoxContainer>
            <SmallBox>
              <SmallBoxTitle>Documentation</SmallBoxTitle>
              <OpenAppLink>Open App</OpenAppLink>
              <Divider />
              <SmallBoxSegment>
                <SegmentTitle>Section 1</SegmentTitle>
                <SegmentText>Details for section 1</SegmentText>
              </SmallBoxSegment>
              <Divider />
              <SmallBoxSegment>
                <SegmentTitle>Section 2</SegmentTitle>
                <SegmentText>Details for section 2</SegmentText>
              </SmallBoxSegment>
              <Divider />
              <SmallBoxSegment>
                <SegmentTitle>Section 3</SegmentTitle>
                <SegmentText>Details for section 3</SegmentText>
              </SmallBoxSegment>
            </SmallBox>
            <SmallBox>
              <ContentBox>
                {/* Leere Box */}
              </ContentBox>
            </SmallBox>
            <SmallBox>
              <SmallBoxTitle>Lab</SmallBoxTitle>
              <OpenAppLink>Open App</OpenAppLink>
              <Divider />
              <SmallBoxSegment>
                <SegmentTitle>Section 1</SegmentTitle>
                <SegmentText>Details for section 1</SegmentText>
              </SmallBoxSegment>
              <Divider />
              <SmallBoxSegment>
                <SegmentTitle>Section 2</SegmentTitle>
                <SegmentText>Details for section 2</SegmentText>
              </SmallBoxSegment>
              <Divider />
              <SmallBoxSegment>
                <SegmentTitle>Section 3</SegmentTitle>
                <SegmentText>Details for section 3</SegmentText>
              </SmallBoxSegment>
            </SmallBox>
          </SmallBoxContainer>
          <FooterSpacing />
        </LeftSection>
        <RightSection>
          <WhatsNewContainer>
            <WhatsNewTitle>What's New</WhatsNewTitle>
            {[...Array(5)].map((_, index) => (
              <BulletPoint key={index}>
                <Bullet>•</Bullet>
                <BulletContent>
                  <BulletTitle>Feature {index + 1}</BulletTitle>
                  <BulletDescription>
                    This is a description of feature {index + 1}. It provides an overview of what has been added or updated.
                  </BulletDescription>
                  <BulletMeta>
                    <span>4 days ago</span>
                    <BulletLink>Read more</BulletLink>
                  </BulletMeta>
                </BulletContent>
              </BulletPoint>
            ))}
          </WhatsNewContainer>
        </RightSection>
      </Main>
      <Footer />
    </Container>
  );
}

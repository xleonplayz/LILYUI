"use client";

import styled from 'styled-components';
import Header from '../../../components/LabHeader';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Häkchen und Kreuze
import { useSelector } from 'react-redux';
import { setLightTheme, setDarkTheme } from '../../../redux/slices/themesSlice';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  // background-color: #121619; /* Neue Hintergrundfarbe für Konsistenz */
  overflow-x: hidden;
  background-color: ${({ theme }) => (theme === 'dark' ? '#121619' : '#f4f4f4')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
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
  flex: 2;
  // background-color: #21272a; 
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  // color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
  padding:12px  20px;
  border-radius: 5px; /* Optional: abgerundete Ecken */
  margin: 10px; /* Abstand zu den Rändern und anderen Boxen */
  height: 80px; /* Höhe leicht erhöht */
`;

const BoxRight = styled.div`
  flex: 8;
  background-color: #21272a; /* Ein wenig heller als der Hintergrund */
  
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  // color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
 padding:12px  20px;
  border-radius: 5px; /* Optional: abgerundete Ecken */
  margin: 10px; /* Abstand zu den Rändern und anderen Boxen */
  // height: auto; /* Höhe leicht erhöht */
  // position: relative;
    height: 80px; /* Höhe leicht erhöht */
`;

const LargeBox = styled.div`
  // background-color: #21272a; /* Ein wenig heller als der Hintergrund */
    
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#bbb')};
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
  font-size: .875rem;
  font-weight: 600;
  letter-spacing: .16px;
  // color:white
    
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const ViewAll = styled.span`
  position: absolute;
  top: 30px; /* Etwas tiefer */
  right: 30px; /* Mehr nach links */
  // color: #0f62fe;
  color: ${({ theme }) => (theme === 'dark' ? '#0f62fe' : '#000')};
  cursor: pointer;
`;

const JobInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap:100px;
  margin-top: 60px; /* Mehr Abstand zur Tabelle */
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // color: white;
  
  color: ${({ theme }) => (theme === 'dark' ? 'white' : '#000')};
  // margin-right: 10px; /* Weniger Abstand zwischen den Job-Infos */
`;

const JobNumber = styled.span`
  font-size: 2rem; /* Kleinere Zahl */
  font-weight: 300; /* Dünnerer Text */
  
  color: ${({ theme }) => (theme === 'dark' ? 'white' : '#000')};
`;

const JobStatus = styled.span`
  font-size: 0.775rem; /* Kleinere Schrift */
  // color: grey;
  
  color: ${({ theme }) => (theme === 'dark' ? 'grey' : '#000')};
  margin-top: 5px; /* Weniger Abstand zwischen Zahl und Text */
`;

const HeaderBar = styled.div`
  width: 100%; /* Vollständige Breite */
  
  background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#c6c6c6')};
  padding: 5px 0; /* Weniger hohe Leiste und keinen Abstand zu den Rändern */
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  
  color: ${({ theme }) => (theme === 'dark' ? '#FFF' : '#000')};
  font-weight: 300;
  font-size: 0.875rem; /* Kleinere Schrift */
`;

const HeaderItem = styled.div`
  flex: 1;
  text-align: left;
  font-weight:bold;
  &:first-child {
    text-align: left;
    padding-left: 20px; /* Abstand zum linken Rand */
  }
  &:last-child {
    text-align: left;
    padding-right: 20px; /* Abstand zum rechten Rand */
  }
`;

const DataRow = styled.div`
  width: 100%;
  // background-color: #21272a;

  display: flex;
  flex: 1;
  justify-content: space-between;
  color: ${({ theme }) => (theme === 'dark' ? '#FFF' : '#000')};
  
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  padding: 10px 0;
  border-top: 1px solid  ${({ theme }) => (theme === 'dark' ? '#4a4a4a' : '#fff')}; /* Trennstrich */
  font-size: 0.875rem; /* Kleinere Schrift */
 
`;

const DataItem = styled.div`
  flex: 1;
  text-align: left;
  
  color: ${({ theme }) => (theme === 'dark' ? '#FFF' : '#000')};
  &:first-child {
    text-align: left;
    padding-left: 20px; /* Abstand zum linken Rand */
  }
  &:last-child {
    text-align: left;
    
    padding-right: 20px; /* Abstand zum rechten Rand */
  }
`;

const SmallBoxContainer = styled.div`
  display: flex;
  gap: 20px; /* Abstand zwischen den Boxen */
`;

const SmallBox = styled.div`
  flex: 1;
  // background-color: #21272a; /* Ein wenig heller als der Hintergrund */
  background-color: ${({ theme }) => (theme === 'dark' ? '#21272a' : '#fff')};
  border-radius: 5px; /* Optional: abgerundete Ecken */
  // margin:10px; /* Abstand zu den Rändern */
  // height: 300px; /* Höhe der kleinen Boxen leicht erhöht */
  color: ${({ theme }) => (theme === 'dark' ? '#FFF' : '#000')};
  // padding:10px 0px ;
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
  background-color:  ${({ theme }) => (theme === 'dark' ? '#32383c' : '#e0e0e0')}; ;
  
`;

const FooterSpacing = styled.div`
  height: 50px; /* Abstand unter den kleinen Boxen vergrößert */
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 90px 70px 40px 70px;
  // padding-top:70px
  background: linear-gradient(25deg, #0f62fe 25%, #a56eff 80%, #ff7eb6 100%);
  background-attachment: fixed;
  color: white;
  margin-top: 0px;
`;

const UserInfo = styled.div`
  position: absolute;
  top: 9%;
  left: 1.7%;
  color:white;
  font-size: .875rem;
  letter-spacing: .16px;
  line-height: 1.28572;
`;

const BannerText = styled.div`
  position: absolute;
  display: flex;
  // top: 18%;
  left: 1.5%;
  flex-direction: column;
  font-size: 12px;
  align-items: flex-start;
`;

const BannerTitle = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 300;
`;

const APIToken = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 300;
  margin-left: 75%; /* Schiebt das Element nach rechts */

`;

const APILabel = styled.label`
  margin-bottom: 10px;
  font-size: 0.75rem;
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
  border: 1px solid transparent;
  border-radius: 0; /* Eckige Kanten */
  font-size: 0.875rem;
  width: 300px;
  max-width: 500px; /* Länger */
  background-color: rgba(255, 255, 255, 0.7); /* Viel transparenter */
  color: black;
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
  color: #161616;
  font-weight: normal ;
  font-size: 1rem; /* Kleinere Symbole */
`;

const CopyButton = styled(Button)`
  right: 40px; /* Platz für das Aktualisierungssymbol */
  font-weight: 300;
`;

const RefreshButton = styled(Button)`
  right: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  .content-inner{
  display:flex;
  justify-content:space-between;
  width:100%;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: .875rem;
  font-weight: 600;
  letter-spacing: .16px;
`;

const InlineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px; /* Mehr Abstand zwischen "Open Plan" und "View Details" */
`;

const BlueText = styled.span`
  color: #0f62fe;font-size: .775rem;
  font-weight: 600;
  letter-spacing: .16px;
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
  // color: rgba(255,255,255,0.7);
  color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};
  font-size: .775rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #5a5a5a; /* Dunkleres Grau */
  border-radius: 5px;
  overflow: hidden;
  height: 10px; /* Dünnerer Balken */
  margin-top:25px; /* Balken noch tiefer gesetzt */
`;

const ProgressBar = styled.div`
  width: 50%; /* Beispielhafter Fortschritt von 50% */
  background-color: #0f62fe;
  height: 100%;
`;

const UsageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  // position: absolute;
  // top: 20px; /* Tiefer gesetzt */
  // right: 20px;
  color: #a9a9a9; /* Etwas grauer */
  font-size:.875rem;
  .span-sec{

color: ${({ theme }) => (theme === 'dark' ? '#fff' : 'black')}; }
  }
`;

const UsageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 20px;
   .span{
color: ${({ theme }) => (theme === 'dark' ? '#fff' : '000')}; }

.text-span{
  color: ${({ theme }) => (theme === 'dark' ? '#a9a9a9' : '000')}; }
`;

const SmallBoxTitle = styled.h4`
  margin: 20px;
  font-size: .875rem;
  font-weight: 600;
  letter-spacing: .16px;
   color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};
  

`;

const OpenAppLink = styled.span`

  color: #6f9ae8;
  font-size: 0.875rem;
  cursor: pointer;
  
  
  padding:20px ;
`;

const SmallBoxSegment = styled.div`
  display: flex;
  flex-direction: column;

padding: 15px 20px;
  
  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#e0e0e0')};
  }
`;

const SegmentTitle = styled.h5`
  margin: 0;
  font-size: .75rem;
  letter-spacing: .32px;
  line-height: 1.33333;
  color: grey;
`;

const SegmentText = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: .875rem;
  
  line-height: 2.73333;
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
  // color: white;
  
color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
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


const InstaSystem = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
div{
  margin:1PX 0px;
  // padding:20px
}
  .uppersys{

  
background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#c6c6c6')};
  }
`;

const SysLower = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;



`;
const SysUpper = styled.div`
width:100%;
display:flex;
flex-direction:column;



`


const SysUpperIns = styled.div`
width:100%;
display:flex;
height:100%;
flex-direction:column;
// background-color:#343a3f;
border-radius:10px;
background-color: ${({ theme }) => (theme === 'dark' ? '#343a3f' : '#e0e0e0')};
  
border:1px solid none;

padding:0;
&:hover{
  // background-color:
  
background-color: ${({ theme }) => (theme === 'dark' ? 'rgb(138 ,63 ,252)' : 'rgba(138 ,63 ,252,0.6)')};
}


`

const BigBoxTitle = styled.h2`
  margin: 0px 20px;
  font-size: 3.575rem;
  font-weight: 300;
  letter-spacing: .16px;
  

`;

const AppLink = styled.span`

  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};;
  font-size: 0.875rem;
  cursor: pointer;
  
  padding:20px ;
  
`;


const Doc = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;



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

  const [activeTopNav, setActiveTopNav] = useState('home');
  const [activeSidebar, setActiveSidebar] = useState('lab');

  const handleTopNavClick = (option: string) => {
    setActiveTopNav(option);
  };

  const handleSidebarClick = (option: string) => {
    setActiveSidebar(option);
  };

  const theme = useSelector((state) => state.theme.theme);

  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);

  return (
    <Container theme={theme}>
      <Header
        activeTopNav={activeTopNav}
        activeSidebar={activeSidebar}
        onTopNavClick={handleTopNavClick}
        onSidebarClick={handleSidebarClick}
      />
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
            <BoxLeft theme={theme}>
              <ContentBox theme={theme}>
                <Title >Open Plan</Title>
                <InlineContainer>
                  <BlueText>View Details</BlueText>
                  <VerticalDivider />
                  <BlueText>Upgrade</BlueText>
                </InlineContainer>
                <SmallText theme={theme}>Up to 10 Minutes a Month.</SmallText>
              </ContentBox>
            </BoxLeft>
            <BoxRight theme={theme}>
              <ContentBox theme={theme}>
                <div  className='content-inner' style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                <Title theme={theme}>Monthly usage</Title>
                </div>
                <div>
                <UsageContainer theme={theme}>
                  <UsageInfo theme={theme} >
                    <span  className='text-span'>Used</span>
                    <span className='span-sec span'>10ms</span>
                  </UsageInfo>
                  <UsageInfo>
                    <span  className='text-span'>Remaining</span>
                    <span className='span-sec span'>9m</span>
                  </UsageInfo>
                </UsageContainer>
                </div>
                </div>
                <ProgressBarContainer>
                  <ProgressBar />
                </ProgressBarContainer>
              </ContentBox>
            </BoxRight>
          </BoxContainer>
          <LargeBox theme={theme}>
            <JobSectionTitle theme={theme}>Recent Jobs</JobSectionTitle>
            <ViewAll theme={theme}>View All</ViewAll>
            <JobInfoContainer>
              <JobInfo theme={theme}>
                <JobNumber theme={theme}>0</JobNumber>
                <JobStatus theme={theme}>Pending</JobStatus>
              </JobInfo>
              <JobInfo>
                <JobNumber theme={theme}>9</JobNumber>
                <JobStatus theme={theme}>Completed Jobs</JobStatus>
              </JobInfo>
            </JobInfoContainer>
            <HeaderBar theme={theme}>
              <HeaderItem>Job Id</HeaderItem>
              <HeaderItem>Status</HeaderItem>
              <HeaderItem>Created</HeaderItem>
              <HeaderItem>Completed</HeaderItem>
              <HeaderItem>Compute Resource</HeaderItem>
            </HeaderBar>
            {[...Array(5)].map((_, index) => (
              <DataRow key={index} theme={theme}>
                <DataItem theme={theme}>Job {index + 1}</DataItem>
                <DataItem theme={theme}>
                  {index % 2 === 0 ? <FaCheckCircle /> : <FaTimesCircle />}
                </DataItem>
                <DataItem theme={theme}>2024-05-20</DataItem>
                <DataItem theme={theme}>2024-05-21</DataItem>
                <DataItem theme={theme}>{100 + index}</DataItem>
              </DataRow>
            ))}
          </LargeBox>
          <SmallBoxContainer>
            <SmallBox style={{ background: "transparent" }} theme={theme}>


              <InstaSystem theme={theme}>

                <SysUpperIns theme={theme} className='uppersys'>
                  <SysLower >

                    <SmallBoxTitle theme={theme}>Instance</SmallBoxTitle>

                    <AppLink theme={theme}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </AppLink>
                  </SysLower>


                  <BigBoxTitle theme={theme}>4</BigBoxTitle>

                </SysUpperIns>


                <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}>

                  <div style={{ width: "51%" }}> <SysUpperIns theme={theme}>
                    <SysLower >

                      <SmallBoxTitle theme={theme}>All System</SmallBoxTitle>

                      <AppLink theme={theme}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      </AppLink>
                    </SysLower>


                    <BigBoxTitle theme={theme}>12</BigBoxTitle>

                  </SysUpperIns>
                  </div >
                  <div style={{ width: "48%" }}> <SysUpperIns theme={theme}>
                    <SysLower>

                      <SmallBoxTitle theme={theme}>All System</SmallBoxTitle>

                      <AppLink theme={theme}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      </AppLink>
                    </SysLower>


                    <BigBoxTitle theme={theme}>12</BigBoxTitle>

                  </SysUpperIns>
                  </div >
                </div>

              </InstaSystem>

            </SmallBox>




            <SmallBox theme={theme}>
            <Doc theme={theme} >
              <SmallBoxTitle theme={theme}>Documentation</SmallBoxTitle>
              <OpenAppLink>Open App</OpenAppLink>

              </Doc>
              <SmallBoxSegment theme={theme}>
                <SegmentTitle>Section 1</SegmentTitle>
                <SegmentText>Details for section 1</SegmentText>
              </SmallBoxSegment>
              <Divider  theme={theme}/>
              <SmallBoxSegment theme={theme}>
                <SegmentTitle>Section 2</SegmentTitle>
                <SegmentText>Details for section 2</SegmentText>
              </SmallBoxSegment >
              <Divider  theme={theme}/>
              <SmallBoxSegment theme={theme}>
                <SegmentTitle>Section 3</SegmentTitle>
                <SegmentText>Details for section 3</SegmentText>
              </SmallBoxSegment>
            </SmallBox>
            <SmallBox theme={theme}>
            <Doc theme={theme} >
              <SmallBoxTitle theme={theme}>Lab</SmallBoxTitle>
              <OpenAppLink>Open App</OpenAppLink>
              </Doc  >
              
              <SmallBoxSegment theme={theme}>
                <SegmentTitle>Section 1</SegmentTitle>
                <SegmentText>Details for section 1</SegmentText>
              </SmallBoxSegment>
              <Divider theme={theme} />
              <SmallBoxSegment theme={theme}>
                <SegmentTitle>Section 2</SegmentTitle>
                <SegmentText>Details for section 2</SegmentText>
              </SmallBoxSegment>
              <Divider  theme={theme}/>
              <SmallBoxSegment theme={theme}>
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
                  <BulletTitle theme={theme}>Feature {index + 1}</BulletTitle>
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

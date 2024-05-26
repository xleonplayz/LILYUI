"use client";

import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

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
  height: calc(100vh - 60px); /* Header-Höhe berücksichtigen */
  @media (max-height: 800px) {
    height: calc(100vh - 40px); /* Footer und Header berücksichtigen */
  }
`;

const LeftSection = styled.div`
  width: 66.67%;
  background-color: #2b272a; /* Farbe der linken Seite */
  border-right: 1px solid #444;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightSection = styled.div`
  width: 33.33%;
  background-color: #353a3e; /* Belassen wie es ist */
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 48%;
  transform: translate(-50%, -50%);
  text-align: left;
  color: #bbb;
`;

const SignInTitle = styled.h2`
  color: #bbb;
  font-size: 24px;
  margin-bottom: 25px; /* Abstand zum Button */
  margin-left: 5px; /* Links ausgerichtet an die linke Ecke des Buttons */
`;

const SignInButton = styled(Link)`
  background-color: #0f62fe; /* Blau aus dem Bild */
  color: white;
  border: none;
  padding: 20px 40px; /* Breiter und höher */
  font-size: 12px; /* Kleinere Schriftgröße */
  cursor: pointer;
  width: calc(100% - 20px); /* Breiter als die Überschrift */
  max-width: 500px; /* Maximalbreite */
  text-align: left; /* Text linksbündig */
  padding-left: 20px; /* Abstand zum linken Rand */
  display: inline-block;
  text-decoration: none; /* Entfernen der Unterstreichung */
`;

const AdditionalInfo = styled.div`
  margin-top: 80px; /* Erhöhter Abstand zum Button */
`;

const NewToLily = styled.p`
  margin-top: 5px; /* Verringerter Abstand zu CreateAccount */
  font-weight: bold;
  color: #bbb;
  font-size: 14px; /* Kleinere Schriftgröße */
`;

const CreateAccount = styled.a`
  color: #0f62fe;
  text-decoration: none;
  cursor: pointer;
  display: block;
  margin-top: 0px; /* Verringerter Abstand zu NewToLily */
  margin-bottom: 45px;
  font-size: 14px; /* Kleinere Schriftgröße */
`;

const TroubleSigningIn = styled.p`
  color: #999;
  font-size: 12px;
  line-height: 1.5;
`;

const HelpDesk = styled.a`
  color: #0f62fe;
  text-decoration: none;
  cursor: pointer;
`;

const FooterContainer = styled.footer`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #444;
  background-color: #2b272a; /* Neue Hintergrundfarbe */
  color: #bbb;
  font-size: 14px;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #444;
  width: 80%; /* Breiter */
  margin: 0 auto; /* Zentriert im linken Segment */
  position: absolute;
  top: 55%; /* Höhe der Linie etwas höher */
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.h1`
  font-size: 50pt; /* Noch größer */
  color: #bbb;
  font-weight: 300; /* Dünnere Schriftart */
  margin-bottom: 20px;
  position: absolute;
  top: 28%; /* Noch ein Stück höher */
  left: calc(8% + 20px); /* Weiter nach links */
  transform: translateY(-100%);
`;

const Description = styled.div`
  font-size: 10pt; /* Noch kleinere Schriftgröße */
  color: #bbb;
  font-weight: 300; /* Dünnere Schriftart */
  margin-top: 10px; /* Abstand nach unten vom Titel */
  margin-left: calc(8% + 5px); /* Gleicher Seitenabstand wie der Titel */
  line-height: 1.5;
  position: absolute;
  top: 38%; /* Zwischen Titel und Trennstrich */
`;

export default function HomePage() {
  const handleOptionClick = (option: string) => {
    // Option click handler
  };

  return (
    <Container>
      <Header activeOption="home" onOptionClick={handleOptionClick} />
      <Main>
        <LeftSection>
          <Title>LILY QML</Title>
          <Description>
            LILY is a model that classifies text and images using metric machine learning.<br/>
            It provides robust classification capabilities for various applications.
          </Description>
          <HorizontalLine />
          {/* Inhalte für den unteren Bereich */}
        </LeftSection>
        <RightSection>
          <SignInContainer>
            <SignInTitle>Sign in to LILY QML</SignInTitle>
            <SignInButton href="/login">Continue with Login</SignInButton>
            <AdditionalInfo>
              <NewToLily>New to LILY QML?</NewToLily>
              <CreateAccount href="#">Create a LILY QML Account</CreateAccount>
              <TroubleSigningIn>
                Having trouble signing in? Try signing in with a LILY QML Account. If you are still having issues, contact the <HelpDesk href="#">LILY QML Help Desk</HelpDesk>.
              </TroubleSigningIn>
            </AdditionalInfo>
          </SignInContainer>
        </RightSection>
      </Main>
      <Footer />
    </Container>
  );
}

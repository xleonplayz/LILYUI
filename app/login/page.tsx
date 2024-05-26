"use client";

import styled from 'styled-components';
import Image from 'next/image';
import pic from './pic.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #2b272a; /* Gleiche Hintergrundfarbe */
  overflow-x: hidden;
`;

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #444;
  background-color: #2b272a; /* Gleiche Hintergrundfarbe */
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #bbb;
  text-decoration: none;
`;

const NormalText = styled.span`
  font-weight: normal;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: flex-start; /* Positionierung des Inhalts von links nach rechts */
  align-items: flex-start;
  padding: 20px;
  position: relative;
`;

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px 20px; /* Etwas weniger hoch durch weniger Padding */
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #444;
  background-color: #2b272a; /* Gleiche Hintergrundfarbe */
  color: #bbb;
  font-size: 14px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  background-color: transparent; /* Unsichtbare Box */
  padding: 10px;
  position: relative;
`;

const PageTitle = styled.h1`
  font-size: 28px; /* Größere Schriftgröße */
  color: #bbb;
  font-weight: 300; /* Schmalere Schrift */
  margin-bottom: 20px; /* Größerer Abstand */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 140px); /* Header (60px) + Footer (80px) Höhe berücksichtigen */
`;

const InputBox = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #444;
  background-color: #2b272a;
  color: #bbb;
  font-size: 16px;
`;

const Button = styled.button`
  width: 106%;
  padding: 10px;
  margin: 20px 0; /* Größerer Abstand nach oben und unten */
  border: 1px solid #0f62fe;
  background-color: #0f62fe;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const TransparentButton = styled.button`
  width: 106%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #0f62fe;
  background-color: transparent;
  color: #0f62fe;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0f62fe;
    color: #fff;
  }
`;

const SmallText = styled.p`
  font-size: 12px;
  color: #bbb;
  margin: 10px 0;
  text-align: center;
`;

const LinkText = styled.a`
  color: #0f62fe;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ShortDivider = styled.hr`
  width: 106%;
  border: 0;
  border-top: 1px solid #444;
  margin: 20px 0; /* Größerer Abstand */
`;

const VerticalDivider = styled.div`
  width: 1px;
  background-color: #444;
  height: calc(100vh - 250px); /* Höhe von Header und Footer berücksichtigen */
  margin: 60px 0; /* Abstand von Header und Footer */
  margin-left: 50px; /* Abstand vom Login-Container */
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-height: calc(100vh - 160px); /* Header (60px) + Footer (80px) Höhe berücksichtigen */
  margin-left: 40px; /* Abstand vom InfoContainer */
`;

export default function LoginPage() {
  return (
    <Container>
      <HeaderContainer>
        <Title href="/">
          <NormalText>LILY </NormalText>
          <BoldText>QML</BoldText>
        </Title>
      </HeaderContainer>
      <Main>
        <LoginBox>
          <PageTitle>LOGIN to LILY</PageTitle>
          <ShortDivider />
          <FormContainer>
            <InputBox type="email" placeholder="Email" />
            <InputBox type="password" placeholder="Password" />
            <Button>Login</Button>
          </FormContainer>
          <ShortDivider />
          <SmallText>Don't have an account?</SmallText>
          <TransparentButton>Create Account</TransparentButton>
          <ShortDivider />
          <SmallText>
            Forgot Password? <LinkText href="#">Contact LILY Help Desk</LinkText>
          </SmallText>
        </LoginBox>
        <VerticalDivider />
        <ImageContainer>
          <Image src={pic} alt="Picture" layout="intrinsic" objectFit="contain" />
        </ImageContainer>
      </Main>
      <FooterContainer>
        © 2024 LILY QML
      </FooterContainer>
    </Container>
  );
}

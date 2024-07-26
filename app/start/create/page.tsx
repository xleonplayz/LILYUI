"use client";

import styled from 'styled-components';
import Image from 'next/image';
import pic from './pic.svg';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Footer from '@/components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  // background-color: #2b272a; /* Same background color */
  
  background-color:   ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f4f4f4')};
  overflow-x: hidden;
`;

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid  ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};;
  
  background-color:   ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f4f4f4')};
  // background-color: #2b272a; /* Same background color */
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
  justify-content: flex-start; /* Position content from left to right */
  align-items: flex-start;
  padding: 20px;
  position: relative;
`;

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px 20px; /* Slightly less height with less padding */
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #444;
  background-color: #2b272a; /* Same background color */
  color: #bbb;
  font-size: 14px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  // margin:auto;
  background-color: transparent;
  padding: 10px;
  position: relative;
  left:100px;
  // top:2
`;
const PageTitle = styled.h1`
  font-size: 28px; /* Larger font size */
 
  color:  ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};;
  font-weight: 300; /* Lighter font weight */
  margin-bottom: 20px; /* Larger margin */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 140px); /* Consider height of header (60px) + footer (80px) */
`;

const InputBox = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #444;
  background-color:  ${({ theme }) => (theme === 'dark' ? '#21272a' : '#f4f4f4')};;
  
  color:  ${({ theme }) => (theme === 'dark' ? '#bbb' : '#000')};;

  font-size: 16px;
`;

const Button = styled.button`
  width: 106%;
  padding: 10px;
  margin: 20px 0; /* Larger margin top and bottom */
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
  border-top: 1px solid  ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};;
  margin: 20px 0; /* Larger margin */
`;

const VerticalDivider = styled.div`
  width: 1px;
  background-color:  ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};;

  height: calc(100vh - 250px); /* Consider height of header and footer */
  margin: 60px 0; /* Margin from header and footer */
  margin-left: 170px;
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  margin-left: 100px;
  
`;

export default function LoginPage() {
  const router=useRouter()
  const theme = useSelector((state)=>state.theme.theme);
  const handleLogin=()=>{
    console.log('login')
    router.push('/login')
  }
  return (
    <Container theme={theme}>
      <HeaderContainer theme={theme}>
        <Title href="/">
          <NormalText>LILY </NormalText>
          <BoldText>QML</BoldText>
        </Title>
      </HeaderContainer>
      <Main>
        <LoginBox>
          <PageTitle theme={theme}>Sign in to LILY</PageTitle>
          <ShortDivider />
          <FormContainer>
            <InputBox type="text" placeholder="Name" theme={theme} />
            <InputBox type="email" placeholder="Email" theme={theme} />
            <InputBox type="password" placeholder="Password"  theme={theme}/>
            <InputBox type="text" placeholder="Key" theme={theme} />
            <Button onClick={()=>{router.push('/lab/home')}}>Sign In</Button>
          </FormContainer>
          <ShortDivider theme={theme} />
          <SmallText>Already signed?</SmallText>
          <TransparentButton onClick={handleLogin}>Login</TransparentButton>
          <ShortDivider />
          <SmallText>
            Forgot Password? <LinkText href="#">Contact LILY Help Desk</LinkText>
          </SmallText>
        </LoginBox>
        <VerticalDivider  theme={theme}/>
        <ImageContainer>
          <Image src={pic} alt="Picture" layout="intrinsic" objectFit="contain" />
        </ImageContainer>
      </Main>
      <Footer/>
      {/* <FooterContainer>
        © 2024 LILY QML
      </FooterContainer> */}
    </Container>
  );
}

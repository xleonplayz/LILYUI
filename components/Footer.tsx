import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: #2b272a; /* Neue Hintergrundfarbe */
  border-top: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  color: #bbb;
`;

export default function Footer() {
  return (
    <FooterContainer>
      © 2024 Your Company Name
    </FooterContainer>
  );
}

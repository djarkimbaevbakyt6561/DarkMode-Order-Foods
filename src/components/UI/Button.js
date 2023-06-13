import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Button = ({
  children,
  buttonState,
  colorState,
  plusState,
  borderState,
  marginLeft,
  square,
  onClick,
  circle,
}) => {
  const { lightMode } = useSelector((state) => state.darkMode)
  return (
    <>
      {circle && (
        <ButtonCircle
          onClick={onClick}
          state={buttonState}
          color={colorState}
          margin={marginLeft}
          border={borderState}
          lightMode={lightMode}
        >
          {plusState && <Span>+</Span>}
          {children}
        </ButtonCircle>
      )}
      {square && (
        <ButtonSquare lightMode={lightMode} onClick={onClick} margin={marginLeft}>
          {children}
        </ButtonSquare>
      )}
    </>
  );
};
export default Button;
const ButtonCircle = styled.button`
  background: ${(props) => (props.color ? 'white' : props.lightMode ? '#8A2B06' : '#75D4F9')};
  border-radius: 20px;
  width: ${(props) => (props.state ? '99px' : '110px')};
  height: ${(props) => (props.state ? '41px' : '44px')};
  border: ${(props) => (props.border ? props.lightMode ? '1px solid #8A2B06' : '1px solid #75D4F9' : 'none')};
  font-family: 'Poppins';
  font-style: normal;
  font-weight: ${(props) => (props.state ? '700' : '500')};
  font-size: ${(props) => (props.state ? '14px' : '16px')};
  letter-spacing: 0.03em;
  text-transform: capitalize; 
  color: ${(props) => (props.color ? props.lightMode ? '#8A2B06' : '#75D4F9' : props.lightMode ? 'white' : 'black')} ; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => props.margin};
  &:hover {
    background-color: ${(props) => (props.color ? props.lightMode ? '#8A2B06' : '#75D4F9' : props.lightMode ? '#7E2A0A' : '#81D5F5')};
    color: white;
  }
  &:active {
    background: ${props => props.lightMode ? "#993108" : "#66CEF7"};
    color: white;
  }
  &:disabled {
    background: ${(props) => (props.color ? '#white' : '#CAC6C4')};
    border: ${(props) => (props.border ? '1px solid #CAC6C4' : 'none')};
    color: ${(props) => (props.color ? '#CAC6C4' : 'white')};
  }
`;
const Span = styled.span`
  margin-right: 13px;
  margin-top: 3px;
  font-family: 'Poppins';
  font-size: 25px;
  font-weight: 400;
`;
const ButtonSquare = styled.button`
  background: white;
  border-radius: 6px;
  width: 48px;
  height: 36px;
  border : ${props => props.lightMode ? "1px solid #8a2b06" : "1px solid #75d4f9"} ;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  letter-spacing: 0.03em;
  text-transform: capitalize;
  color: ${props => props.lightMode ? "#8a2b06" : "#75d4f9"}  ;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => props.margin};
  &:hover {
    background-color: ${props => props.lightMode ? "#8a2b06" : "#75d4f9"} ;
    color: white;
  }
  &:active {
    background: ${props => props.lightMode ? "#993108" : "#66cef7"}  ;
    color: white;
  }
  &:disabled {
    background: white;
    border: 1px solid #cac6c4;
    color: #cac6c4;
  }
`;

import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const BoxContainer = styled.div`
  width: auto;
  height: auto;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  ${({ isspinning }) =>
    isspinning &&
    css`
      animation: ${spin} 0.5s linear infinite;
    `}
`;

const Box = ({ isSpinning, children }) => {
  return <BoxContainer isspinning={isSpinning}>{children}</BoxContainer>;
};

export default Box;

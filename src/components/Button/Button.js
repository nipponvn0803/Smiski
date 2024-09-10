import styled from "styled-components";

const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  color: #ffffff;
  background-color: #ff7f50;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 127, 80, 0.4);
  transition:
    background-color 0.3s,
    transform 0.3s;

  &:hover {
    background-color: #ff6347;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Button = ({ onClick, children, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;

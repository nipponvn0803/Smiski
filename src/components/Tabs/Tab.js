import styled from "styled-components";

const Tab = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 18px;
  cursor: pointer;
  color: ${({ isactive }) => (isactive ? "#ffffff" : "#000dff")};
  background-color: ${({ isactive }) => (isactive ? "#000dff" : "#ffffff")};
  border: 2px solid #000dff;
  border-radius: 25px;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${({ isactive }) => (isactive ? "#000dff" : "#6b73ff")};
    color: #ffffff;
  }
`;

export default Tab;

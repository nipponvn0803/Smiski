import styled from "styled-components";

const TabsContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
`;

const Tabs = ({ children }) => {
  return <TabsContainer>{children}</TabsContainer>;
};

export default Tabs;

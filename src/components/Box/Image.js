import styled from "styled-components";
import { useEffect } from "react";

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledImage = styled.img`
  width: auto;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const FlavorText = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #555;
`;

const Image = ({ src, alt, isExpanded, onClick }) => {
  useEffect(() => {
    console.log(isExpanded);
  }, [isExpanded]);
  return (
    <ImageContainer>
      <StyledImage
        src={src}
        alt={alt}
        isExpanded={isExpanded}
        onClick={onClick}
      />
    </ImageContainer>
  );
};

export default Image;

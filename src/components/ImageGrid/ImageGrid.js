import styled from "styled-components";
import Image from "../Box/Image";
import { useState } from "react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  gap: 20px;
  padding: 20px;
  width: 850px;
`;

const ImageGrid = ({ images }) => {
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const toggleExpandImage = (index) => {
    setExpandedImageIndex(expandedImageIndex === index ? null : index);
  };

  return (
    <Grid>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          onClick={() => toggleExpandImage(index)}
          isExpanded={expandedImageIndex === index}
          alt={`Opened image ${index + 1}`}
        />
      ))}
    </Grid>
  );
};

export default ImageGrid;

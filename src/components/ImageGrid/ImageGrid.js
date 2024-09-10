import styled from "styled-components";
import Image from "../Box/Image";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  gap: 20px;
  padding: 20px;
  width: 850px;
`;

const ImageGrid = ({ images }) => {
  return (
    <Grid>
      {images.map((image, index) => (
        <Image key={index} src={image} alt={`Opened image ${index + 1}`} />
      ))}
    </Grid>
  );
};

export default ImageGrid;

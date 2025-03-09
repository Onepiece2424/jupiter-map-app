import { Button } from "@mui/material"
import styled from "styled-components"

const PlaceContent = ({ position }: { position: { id: number, place_name: string } }) => {
  const handleClick = () => {
    window.location.href = `/favorite_places/${position.id}`;
  };

  return (
    <MainWrapper>
      <p>{position.place_name}</p>
      <Button onClick={handleClick} variant="outlined">詳細を見る</Button>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  p {
    margin: 5px 0;
    font-weight: bold;
    font-size: 17px;
  }
`

export default PlaceContent

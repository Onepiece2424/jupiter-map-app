import { Button } from "@mui/material"
import styled from "styled-components"

const PlaceContent = ({ position }: { position: { place_name: string } }) => {
  return (
    <MainWrapper>
      <p>{position.place_name}</p>
      <Button variant="outlined">詳細を見る</Button>
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

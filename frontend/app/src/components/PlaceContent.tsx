import { Button } from "@mui/material"
import styled from "styled-components"

const PlaceContent = ({ placeName }: { placeName: string }) => {
  return (
    <MainWrapper>
      <p>{placeName}</p>
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

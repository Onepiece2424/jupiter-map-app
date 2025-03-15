import styled from "styled-components"
import { Typography } from "@mui/material"

const PlaceDescription = ({ placeName, postcode, description }) => {
  return (
    <ContentWrapper>
      <div className="title-and-description">
        <Typography className="title">場所名</Typography>
        <Typography className="description">{placeName}</Typography>
      </div>
      <div className="title-and-description">
        <Typography className="title">住所</Typography>
        <Typography className="description">{postcode}</Typography>
      </div>
      <div className="title-and-description">
        <Typography className="title">お気に入りポイント</Typography>
        <Typography className="description">{description}</Typography>
      </div>
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  margin: 30px;

  .title-and-description {
    margin: 15px 5%;
  }

  .title {
    text-align: left;
    font-weight: bold;
  }

  .description {
    text-align: left
  }

  button {
    margin: 15px 0;
  }
`

export default PlaceDescription

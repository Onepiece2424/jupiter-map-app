import styled from "styled-components"

const PlaceImg = ({ url }) => {
  return (
    <ContentWrapper>
      <img src={url} alt="place" width="40%" />
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  margin: 30px
`

export default PlaceImg

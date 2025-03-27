import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PlaceImg from './PlaceImg'
import PlaceDescription from './PlaceDescription'
import { fetchFavoritePlaceDetail } from '../../api/favoritePlace'
import { Button } from '@mui/material'
import NoImage from '../../assets/no_image.png'

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null)

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await fetchFavoritePlaceDetail(id);
        setPlace(data);
      } catch (error) {
        console.error("Failed to fetch place:", error);
      }
    };

    fetchPlace();
  }, [id]);

  if (place == null) {
    return <></>;
  }

  return (
    <Container>
      <Card>
        <PlaceImg url={place?.image_url ? place.image_url : NoImage} />
        <InfoWrapper>
          <PlaceDescription
            placeName={place?.place_name}
            postcode={place?.postcode}
            description={place?.description}
          />
          <StyledButton onClick={() => navigate(`/favorite_places/${id}/edit`)} variant="contained">
            編集
          </StyledButton>
        </InfoWrapper>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
`

const InfoWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 16px;
`

const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    background-color: #1976d2;
    color: white;
    &:hover {
      background-color: #1565c0;
    }
  }
`

export default PlaceDetail

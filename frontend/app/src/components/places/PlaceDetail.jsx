import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PlaceImg from './PlaceImg'
import PlaceDescription from './PlaceDescription'
import { fetchFavoritePlaceDetail } from '../../api/favoritePlace'
import { Button } from '@mui/material'

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
    <>
      <ContentWrapper>
        <PlaceImg url={place?.image_url} />
        <PlaceDescription
          placeName={place?.place_name}
          postcode={place?.postcode}
          description={place?.description}
        />
      </ContentWrapper>
      <Button onClick={() => navigate(`/favorite_places/${id}/edit`)} variant="contained">編集</Button>
    </>
  )
}

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`

export default PlaceDetail

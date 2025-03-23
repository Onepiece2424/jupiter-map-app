import { useState, useEffect, useCallback } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { favoritePlacesState } from '../atoms/marker';
import Maps from './Maps';
import Marker from './Marker';
import LocationSearchForm from './LocationSearchForm';
import { headers } from '../api/client';
import { GoogleMapsProps } from '../types/types';
import FavoriteMarkers from './FavoriteMarkers';
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from '../constants';

const GoogleMaps = () => {
  const [lat, setLat] = useState<number>(35.7140371);
  const [lng, setLng] = useState<number>(139.7925173);
  const [favoritePlaces, setFavoritePlaces] = useRecoilState(favoritePlacesState);
    const apiKey = GOOGLE_MAP_API_KEY as string;
  const position: GoogleMapsProps = { lat, lng };

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setLat(e.latLng.lat());
      setLng(e.latLng.lng());
    }
  };

  // お気に入りの場所を取得する関数をuseCallbackでメモ化
  const fetchFavoritePlaces = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}favorite_places`, { headers });
      setFavoritePlaces(response.data);
    } catch (error) {
      console.error('Error fetching favorite places:', error);
    }
  }, [setFavoritePlaces]);

  useEffect(() => {
    fetchFavoritePlaces(); // fetchFavoritePlaces関数を呼び出す
  }, [fetchFavoritePlaces]);

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <div className='main-container'>
        <LocationSearchForm setLat={setLat} setLng={setLng} />
        <Maps
          style={{ maxWidth: '800px', aspectRatio: '16 / 9', margin: '10px auto' }}
          center={position}
        >
          <Marker
            position={position}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
          {favoritePlaces.map((place, index) => (
            <FavoriteMarkers key={index} position={place} />
          ))}
        </Maps>
      </div>
    </Wrapper>
  );
}

export default GoogleMaps;

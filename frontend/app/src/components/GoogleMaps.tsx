import { useState, useEffect } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from './Maps';
import Marker from './Marker';
import LocationSearchForm from './LocationSearchForm';
import { GoogleMapsProps } from '../types/types';
import FavoriteMarkers from './FavoriteMarkers';
import axios from 'axios';

const GoogleMaps = () => {
  const [lat, setLat] = useState<number>(35.7140371);
  const [lng, setLng] = useState<number>(139.7925173);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY as string;

  const position: GoogleMapsProps = {
    lat: lat as number,
    lng: lng as number
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setLat(e.latLng.lat());
      setLng(e.latLng.lng());
    }
  };

  // お気に入り登録したマーカーの座標
  const [favoritePlaces, setFavoritePlaces] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/favorite_places', {
          headers: {
            'access-token': accessToken || '',
            'uid': uid || '',
            'client': client || '',
            'Content-Type': 'application/json',
          },
        });
        setFavoritePlaces(response.data);
      } catch (error) {
        console.error('Error fetching favorite places:', error);
      }
    };

    fetchData(); // fetchData関数を呼び出す
  }, []);

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

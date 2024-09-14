import { useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from './Maps';
import Marker from './Marker';
import LocationSearchForm from './LocationSearchForm';

type GoogleMapsProps = {
  lat: number;
  lng: number;
};

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
        </Maps>
      </div>
    </Wrapper>
  );
}

export default GoogleMaps;

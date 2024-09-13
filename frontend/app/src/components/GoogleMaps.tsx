import { useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Maps from './Maps';
import Marker from './Marker';

type GoogleMapsProps = {
  lat: number;
  lng: number;
};

// フォームデータの型定義
interface FormData {
  placeName: string;
  password: string;
}

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

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.get(`http://localhost:3000/search_location`, {
        params: { place_name: data.placeName }
      });

      const { lat, lng } = response.data;
      setLat(lat);
      setLng(lng);
    } catch (error) {
      alert(error);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="placeName">地名を入力</label>
          <input id="placeName" {...register('placeName')} />
          <button type="submit">検索</button>
        </form>
        <Maps
          style={{ maxWidth: '800px', aspectRatio: '16 / 9', margin: '10px auto' }}
          center={position}
        >
          <Marker
            position={position}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        </Maps>
      </div>
    </Wrapper>
  );
}

export default GoogleMaps;

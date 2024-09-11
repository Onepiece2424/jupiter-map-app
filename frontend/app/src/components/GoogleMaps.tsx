import { useState } from 'react'
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
  const [lat, setLat] = useState<number | null>(35.7140371);
  const [lng, setLng] = useState<number | null>(139.7925173);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY as string;
  const position: GoogleMapsProps = {
    lat: lat as number, // latがnullでないことを保証
    lng: lng as number  // lngがnullでないことを保証
  };

  const { register, handleSubmit } = useForm<FormData>();

  // onSubmitの型定義
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Rails APIに地名を送信
      const response = await axios.get(`http://localhost:3000/search_location`, {
        params: { place_name: data.placeName } // パラメータとして地名を渡す
      });

      const { lat, lng } = response.data; // 緯度と経度を取得
      setLat(lat); // 緯度を更新
      setLng(lng); // 経度を更新
    } catch (error) {
      alert(error);
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
        <Maps style={{ maxWidth: '800px', aspectRatio: '16 / 9', margin: '10px auto' }} center={position}>
          <Marker position={position}/>
        </Maps>
      </div>
    </Wrapper>
  )
}

export default GoogleMaps

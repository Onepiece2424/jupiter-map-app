import axios from "axios";
import { InfoWindowProps } from "../types/types";
import styled from "styled-components";

const InfoWindow = ({ position, address }: InfoWindowProps) => {
  const { lat, lng } = position;
  const { country = "不明", postcode = "不明", city = "不明" } = address || {};

  // お気に入り登録
  const handleClick = () => {
    createFavoritePlace(lat, lng, country, postcode, city);
  };

  const createFavoritePlace = async (lat: number, lng: number, country: string, postcode: string, city: string) => {
    // localStorageから認証情報を取得
    const accessToken = localStorage.getItem('access-token');
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
console.log(accessToken);

    try {
      const response = await axios.post(
        'http://localhost:3000/favorite_places',
        {
          lat: lat,
          lng: lng,
          country: country,
          postcode: postcode,
          city: city
        },
        {
          headers: {
            'access-token': accessToken || '',
            'uid': uid || '',
            'client': client || '',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data); // レスポンスデータを表示
    } catch (error) {
      console.error('Error creating favorite place:', error);
    }
  };

  return (
    <div>
      <p>緯度: {lat}</p>
      <p>経度: {lng}</p>
      <p>国: {country}</p>
      <p>郵便番号: {postcode}</p>
      <p>市区町村: {city}</p>
      <p>お気に入り登録しますか？</p>
      <div>
        <StyledButton onClick={handleClick}>はい</StyledButton>
        <StyledButton>いいえ</StyledButton>
      </div>
    </div>
  );
}

const StyledButton = styled.button`
  margin: 0 10px;
`

export default InfoWindow;

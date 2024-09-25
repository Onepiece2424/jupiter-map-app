import axios from "axios";
import { InfoWindowProps } from "../types/types";
import styled from "styled-components";

const InfoWindow = ({ position, address, onClose }: InfoWindowProps) => {
  const { lat, lng } = position;
  const { country = "不明", postcode = "不明", city = "不明" } = address || {};

  // お気に入り登録
  const handleClick = () => {
    createFavoritePlace(lat, lng, country, postcode, city);
  };

  const createFavoritePlace = async (lat: number, lng: number, country: string, postcode: string, city: string) => {

    // localStorageから認証情報を取得
    const getAuthHeaders = () => {
      const accessToken = localStorage.getItem('access-token') || '';
      const uid = localStorage.getItem('uid') || '';
      const client = localStorage.getItem('client') || '';

      return { 'access-token': accessToken, 'uid': uid, 'client': client, 'Content-Type': 'application/json' };
    };

    try {
      const headers = getAuthHeaders();
      const response = await axios.post(
        'http://localhost:3000/favorite_places',
        {
          lat: lat,
          lng: lng,
          country: country,
          postcode: postcode,
          city: city
        },
        { headers }
      );
      console.log(response.data); // レスポンスデータを表示
    } catch (error) {
      console.error('Error creating favorite place:', error);
    }
  };

  return (
    <div>
      <p>お気に入り登録しますか？</p>
      <div>
        <StyledButton onClick={handleClick}>はい</StyledButton>
        <StyledButton onClick={onClose}>いいえ</StyledButton>
      </div>
      <p>国: {country}</p>
      <p>郵便番号: {postcode}</p>
      <p>市区町村: {city}</p>
    </div>
  );
};

const StyledButton = styled.button`
  margin: 0 10px;
`;

export default InfoWindow;

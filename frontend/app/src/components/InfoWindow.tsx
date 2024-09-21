import { InfoWindowProps } from "../types/types";

const InfoWindow = ({ position, address }: InfoWindowProps) => {
  const { lat, lng } = position;
  const { country = "不明", postcode = "不明", city = "不明" } = address || {};

  // お気に入り登録
  const handleClick = () => {
    createFavoritePlace(lat, lng, country, postcode, city);
  };

  const createFavoritePlace = (lat: number, lng: number, country: string, postcode: string, city: string) => {
    console.log(lat, lng, country, postcode, city);
  }

  return (
    <div>
      <p>緯度: {lat}</p>
      <p>経度: {lng}</p>
      <p>国: {country}</p>
      <p>郵便番号: {postcode}</p>
      <p>市区町村: {city}</p>
      <p>お気に入り登録しますか？</p>
      <div>
        <button onClick={handleClick}>はい</button>
        <button>いいえ</button>
      </div>
    </div>
  );
}

export default InfoWindow;

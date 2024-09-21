import { InfoWindowProps } from "../types/types";

function InfoWindow({ position, address }: InfoWindowProps) {
  const { lat, lng } = position;
  const { country = "不明", postcode = "不明", city = "不明" } = address || {};

  return (
    <div>
      <p>緯度: {lat}</p>
      <p>経度: {lng}</p>
      <p>国: {country}</p>
      <p>郵便番号: {postcode}</p>
      <p>市区町村: {city}</p>
    </div>
  );
}

export default InfoWindow;

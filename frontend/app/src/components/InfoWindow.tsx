import React from "react";

interface Address {
  country: string;
  postcode: string;
  city: string;
}

interface InfoWindowProps {
  position: google.maps.LatLngLiteral;
  address: Address;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ position, address }) => {
  console.log(address);

  return (
    <div>
      <p>緯度: {position.lat}</p>
      <p>経度: {position.lng}</p>
      <p>国: {address?.country}</p>
      <p>郵便番号: {address?.postcode}</p>
      <p>市区町村: {address?.city}</p>
    </div>
  );
};

export default InfoWindow;

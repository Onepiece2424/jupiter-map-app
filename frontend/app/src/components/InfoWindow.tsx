import React from "react";

interface InfoWindowProps {
  position: google.maps.LatLngLiteral;
  address: string;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ position, address }) => {
  console.log(address);


  return (
    <div>
      <p>緯度: {position.lat}</p>
      <p>経度: {position.lng}</p>
    </div>
  );
};

export default InfoWindow;

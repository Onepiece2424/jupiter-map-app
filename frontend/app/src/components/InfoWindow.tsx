import React from "react";

interface InfoWindowProps {
  title: string;
  position: google.maps.LatLngLiteral;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ title, position }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>緯度: {position.lat}</p>
      <p>経度: {position.lng}</p>
    </div>
  );
};

export default InfoWindow;

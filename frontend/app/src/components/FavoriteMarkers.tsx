import { useEffect } from "react";

const FavoriteMarkers = (options: google.maps.MarkerOptions) => {
  useEffect(() => {
    new google.maps.Marker({
      ...options,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // 緑色のマーカー画像のURLを指定
        scaledSize: new google.maps.Size(40, 40), // マーカー画像のサイズを調整
      }
    });
  }, [options]);

  return null;
};

export default FavoriteMarkers;

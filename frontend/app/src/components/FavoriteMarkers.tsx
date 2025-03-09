import { useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import PlaceContent from "./PlaceContent";

type CustomMarkerOptions = google.maps.MarkerOptions & {
  position: {
    lat: number;
    lng: number;
    place_name: string;
  };
};

const FavoriteMarkers = (options: CustomMarkerOptions) => {
  useEffect(() => {
    if (!options.position || !options.map) return;

    // マーカーを作成
    const marker = new google.maps.Marker({
      ...options,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new google.maps.Size(40, 40),
      },
    });

    // 情報ウィンドウを作成
    const infoWindow = new google.maps.InfoWindow({
      content: ReactDOMServer.renderToString(
               <PlaceContent placeName={options.position.place_name} />),
    });

    // クリック時にウィンドウを開く
    marker.addListener("click", () => {
      infoWindow.open(options.map, marker);
    });

    return () => {
      marker.setMap(null);
    };
  }, [options]);

  return null;
};

export default FavoriteMarkers;

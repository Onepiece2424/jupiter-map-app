import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import PlaceContent from "./PlaceContent";

type CustomMarkerOptions = google.maps.MarkerOptions & {
  position: {
    id: number;
    lat: number;
    lng: number;
    place_name: string;
  };
};

const FavoriteMarkers = (options: CustomMarkerOptions) => {
  const infoWindowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!options.position || !options.map) return;

    const infoWindowDiv = document.createElement("div");
    infoWindowRef.current = infoWindowDiv;

    const root = createRoot(infoWindowDiv);
    root.render(<PlaceContent position={options.position} />);

    // 情報ウィンドウを作成
    const infoWindow = new google.maps.InfoWindow({
      headerContent: `${options.position.place_name}`,
      content: `<a href="/favorite_places/${options.position.id}">詳細はこちらへ</a>`
    });

    // マーカーを作成
    const marker = new google.maps.Marker({
      ...options,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new google.maps.Size(40, 40),
      },
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

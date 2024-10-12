import { createRoot } from "react-dom/client";
import InfoWindow from "../components/InfoWindow";
import { googleMapFetchAddress } from "../api/googlemap";

export const handleMarkerUpdate = async (
  newPosition: { lat: number; lng: number },
  marker: google.maps.Marker,
  infoWindow: google.maps.InfoWindow,
  map?: google.maps.Map
) => {
  // マーカーの位置を更新
  marker.setPosition(newPosition);

  // 住所を取得
  const fetchedAddress = await googleMapFetchAddress(newPosition.lat, newPosition.lng);

  // InfoWindowにレンダリング
  const infoWindowDiv = document.createElement("div");
  const root = createRoot(infoWindowDiv);

  root.render(
    <InfoWindow
      position={newPosition}
      address={fetchedAddress}
      onClose={() => infoWindow.close()}
    />
  );

  infoWindow.setContent(infoWindowDiv);
  infoWindow.open(map, marker);
};

export const addMarkerEventListeners = (
  marker: google.maps.Marker,
  infoWindow: google.maps.InfoWindow,
  map?: google.maps.Map
) => {
  // ドラッグ終了時のリスナー
  marker.addListener("dragend", (e: google.maps.MapMouseEvent) => {
    const newPosition = {
      lat: e.latLng?.lat() || 0,
      lng: e.latLng?.lng() || 0,
    };
    handleMarkerUpdate(newPosition, marker, infoWindow, map);
  });

  // マーカークリック時のリスナー
  marker.addListener("click", async () => {
    const currentPosition = {
      lat: marker.getPosition()?.lat() || 0,
      lng: marker.getPosition()?.lng() || 0,
    };
    await handleMarkerUpdate(currentPosition, marker, infoWindow, map);
  });

  // マップクリック時のリスナー
  map?.addListener("click", (e: google.maps.MapMouseEvent) => {
    const newPosition = {
      lat: e.latLng?.lat() || 0,
      lng: e.latLng?.lng() || 0,
    };
    handleMarkerUpdate(newPosition, marker, infoWindow, map);
  });
};

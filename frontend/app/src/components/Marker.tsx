import { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { GoogleMapsProps } from "../types/types";
import InfoWindow from "./InfoWindow";

const Marker = (options: google.maps.MarkerOptions & {
  map?: google.maps.Map,
  draggable?: boolean,
  onDragEnd?: (e: google.maps.MapMouseEvent) => void,
}) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>(new google.maps.InfoWindow());
  const [position, setPosition] = useState<GoogleMapsProps>(() => {
    const pos = options.position;

    if (!pos) {
      return { lat: 0, lng: 0 };  // デフォルト値
    }

    // google.maps.LatLng かどうかに関係なく lat と lng を取得
    const lat = pos instanceof google.maps.LatLng ? pos.lat() : pos.lat;
    const lng = pos instanceof google.maps.LatLng ? pos.lng() : pos.lng;

    return { lat, lng };
  });

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/reverse_geocode?lat=${lat}&lng=${lng}`);
      return response.data.address;
    } catch (error) {
      console.error("Error fetching location data:", error);
      return null;
    }
  };

  // 共通処理を関数として定義
  const handleMarkerUpdate = async (
    newPosition: { lat: number; lng: number },
    marker: google.maps.Marker
  ) => {

    // マーカーの位置を更新
    marker.setPosition(newPosition);

    // 住所を取得
    const fetchedAddress = await fetchAddress(newPosition.lat, newPosition.lng);

    // InfoWindowにレンダリング
    const infoWindowDiv = document.createElement("div");
    ReactDOM.render(
      <InfoWindow
        position={newPosition}
        address={fetchedAddress}
        onClose={handleClose}
      />,
      infoWindowDiv
    );
    infoWindow.setContent(infoWindowDiv);
    infoWindow.open(options.map, marker);
  };

  useEffect(() => {
    if (!marker && options.map) {
      const newMarker = new google.maps.Marker({
        ...options,
        draggable: options.draggable,
      });

      // ドラッグ終了時のリスナー
      newMarker.addListener("dragend", (e: google.maps.MapMouseEvent) => {
        const newPosition = {
          lat: e.latLng?.lat() || 0,
          lng: e.latLng?.lng() || 0,
        };
        handleMarkerUpdate(newPosition, newMarker);
      });

      // マーカークリック時のリスナー
      newMarker.addListener("click", async () => {
        // 現在のマーカー位置を取得
        const currentPosition = {
          lat: newMarker.getPosition()?.lat() || 0,
          lng: newMarker.getPosition()?.lng() || 0,
        };
        await handleMarkerUpdate(currentPosition, newMarker);
      });

      // マップクリック時のリスナー
      options.map.addListener("click", (e: google.maps.MapMouseEvent) => {
        const newPosition = {
          lat: e.latLng?.lat() || 0,
          lng: e.latLng?.lng() || 0,
        };
        handleMarkerUpdate(newPosition, newMarker);
      });

      setMarker(newMarker);
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, options]);

  useEffect(() => {
    if (marker && options.map) {
      marker.setMap(options.map);
      marker.setOptions(options);
    }
  }, [marker, options]);

  const handleClose = () => {
    infoWindow.close();
  };

  return null;
};

export default Marker;

import { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import InfoWindow from "./InfoWindow";
import { Address } from "../types/types";

const Marker = (options: google.maps.MarkerOptions & {
  map?: google.maps.Map,
  draggable?: boolean,
  onDragEnd?: (e: google.maps.MapMouseEvent) => void,
}) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>(new google.maps.InfoWindow());
  const [position, setPosition] = useState<{ lat: number; lng: number }>(() => {
    const pos = options.position;
    if (pos instanceof google.maps.LatLng) {
      return {
        lat: pos.lat(),
        lng: pos.lng(),
      };
    } else if (pos) {
      return {
        lat: pos.lat,
        lng: pos.lng,
      };
    }
    return { lat: 0, lng: 0 };
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

  const handleClose = () => {
    infoWindow.close();
  };

  useEffect(() => {
    if (!marker && options.map) {
      const newMarker = new google.maps.Marker({
        ...options,
        draggable: options.draggable,
      });

      // ドラッグ終了時のリスナー
      newMarker.addListener("dragend", async (e: google.maps.MapMouseEvent) => {
        const newPosition = {
          lat: e.latLng?.lat() || 0,
          lng: e.latLng?.lng() || 0,
        };
        setPosition(newPosition);

        // マーカーを新しい位置に設定
        newMarker.setPosition(newPosition);

        const fetchedAddress = await fetchAddress(newPosition.lat, newPosition.lng);
        setAddress(fetchedAddress);

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
        infoWindow.open(options.map, newMarker);
      });

      // マーカークリック時のリスナー
      newMarker.addListener("click", async () => {
        const fetchedAddress = await fetchAddress(position.lat, position.lng);
        setAddress(fetchedAddress);

        const infoWindowDiv = document.createElement("div");
        ReactDOM.render(
          <InfoWindow
            position={position}
            address={fetchedAddress}
            onClose={handleClose}
          />,
          infoWindowDiv
        );
        infoWindow.setContent(infoWindowDiv);
        infoWindow.open(options.map, newMarker);
      });

      // マップクリック時のリスナー
      options.map.addListener("click", async (e: google.maps.MapMouseEvent) => {
        const newPosition = {
          lat: e.latLng?.lat() || 0,
          lng: e.latLng?.lng() || 0,
        };
        setPosition(newPosition);

        // マーカーの位置を新しい位置に更新
        newMarker.setPosition(newPosition);

        const fetchedAddress = await fetchAddress(newPosition.lat, newPosition.lng);
        setAddress(fetchedAddress);

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
        infoWindow.open(options.map, newMarker);
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

  return null;
};

export default Marker;

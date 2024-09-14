import { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import InfoWindow from "./InfoWindow";

const Marker = (options: google.maps.MarkerOptions & {
  map?: google.maps.Map,
  draggable?: boolean,
  onDragEnd?: (e: google.maps.MapMouseEvent) => void,
}) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
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
      alert("住所データの取得に失敗しました")
    }
  };

  useEffect(() => {
    if (!marker && options.map) {
      const newMarker = new google.maps.Marker({
        ...options,
        draggable: options.draggable,
      });

      newMarker.addListener("dragend", async (e: google.maps.MapMouseEvent) => {
        const newPosition = {
          lat: e.latLng?.lat() || 0,
          lng: e.latLng?.lng() || 0,
        };
        setPosition(newPosition);

        const address = await fetchAddress(newPosition.lat, newPosition.lng);

        if (infoWindow) {
          const infoWindowDiv = document.createElement("div");
          ReactDOM.render(<InfoWindow position={newPosition} address={address} />, infoWindowDiv);
          infoWindow.setContent(infoWindowDiv);
          infoWindow.open(options.map, newMarker);
        }
      });

      newMarker.addListener("click", async () => {
        const address = await fetchAddress(position.lat, position.lng);

        if (infoWindow) {
          const infoWindowDiv = document.createElement("div");
          ReactDOM.render(<InfoWindow position={position} address={address} />, infoWindowDiv);
          infoWindow.setContent(infoWindowDiv);
          infoWindow.open(options.map, newMarker);
        } else {
          const infoWindowDiv = document.createElement("div");
          ReactDOM.render(<InfoWindow position={position} address={address} />, infoWindowDiv);
          const newInfoWindow = new google.maps.InfoWindow({
            content: infoWindowDiv,
          });
          newInfoWindow.open(options.map, newMarker);
          setInfoWindow(newInfoWindow);
        }
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

import { useState, useEffect } from "react";
import { addMarkerEventListeners } from "../hooks/marker";

const Marker = (options: google.maps.MarkerOptions & {
  map?: google.maps.Map,
  draggable?: boolean,
  onDragEnd?: (e: google.maps.MapMouseEvent) => void,
}) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow] = useState<google.maps.InfoWindow>(new google.maps.InfoWindow());

  useEffect(() => {
    if (!marker && options.map) {
      const newMarker = new google.maps.Marker({
        ...options,
        draggable: options.draggable,
      });

      // イベントリスナーを追加
      addMarkerEventListeners(newMarker, infoWindow, options.map);

      setMarker(newMarker);
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, options.map]);

  useEffect(() => {
    if (marker && options.map) {
      marker.setMap(options.map);
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default Marker;

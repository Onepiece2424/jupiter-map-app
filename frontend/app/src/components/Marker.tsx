import { useState, useEffect } from "react";

const Marker = (options: google.maps.MarkerOptions & { map?: google.maps.Map }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker && options.map) {
      const newMarker = new google.maps.Marker({
        ...options
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

import { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import InfoWindow from "./InfoWindow";

const Marker = (options: google.maps.MarkerOptions & { map?: google.maps.Map, draggable?: boolean, onDragEnd?: (e: google.maps.MapMouseEvent) => void }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker && options.map) {
      const newMarker = new google.maps.Marker({
        ...options,
        draggable: options.draggable,
      });

      if (options.onDragEnd) {
        newMarker.addListener("dragend", options.onDragEnd);
      }

      // 情報ウィンドウを作成 (JSXをHTML文字列に変換)
      const infoWindow = new google.maps.InfoWindow({
        content: ReactDOMServer.renderToString(<InfoWindow />),
      });

      // マーカーのクリックイベントで情報ウィンドウを表示
      newMarker.addListener("click", () => {
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

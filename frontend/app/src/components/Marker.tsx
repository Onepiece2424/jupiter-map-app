import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import InfoWindow from "./InfoWindow";

const Marker = (options: google.maps.MarkerOptions & {
  map?: google.maps.Map,
  draggable?: boolean,
  onDragEnd?: (e: google.maps.MapMouseEvent) => void,
  title?: string,  // 場所の名前などの情報
}) => {
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

      // マーカーの位置情報を取得
      const position = {
        lat: newMarker.getPosition()?.lat() || 0,
        lng: newMarker.getPosition()?.lng() || 0,
      };

      // 情報ウィンドウのDOMノードを作成
      const infoWindowDiv = document.createElement("div");

      // JSXをDOMノードに変換して情報ウィンドウに渡す
      ReactDOM.render(
        <InfoWindow title={options.title || "場所の情報"} position={position} />,
        infoWindowDiv
      );

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowDiv,
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

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
    // google.maps.LatLngオブジェクトの場合
    return {
      lat: pos.lat(),
      lng: pos.lng(),
    };
  } else if (pos) {
    // LatLngLiteralの場合
    return {
      lat: pos.lat,
      lng: pos.lng,
    };
  }
  // 位置情報がない場合はデフォルトの値
  return { lat: 0, lng: 0 };
});



  useEffect(() => {
    if (!marker && options.map) {
      const newMarker = new google.maps.Marker({
        ...options,
        draggable: options.draggable,
      });

      // ドラッグ終了時のイベントリスナーを設定
      newMarker.addListener("dragend", (e: google.maps.MapMouseEvent) => {
        const newPosition = {
          lat: e.latLng?.lat() || 0,
          lng: e.latLng?.lng() || 0,
        };

        // 位置情報を更新
        setPosition(newPosition);

        // Rails APIを呼び出して新しい場所名を取得し、情報ウィンドウを更新
        axios
          .get(`http://localhost:3000/reverse_geocode?lat=${newPosition.lat}&lng=${newPosition.lng}`)
          .then((response) => {
            console.log(response.data.address);

            // InfoWindowのDOMノードを更新
            if (infoWindow) {
              const infoWindowDiv = document.createElement("div");
              ReactDOM.render(<InfoWindow position={newPosition} />, infoWindowDiv);
              infoWindow.setContent(infoWindowDiv);

              // 新しい場所で情報ウィンドウを開く
              infoWindow.open(options.map, newMarker);
            }
          })
          .catch((error) => {
            alert(error.response.data.error)
            console.error("Error fetching location data:", error);
          });
      });

      // マーカーのクリックイベントで情報ウィンドウを表示
      newMarker.addListener("click", () => {
        if (infoWindow) {
          infoWindow.open(options.map, newMarker);
        } else {
          const infoWindowDiv = document.createElement("div");
          ReactDOM.render(<InfoWindow position={position} />, infoWindowDiv);
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

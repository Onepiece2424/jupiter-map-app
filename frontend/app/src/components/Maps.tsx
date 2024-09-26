import React, { useState, useRef, useEffect, ReactElement } from "react";
import { MapProps } from "../types/types";

const Maps = ({ children, className, style, onClick, ...options }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  // 地図の初期化
  useEffect(() => {
    if (ref.current && !map) {
      const mapInstance = new window.google.maps.Map(ref.current, {
        center: options.center,
        zoom: options.zoom || 12.5,
      });

      onClick && mapInstance.addListener("click", onClick); // クリックイベントをマップに追加
      setMap(mapInstance);
    }
  }, [ref, map, options.center, options.zoom, onClick]);

  // 地図の中心位置の更新
  useEffect(() => {
    map && options.center && map.setCenter(options.center);
  }, [map, options.center]);

  return (
    <div ref={ref} className={className} style={style}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement<any>, { map });
        }
        return child;
      })}
    </div>
  );
};

export default Maps;

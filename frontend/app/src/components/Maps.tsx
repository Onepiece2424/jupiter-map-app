import React, { useState, useRef, useEffect, ReactElement } from "react";

type MapProps = google.maps.MapOptions & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (e: google.maps.MapMouseEvent) => void; // クリックイベントを追加
};

const Maps = ({ children, className, style, onClick, ...options }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const mapInstance = new window.google.maps.Map(ref.current, {
        center: options.center,
        zoom: options.zoom || 16,
      });

      if (onClick) {
        mapInstance.addListener("click", onClick); // クリックイベントをマップに追加
      }

      setMap(mapInstance);
    }
  }, [ref, map, options.center, options.zoom, onClick]);

  useEffect(() => {
    if (map && options.center) {
      map.setCenter(options.center);
    }
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

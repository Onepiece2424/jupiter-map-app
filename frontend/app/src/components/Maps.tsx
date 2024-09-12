import React, { useState, useRef, useEffect, ReactElement } from "react";

type MapProps = google.maps.MapOptions & {
  className?: string; // className を追加
  style?: React.CSSProperties; // style を追加
  children?: React.ReactNode;
};

const Maps = ({ children, className, style, ...options }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const mapInstance = new window.google.maps.Map(ref.current, {
        center: options.center,
        zoom: options.zoom || 16,
      });
      setMap(mapInstance);
    }
  }, [ref, map, options.center, options.zoom]);

  useEffect(() => {
    if (map && options.center) {
      map.setCenter(options.center);
    }
  }, [map, options.center]);

  return (
    <div ref={ref} className={className} style={style}>
      {/* React.Children.mapの型を拡張して正しくプロパティを渡す */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // 子要素がReactElementであることを保証し、mapを追加
          return React.cloneElement(child as ReactElement<any>, { map });
        }
        return child;
      })}
    </div>
  );
};

export default Maps;

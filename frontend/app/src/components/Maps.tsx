import { useState, useRef, useEffect } from "react";

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
      const option = {
        center: options.center,
        zoom: 16
      };
      setMap(new window.google.maps.Map(ref.current, option));
    }
  }, [ref, map, options.center]);

  useEffect(() => {
    if (map && options.center) {
      map.setCenter(options.center);
    }
  }, [map, options.center]);

  return (
    <div ref={ref} className={className} style={style} />
  );
};

export default Maps;

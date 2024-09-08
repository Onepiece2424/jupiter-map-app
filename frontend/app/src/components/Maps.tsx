import { useState, useRef, useEffect } from "react";

type MapProps = google.maps.MapOptions & {
  style: { [key: string]: string };
  children?: React.ReactElement<google.maps.MarkerOptions>[] | React.ReactElement<google.maps.MarkerOptions>;
};

const Maps = ({ children, style, ...options }: MapProps) => {
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
  }, [ref, map, options.center]); // options.center を依存配列に追加

  useEffect(() => {
    if (map && options.center) {
      map.setCenter(options.center); // 地図の中心を更新
    }
  }, [map, options.center]); // center が変更されたときに地図の中心を更新

  return (
    <div ref={ref} style={style} />
  );
}

export default Maps;

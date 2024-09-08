import { useState, useRef, useEffect } from "react";

type MapProps = google.maps.MapOptions & {
  style: { [key: string]: string };
  children?: React.ReactElement<google.maps.MarkerOptions>[] | React.ReactElement<google.maps.MarkerOptions>;
}

const Maps: React.FC<MapProps> = ({ children, style, ...options }) => {
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
  }, [ref, map]);

  return (
    <div ref={ref} style={style} />
  );
}

export default Maps;

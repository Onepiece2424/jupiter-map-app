import React, { useState, useRef, useEffect } from "react";

type MapProps = google.maps.MapOptions & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

type ChildProps = {
  map?: google.maps.Map;
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
    <div ref={ref} className={className} style={style}>
      {map && React.Children.map(children, (child) => {
        if (React.isValidElement<ChildProps>(child)) {
          return React.cloneElement(child, { map });
        }
        return null;
      })}
    </div>
  );
};

export default Maps;

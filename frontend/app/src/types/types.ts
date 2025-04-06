// types.ts
export interface Address {
  country?: string;
  postcode?: string;
  city?: string;
}

export interface InfoWindowProps {
  position: google.maps.LatLngLiteral;
  address?: Address;
  onClose: () => void; // 引数を取らない関数
}

export type User = {
  id: any;
  firstname: string;
  lastname: string;
  signed_in: boolean;
};

export type FormData = {
  lastName: string;
  firstName: string;
  age: number;
  gender: string;
  email: string;
  password: string;
};

export type GoogleMapsProps = {
  lat: number;
  lng: number;
};

export type MapProps = google.maps.MapOptions & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (e: google.maps.MapMouseEvent) => void; // クリックイベントを追加
};

export type CustomMarkerOptions = google.maps.MarkerOptions & {
  position: {
    id: number;
    lat: number;
    lng: number;
    place_name: string;
  };
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type FriendType = {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
}

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
  id: number;
  firstname: string;
  lastname: string;
};

export type FormData = {
  email: string;
  password: string;
}

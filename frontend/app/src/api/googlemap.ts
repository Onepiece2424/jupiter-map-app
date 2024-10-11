import axios from "axios";
import { Address } from "../types/types";

export const googleMapFetchAddress = async (lat: number, lng: number): Promise<Address | undefined> => {
  try {
    const response = await axios.get(`http://localhost:3000/reverse_geocode?lat=${lat}&lng=${lng}`);
    return response.data.address as Address; // サーバーが Address オブジェクトを返すことを期待
  } catch (error) {
    console.error("Error fetching location data:", error);
    return undefined; // null の代わりに undefined を返す
  }
};

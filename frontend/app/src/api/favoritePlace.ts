import axios from "axios"
import { API_BASE_URL } from "../constants";
import { headers } from "./client"

export const fetchFavoritePlaceDetail = async(id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}favorite_places/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching place detail:", error);
    throw error;
  }
}

export const updateFavoritePlaceDetail = async (id: number, data: any) => {
  const formData = new FormData();
  formData.append("favorite_places[place_name]", data.placeName);
  formData.append("favorite_places[postcode]", data.address);
  formData.append("favorite_places[description]", data.description);

  if (data.image instanceof File) { // File の場合のみ追加
    formData.append("favorite_places[image]", data.image);
  }

  await axios.put(
    `${API_BASE_URL}favorite_places/${id}`,
    formData,
    {
      headers: {
        ...headers, // devise-token-auth の認証ヘッダーを追加
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

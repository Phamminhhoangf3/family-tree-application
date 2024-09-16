import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

export const uploadImage = async (fromData: FormData) => {
  try {
    const response = await http.post(ENDPOINTS.uploadImage, fromData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

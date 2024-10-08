import axios from "axios";
import { DetailFamilyType } from "@/types/family";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL + "/v1/",
  headers: {
    "Content-type": "application/json",
  },
});

export const getDetailFamily = async (params: DetailFamilyType) => {
  const response = await api.get(`family/view/${params?.id}`);
  return response.data;
};

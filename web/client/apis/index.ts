import axios from "axios";
import { FamilyDto } from "@/types/member";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL + "/v1/",
  headers: {
    "Content-type": "application/json",
  },
});

export const getDetailFamily = async (id: string): Promise<FamilyDto> => {
  const response = await api.get(`family/view/${id}`);
  return response.data;
};

const baseUrl = '/api/diaries';
import axios from "axios";
import { Diaries, NewDiary } from "../styles";

export const getAllDiaries = () => {
  return axios.get<Diaries[]>(baseUrl).then(response => response.data)
}

export const createDiary = async (object: NewDiary): Promise<Diaries | string> => {
  try{
     const response = await axios.post<Diaries>(baseUrl, object)
     return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'An error occurred';
    } else {
      console.error(error);
      return 'An error occured';
    }
  }
}
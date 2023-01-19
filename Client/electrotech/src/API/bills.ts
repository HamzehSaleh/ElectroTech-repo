import axios from "axios";
import { API } from "../constants/APIs";

export const getBills = async () => {
  const response = await axios.get(API.getBills);
  return response.data;
};

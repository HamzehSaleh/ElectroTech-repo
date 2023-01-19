import axios from "axios";
import { API } from "../constants/APIs";

export const getCategories = async () => {
  const response = await axios.get(API.getCategories);
  return response.data;
};

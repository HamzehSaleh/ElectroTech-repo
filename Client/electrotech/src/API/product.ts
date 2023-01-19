import axios from "axios";
import { API } from "../constants/APIs";

export const getProducts = async () => {
  const resoponse = await axios.get(API.getProducts);
  return resoponse.data;
};

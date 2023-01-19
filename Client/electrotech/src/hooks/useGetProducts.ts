import { useQuery } from "react-query";
import { getProducts } from "../API/product";

export const useProductsData = () => {
  return useQuery("Products", getProducts);
};

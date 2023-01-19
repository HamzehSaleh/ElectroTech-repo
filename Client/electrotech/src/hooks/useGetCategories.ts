import { useQuery } from "react-query";
import { getCategories } from "../API/categories";

export const useCategoriesData = () => {
  return useQuery("Categories", getCategories);
};

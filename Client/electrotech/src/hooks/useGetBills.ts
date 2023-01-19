import { useQuery } from "react-query";
import { getBills } from "../API/bills";

export const useGetBillsData = () => {
  return useQuery("Bills", getBills);
};

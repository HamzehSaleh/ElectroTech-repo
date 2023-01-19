import React from "react";
import { billsColumns } from "../../constants/columns";
import { useGetBillsData } from "../../hooks/useGetBills";
import { useTable, useGlobalFilter } from "react-table";
import Table from "../../components/Table";

const Bills = () => {
  const columns = billsColumns;
  const { data: bills } = useGetBillsData();

  console.log("from dddddd =>" + bills);

  console.log(bills);
  return <Table columns={columns} data={bills} />;
};

export default Bills;

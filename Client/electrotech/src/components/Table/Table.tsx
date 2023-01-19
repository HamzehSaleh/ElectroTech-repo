import React from "react";
import { useGlobalFilter, useTable } from "react-table";
import MaUTable from "@material-ui/core/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: any;
}

const Table = <T extends object>({ data, columns }: ReactTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter
  );

  console.log(data);

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

export default Table;

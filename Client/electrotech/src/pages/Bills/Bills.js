import React, { useState, useEffect } from "react";
import LayoutApp from "../../components/Layout";
import { Typography } from "@material-ui/core";
// import ProductForm from "./ProductForm";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
// import EditModal from "./EditModal";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Bills = () => {
  const dispatch = useDispatch();
  const [billData, setBillData] = useState([]);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    {
      id: "bill_id",
      label: "Bill ID",
      // minWidth: 170
    },
    {
      id: "customerName",
      label: "Customer Name",
      // minWidth: 170
    },
    {
      id: "customerPhone",
      label: "Customer Phone",
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
      //minWidth: 100,
    },
    {
      id: "totalAmount",
      label: "Total Amount ",
      // minWidth: 170,
      //align: "right",
    },
    {
      id: "_id",
      label: "Action",
      // minWidth: 170,
      //  align: "right",
    },
  ];

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const { data } = await axios.get("http://localhost:3030/bills");
      setBillData(data);

      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  // const handleDeleteProduct = async (item) => {
  //   await fetch("http://localhost:3030/products/" + item, {
  //     method: "DELETE",
  //   });
  //   getAllProducts();
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const saveProductDataHandler = () => {
    dispatch({
      type: "SHOW_LOADING",
    });
    getAllBills();
  };

  return (
    <LayoutApp>
      <Typography variant="h4" component="h1">
        All Bills
      </Typography>

      {/* <ProductForm onSaveProductData={saveProductDataHandler} /> */}

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {billData.map((row) => (
                <TableRow key={row._id} tabIndex={-1}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.customerPhone}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell>${row.totalAmount}</TableCell>
                  <TableCell>
                    <div className="table-actions">
                      <DeleteOutlineIcon className="cart-action" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={billData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </LayoutApp>
  );
};

export default Bills;

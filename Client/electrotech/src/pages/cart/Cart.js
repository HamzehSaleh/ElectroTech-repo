import React, { useEffect, useState } from "react";
import LayoutApp from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Typography } from "@material-ui/core";
import BillModal from "./BillModal";

const columns = [
  {
    id: "name",
    label: "Name",
    // minWidth: 170
  },
  {
    id: "image",
    label: "Image",
    //minWidth: 100,
  },
  {
    id: "price",
    label: "Price",
    // minWidth: 170,
    //align: "right",
  },
  {
    id: "quantity",
    label: "Quantity",
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Cart = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useDispatch();

  const handlerIncrement = (row) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...row, quantity: row.quantity + 1 },
    });
  };

  const handlerDecrement = (row) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...row, quantity: row.quantity - 1 },
    });
  };

  const handleDeleteFromCart = (item) => {
    dispatch({
      type: "DELETE_CART",
      payload: item,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((ele) => {
      temp += +ele.price * ele.quantity;
    });
    setSubTotal(+temp);
  }, [cartItems]);

  return (
    <LayoutApp>
      <Typography variant="h4" component="h1">
        Cart
      </Typography>
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
              {cartItems.map((row) => (
                <TableRow key={row._id} tabIndex={-1}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <img src={row.image} style={{ height: 60, width: 60 }} />
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <div className="quantity">
                      <RemoveIcon
                        className="decrement-quantity"
                        onClick={() => handlerDecrement(row)}
                      />
                      <span className="quantity-number">{row.quantity}</span>
                      <AddIcon
                        className="increment-quantity"
                        onClick={() => handlerIncrement(row)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <DeleteOutlineIcon
                      className="cart-action"
                      onClick={() => handleDeleteFromCart(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={cartItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="subTotal">
          <h3>
            Total Price: <span> ${subTotal.toFixed(2)}</span>
          </h3>
          <BillModal totalAmount={subTotal} cartItems={cartItems} />
        </div>
      </Paper>
    </LayoutApp>
  );
};

export default Cart;

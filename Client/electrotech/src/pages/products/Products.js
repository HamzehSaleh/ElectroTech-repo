import React, { useEffect, useState } from "react";
import LayoutApp from "../../components/Layout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { TextField, Typography } from "@material-ui/core";
import ProductForm from "./ProductForm";
import EditModal from "./EditModal";

const columns = [
  {
    id: "name",
    label: "Name",
    // minWidth: 170
  },
  {
    id: "code",
    label: "Parcode",
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

const Products = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [query, setQuery] = useState("");
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      const { data } = await axios.get("http://localhost:3030/products");
      setProductData(data);

      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDeleteProduct = async (item) => {
    await fetch("http://localhost:3030/products/" + item, {
      method: "DELETE",
    });
    getAllProducts();
  };

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
    getAllProducts();
  };

  const handleSearch = (event) => {
    let filltered = productData.filter((item) =>
      item.name.includes(event.target.value)
    );

    setProductData(filltered);
    if (event.target.value === "") {
      getAllProducts();
    }
  };

  return (
    <LayoutApp>
      <Typography variant="h4" component="h1">
        All Products
      </Typography>

      <ProductForm onSaveProductData={saveProductDataHandler} />

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
              {productData.map((row) => (
                <TableRow key={row._id} tabIndex={-1}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>
                    <img src={row.image} style={{ height: 60, width: 60 }} />
                  </TableCell>
                  <TableCell>${row.price}</TableCell>
                  <TableCell>
                    <div className="table-actions">
                      <EditModal
                        getItem={row._id}
                        onUpdateProductData={saveProductDataHandler}
                      />
                      <DeleteOutlineIcon
                        className="cart-action"
                        onClick={() => handleDeleteProduct(row._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <div className="search-div">
                <TextField placeholder="Search... " onChange={handleSearch} />
              </div>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </LayoutApp>
  );
};

export default Products;

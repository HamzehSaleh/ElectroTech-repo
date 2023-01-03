import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import axios from "axios";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "12px",
  },
  root: {
    margin: theme.spacing(1),
    width: 400,
  },
}));

const EditModal = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [productData, setProductData] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      image: "",
    },

    onSubmit: (values) => {
      let fileName = values.image.split("\\");
      const updated = {
        name: values.name,
        category: values.category,
        price: values.price,
        image: "/images/" + fileName[2],
      };
      UpdateDataHandler(updated);
      handleClose();
    },
  });

  const UpdateDataHandler = async (data) => {
    await axios.patch(
      "http://localhost:3030/products/update/" + props.getItem,
      data
    );

    props.onUpdateProductData();
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3030/products/" + props.getItem
      );

      setProductData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // console.log(props.getItem);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Edit Product Data</h2>
      {[productData].map((ele) => (
        <form onSubmit={formik.handleSubmit} key={ele._id}>
          <h4>
            <span>Product Parcode is:</span> <span>{ele._id}</span>
          </h4>

          <TextField
            label="Product Name"
            id="name"
            defaultValue={formik.values.name}
            onChange={formik.handleChange}
            variant="outlined"
            size="small"
            className={classes.root}
          />

          <TextField
            id="outlined-select-currency"
            select
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            variant="outlined"
            className={classes.root}
          >
            <MenuItem value="smart phones"> Smart Phone</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="home applicants">Home Applicants</MenuItem>
            {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
          </TextField>

          <TextField
            label="Product Price"
            id="price"
            defaultValue={formik.values.price}
            onChange={formik.handleChange}
            variant="outlined"
            size="small"
            className={classes.root}
          />

          <div className="new-product-image">
            <p>Please choose the product Image: </p>
            <input
              accept="image/*"
              type="file"
              id="image"
              multiple
              onChange={formik.handleChange}
            />
          </div>

          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit">Add</Button>
        </form>
      ))}
    </div>
  );
  return (
    <div>
      <EditOutlinedIcon onClick={handleOpen} className="edit-action" />

      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default EditModal;

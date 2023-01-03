import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./ProductForm.css";
import axios from "axios";

const ProductForm = (props) => {
  const [showFrom, setShowForm] = useState(false);

  let showFormHandler = () => {
    setShowForm((prevState) => {
      return !prevState;
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      image: "",
    },
    // validationSchema: Yup.object({
    //   firstName: Yup.string()
    //     .max(15, "Must be 15 or less")
    //     .required("Required"),
    // }),
    onSubmit: (values) => {
      let fileName = values.image.split("\\");
      const newProductData = {
        name: values.name,
        category: values.category,
        price: values.price,
        image: "/images/" + fileName[2],
      };

      addDataHandler(newProductData);
      setShowForm(false);
    },
  });

  const addDataHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3030/products", data);
      props.onSaveProductData();
    } catch (error) {}
  };

  let form = (
    <form onSubmit={formik.handleSubmit} className="new-product-form">
      <div className="new-product-controls">
        <TextField
          label="Product Name"
          id="name"
          defaultValue={formik.values.name}
          onChange={formik.handleChange}
          size="small"
        />

        <TextField
          label="Price"
          id="price"
          onChange={formik.handleChange}
          defaultValue={formik.values.price}
          size="small"
        />

        <FormControl>
          <InputLabel htmlFor="age-native-simple">Category</InputLabel>
          <Select
            native
            id="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option aria-label="None" value="" />
            <option value="smart phones">Smart Phone</option>
            <option value="laptops">Laptops</option>
            <option value="home applicants">Home Applicants</option>
          </Select>
        </FormControl>

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
      </div>

      <Button color="secondary" onClick={showFormHandler}>
        Cancel
      </Button>

      <Button type="submit">Add</Button>
    </form>
  );

  let hideForm = (
    <Button
      variant="outlined"
      color="primary"
      className="add-product-button"
      onClick={showFormHandler}
    >
      Add New Product
    </Button>
  );
  return showFrom === true ? form : hideForm;
};

export default ProductForm;

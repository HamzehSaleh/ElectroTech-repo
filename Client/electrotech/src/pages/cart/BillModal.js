import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const BillModal = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerPhone: "",
      paymentMethod: "",
      totalAmount: "",
      cartItems: [],
    },
    onSubmit: (values) => {
      values.paymentMethod = payment;
      values.totalAmount = props.totalAmount;
      values.cartItems = [...props.cartItems];

      const newBill = {
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        paymentMethod: values.paymentMethod,
        totalAmount: values.totalAmount,
        cartItems: values.cartItems,
      };

      addBillHandler(newBill);
      navigate("/bills");
    },
  });

  const addBillHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3030/bills", data);
    } catch (error) {}
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  let body = (
    <form
      style={modalStyle}
      className={classes.paper}
      onSubmit={formik.handleSubmit}
    >
      <h2>Get Your Bill</h2>
      <TextField
        label="Customer Name"
        id="customerName"
        variant="outlined"
        size="small"
        onChange={formik.handleChange}
        className={classes.root}
      />

      <TextField
        label="Customer Phone"
        id="customerPhone"
        variant="outlined"
        size="small"
        onChange={formik.handleChange}
        className={classes.root}
      />

      <TextField
        id="paymentMethod"
        select
        label="Payment Method"
        value={payment}
        onChange={handleChange}
        variant="outlined"
        className={classes.root}
      >
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="paypal">PayPal</MenuItem>
        <MenuItem value="card">Card</MenuItem>
      </TextField>

      <Button type="submit">Generate Bill</Button>
    </form>
  );
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        Generate Bill
      </Button>

      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default BillModal;

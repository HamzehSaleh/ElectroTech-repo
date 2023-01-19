import React, { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/products/Products"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Bills = lazy(() => import("../pages/Bills"));

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bills" element={<Bills />} />
      </Routes>
    </Router>
  );
};

export default Routers;

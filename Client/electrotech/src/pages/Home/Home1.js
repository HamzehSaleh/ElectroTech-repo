import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

const Home1 = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([
    "laptops",
    "smart phones",
    "home applicants",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("laptops");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });

        // const { cate } = await axios.get("http://localhost:3030/categories");
        // setCategories(cate);
        // console.log(cate);

        const { data } = await axios.get("http://localhost:3030/products");
        setProductData(data);

        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (e) {
        console.log(e);
      }
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <Layout>
      <div className="category">
        {categories.map((ele) => (
          <div className="product-categories">
            <Button
              className="product-category-item"
              variant="outlined"
              onClick={() => setSelectedCategory(ele)}
            >
              {ele}
            </Button>
          </div>
        ))}
      </div>
      <Grid container spacing={3}>
        {productData
          .filter((item) => item.category === selectedCategory)
          .map((ele) => (
            <Grid item key={ele._id} xs={12} sm={6} md={3}>
              <Product product={ele} />
            </Grid>
          ))}
      </Grid>
    </Layout>
  );
};

export default Home1;

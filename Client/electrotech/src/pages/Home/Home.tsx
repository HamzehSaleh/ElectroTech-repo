import { productType, categoryType } from "../../types";
import { useProductsData } from "../../hooks/useGetProducts";
import { useCategoriesData } from "../../hooks/useGetCategories";
import Layout from "../../components/Layout";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Product from "../../components/Product";

const Home = () => {
  const { data: products, isError: productsIsError } = useProductsData();
  const { data: categories, isError: categoriesIsError } = useCategoriesData();

  if (productsIsError || categoriesIsError) {
    return <h1>Data Not found</h1>;
  }

  return (
    <Layout>
      <div className="category">
        {categories?.map((item: categoryType) => (
          <div className="product-categories">
            <Button className="product-category-item" variant="outlined">
              {item.name}
            </Button>
          </div>
        ))}
      </div>

      <Grid container spacing={3}>
        {products?.map((item: productType) => (
          <Grid item key={item.id} xs={12} sm={6} md={3}>
            <Product product={item} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;

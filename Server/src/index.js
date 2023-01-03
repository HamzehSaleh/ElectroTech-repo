const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const ProductsRouter = require("./routers/products");
const CategoriesRouter = require("./routers/categories");
const BillsRouter = require("./routers/bills");

const app = express();
app.use(cors());

const port = process.env.PORT || 3030;

app.use(express.json());
app.use(ProductsRouter);
app.use(CategoriesRouter);
app.use(BillsRouter);

app.listen(port, () => {
  console.log("server is up on port " + port);
});

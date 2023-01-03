const express = require("express");
const Category = require("../models/categories");
const router = new express.Router();

router.post("/categories", async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(201).send({ category });
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    // console.log(categories);
    res.send(categories);
  } catch (e) {
    res.status(500).send;
  }
});

module.exports = router;

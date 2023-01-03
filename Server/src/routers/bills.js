const express = require("express");
const Bill = require("../models/bills");
const router = new express.Router();

router.post("/bills", async (req, res) => {
  const bill = new Bill(req.body);
  try {
    await bill.save();
    res.status(201).send({ bill });
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/bills", async (req, res) => {
  try {
    const bills = await Bill.find({});
    // console.log(categories);
    res.send(bills);
  } catch (e) {
    res.status(500).send;
  }
});

module.exports = router;

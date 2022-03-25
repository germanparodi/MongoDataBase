const { Product } = require("../models/model");
const { validationResult } = require("express-validator");
const axios = require("axios");
const bcrypt = require("bcryptjs");

const marks = (req, res) => {
  res.render("index", { title: "Express" });
};

const seeProducts = async (req, res) => {
  const sodas = await Product.find();
  res.json({ sodas });
};

const seeProduct = async (req, res) => {
  const soda = await Product.findById(req.params.id);
  res.json({ soda });
};

const createProduct = async (req, res) => {
  console.log(validationResult(req));
  console.log(req.body);

  const error = validationResult(req);
  if (error.isEmpty()) {
    const {} = req.body;
    const soda = new Product(req.body);
    await soda.save();
    res.json({ soda, msg: "Added new refreshing product" });
  } else {
    res.json(error.errors);
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const name = req.body;
  await Product.findByIdAndUpdate(id, name);
  res.json({ msg: "Update done, Good job !!!", name });
};

const deleteProduct = async (req, res) => {
  const soda = await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "It was a pleasure to meet you", soda });
};

const queryAxios = async (req, res) => {
  const result = await axios
    .get("https://swapi.dev/api/starships/3/", { timeout: 10000 })
    .catch((err) => {
      err.origin = "Error getting URL";
      throw err;
    });
  res.json(result.data);
};

const hash = (req, res) => {
  let password = "asdasd123";
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  let comp1 = bcrypt.compareSync("asdasd123", hash);
  let comp2 = bcrypt.compareSync("asdasd123456789", hash);
  res.json({
    pass: password,
    pass1: hash,
    comp: comp1,
    otherComp: comp2,
  });
};

module.exports = {
  marks,
  createProduct,
  seeProducts,
  seeProduct,
  editProduct,
  deleteProduct,
  queryAxios,
  hash,
};

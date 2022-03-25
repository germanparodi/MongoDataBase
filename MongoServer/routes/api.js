const express = require("express");
const router = express.Router();
const {
  createProduct,
  seeProducts,
  seeProduct,
  editProduct,
  deleteProduct,
  queryAxios,
  hash,
} = require("../controller/controller.js");
const { check, validationResult, body } = require("express-validator");

router.get("/see", seeProducts);
router.get("/see/:id", seeProduct);
router.post(
  "/create",
  [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("must have a soda name"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .withMessage("requires secret word"),
    check("email")
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .isEmail()
      .withMessage("the email is wrong"),
    check("phone")
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .withMessage("the phone number is required"),
  ],
  createProduct
);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

router.get("/queryAxios", queryAxios);

router.get("/hash", hash);

module.exports = router;

import upload from "../middleware/multer.js";
import {
  addProduct,
  listProduct,
  removeProduct,
} from "../controller/productController.js";
import express from "express";
import adminAuth from "../middleware/adminAuth.js";

const productRoute = express.Router();

productRoute.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRoute.get("/list", listProduct);
productRoute.post("/remove/:id", adminAuth, removeProduct);

export default productRoute;

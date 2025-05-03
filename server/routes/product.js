import { Router } from "express";
import { getAllProducts } from "../controllers/product.js";

const router = new Router();

// http://localhost:3002/api/products
router.get("/", getAllProducts);

export default router;

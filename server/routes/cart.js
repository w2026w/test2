import { Router } from "express";
import { addToCart, removeCartItem, getCart } from "../controllers/cart.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// http://localhost:3002/api/cart
router.post("/addToCart", addToCart);

// http://localhost:3002/api/cart
router.post("/removeCartItem", removeCartItem);

// http://localhost:3002/api/cart
router.get("/:userId", checkAuth, getCart);

export default router;

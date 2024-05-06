import express from "express";
import { createOrder, getOrders } from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

export default router;

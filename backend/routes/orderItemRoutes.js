import express from "express";
import { createOrderItem, getOrderItems } from "../controllers/orderItems.js";

const router = express.Router();

router.get("/", getOrderItems);

router.post("/", createOrderItem);

export default router;

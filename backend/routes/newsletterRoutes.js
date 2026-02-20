import express from "express";
import {
  subscribe,
  getAllSubscribers,
} from "../controllers/newsletterController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/subscribers", protect, admin, getAllSubscribers);

export default router;

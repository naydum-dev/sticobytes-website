import express from "express";
import {
  uploadImage,
  deleteImage,
  upload,
} from "../controllers/uploadController.js";

const router = express.Router();

// Upload image (will protect with auth middleware later)
router.post("/", upload.single("image"), uploadImage);

// Delete image (will protect with auth middleware later)
router.delete("/:publicId", deleteImage);

export default router;

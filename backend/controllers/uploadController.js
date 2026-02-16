import cloudinary from "../config/cloudinary.js";
import multer from "multer";

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin only - will protect later)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file",
      });
    }

    // Convert buffer to base64
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "sticobytes/blog",
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 630, crop: "limit" }, // Limit max dimensions
        { quality: "auto:good" }, // Auto quality optimization
        { fetch_format: "auto" }, // Auto format (WebP when supported)
      ],
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private (Admin only - will protect later)
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    // Decode the public_id (it comes URL encoded)
    const decodedPublicId = decodeURIComponent(publicId);

    const result = await cloudinary.uploader.destroy(decodedPublicId);

    if (result.result === "ok") {
      res.status(200).json({
        success: true,
        message: "Image deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Image not found or already deleted",
      });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

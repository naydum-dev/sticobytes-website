import express from "express";
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";

const router = express.Router();

// Public routes
router.get("/", getAllTeamMembers);
router.get("/:id", getTeamMemberById);

// Admin routes (not protected yet)
router.post("/", createTeamMember);
router.put("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);

export default router;

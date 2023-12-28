import { Router } from "express";
const router = Router();
import { body, query, param } from "express-validator";
import { User } from "../db";
import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} from "../controllers/post";
import upload from "../utils/uploader";
import { isAuthenticated } from "../middlewares/auth";

router.get("/", getPosts);
router.get("/:id", getPost);
//protected endpoint
router.post(
  "/",
  isAuthenticated,
  upload.single("image"),
  body("title").notEmpty().withMessage("Title is required"),
  createPost
),
  // protected endpoint !only the owner should be able to delete a post or a moderator
  router.patch("/:id", isAuthenticated, editPost);
// only the owner should be able to delete the post
router.delete("/:id", isAuthenticated, deletePost);

export default router;

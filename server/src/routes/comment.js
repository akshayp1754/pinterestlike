import express from "express";
const router = express.Router();
import { comment, deleteComment } from "../controllers/comment";

router.post("/:id", comment);

router.delete("/:id", deleteComment);

export default router;

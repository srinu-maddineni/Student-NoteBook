import express from "express";
import { createNote, updateNote, deleteNote } from "../controlers/noteControler.js";
import authMiddleware from "../middleware/authMiddle.js";

const noteRouter = express.Router();

// Protected routes for notes
noteRouter.post("/", authMiddleware, createNote);
noteRouter.put("/:noteId", authMiddleware, updateNote);
noteRouter.delete("/:noteId", authMiddleware, deleteNote);

export default noteRouter;

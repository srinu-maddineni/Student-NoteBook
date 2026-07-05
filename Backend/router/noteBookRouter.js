import express from "express";
import { createNoteBook } from "../controlers/noteBookControler.js";
import authMiddleware from "../middleware/authMiddle.js";

const noteBookRouter = express.Router();

// Create a new notebook (protected)
noteBookRouter.post("/", authMiddleware, createNoteBook);

export default noteBookRouter;

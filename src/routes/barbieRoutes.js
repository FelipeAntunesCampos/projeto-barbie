import express from "express"
import { getAllBarbie, getBarbieById, createBarbie, deleteBarbie } from "../controllers/barbieController.js";

const router = express.Router();

// Rotas para heróis
router.get("/", getAllBarbie);
router.get("/:id", getBarbieById)
router.post("/", createBarbie);
router.delete("/:id", deleteBarbie);

export default router;
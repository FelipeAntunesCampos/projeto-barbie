import express from "express"
import { getAllBarbie, getBarbieById, createBarbie, deleteBarbie, putBarbie } from "../controllers/barbieController.js";

const router = express.Router();

// Rotas para heróis
router.get("/", getAllBarbie);
router.get("/:id", getBarbieById)
router.post("/", createBarbie);
router.delete("/:id", deleteBarbie);
router.put("/:id", putBarbie)

export default router;
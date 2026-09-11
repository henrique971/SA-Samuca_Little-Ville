import { Router } from "express";
import {
  listSightings,
  getSighting,
  createSighting,
  updateSighting,
  deleteSighting,
  getStats,
} from "../controllers/sightingController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", listSightings);
router.get("/stats", authMiddleware, getStats);
router.get("/:id", getSighting);
router.post("/", authMiddleware, createSighting);
router.put("/:id", authMiddleware, updateSighting);
router.delete("/:id", authMiddleware, deleteSighting);

export default router;

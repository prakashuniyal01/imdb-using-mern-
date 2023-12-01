import { Router } from "express";
import {
  getDirectors,
  createDirector,
  deleteDirector,
  updateDirector,
  getDirector,
} from "../controllers/directors.controller.js";
const router = Router();

router.get("/directors", getDirectors);

router.get("/directors/:id", getDirector);

router.post("/directors", createDirector);

router.put("/directors/:id", updateDirector);

router.delete("/directors/:id", deleteDirector);

export default router;

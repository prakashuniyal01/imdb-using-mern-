import { Router } from "express";
import {
  getActors,
  createActor,
  deleteActor,
  updateActor,
  getActor,
} from "../controllers/actors.controller.js";
const router = Router();

router.get("/actors", getActors);

router.get("/actors/:id", getActor);

router.post("/actors", createActor);

router.put("/actors/:id", updateActor);

router.delete("/actors/:id", deleteActor);

export default router;

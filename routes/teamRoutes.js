import express from "express";
import { createTeam, getSingleTeam } from "../controllers/teamController.js";

const router = express.Router();

router.post("/team",createTeam )
router.get("/team/:id",getSingleTeam )

export default router;

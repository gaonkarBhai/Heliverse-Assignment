import express from "express";
import { createTeam, getAllTeams, getSingleTeam } from "../controllers/teamController.js";

const router = express.Router();

router.post("/team",createTeam )
router.get("/team/:id",getSingleTeam )
router.get("/team/",getAllTeams )

export default router;

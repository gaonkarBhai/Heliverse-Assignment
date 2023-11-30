import express from 'express';
import { createNewUser, deleteUser, getAllUsers, getSingleUser, updateUser } from '../controllers/userController.js';
const router = express.Router();

router.get("/users",getAllUsers);
router.get("/users/:id",getSingleUser);
router.post("/users",createNewUser);
router.put("/users/:id",updateUser);
router.delete("/users/:id",deleteUser);

export default router;
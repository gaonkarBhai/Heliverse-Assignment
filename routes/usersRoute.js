import express from 'express';
import { createNewUser, deleteUser, getAllUsers, getAllUsersQuery, getSingleUser, getSingleUserByName, updateUser } from '../controllers/userController.js';
const router = express.Router();

router.get("/users",getAllUsers);
router.get("/users/query/",getAllUsersQuery);
router.get("/users/:id",getSingleUser);
router.get("/user/:name",getSingleUserByName);
router.post("/users",createNewUser);
router.put("/users/:id",updateUser);
router.delete("/users/:id",deleteUser);

export default router;
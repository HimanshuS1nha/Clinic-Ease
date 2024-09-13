import {
  createUser,
  loginUser,
  getUser,
  createAdmin,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/user/register", createUser);
router.post("/user/login", loginUser);
// router.get('/user/:id', getUser);

router.post("/admin/create", createAdmin);

export default router;

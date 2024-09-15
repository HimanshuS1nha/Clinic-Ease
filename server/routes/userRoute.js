import {
  createUser,
  loginUser,
  getUser,
  createAdmin,
  isUserLoggedIn,
  logoutUser,
} from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/user/register", createUser);
router.post("/user/login", loginUser);
// router.get('/user/:id', getUser);
router.get("/user/is-logged-in", isUserLoggedIn);
router.get("/user/logout", logoutUser);

router.post("/admin/create", adminMiddleware, createAdmin);

export default router;

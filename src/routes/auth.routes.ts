import express, { Router } from "express";
import authController from "../controllers/auth.controller";
import { loginSchema } from "../schema/login.schema";
import { createUserSchema } from "../schema/user.schema";
import validate from "../middlewares/validate";

const router: Router = express.Router();

router.post("/", validate(createUserSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);

export default router;

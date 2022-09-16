import { Router } from "express";
import { firstController } from "../app/controller/FirstController";
import { authMiddleware } from "./middleware/auth";
import { registerController } from "../app/controller/RegisterController";
import { loginController } from "../app/controller/LoginController";

const router: Router = Router();

router.get("/", authMiddleware, firstController.home);

router.post("/register", registerController.registerAthlete);
router.post("/login", loginController.login);

export { router };

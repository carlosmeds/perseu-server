import { Router } from "express";
import { firstController } from "../app/controller/FirstController";
import { authMiddleware } from "./middleware/auth";
import { registerController } from "../app/controller/RegisterController";
import { loginController } from "../app/controller/LoginController";
import { athleteController } from "../app/controller/AthleteController";

const router: Router = Router();

router.get("/", authMiddleware, firstController.home);

router.post("/register", registerController.registerAthlete);
router.post("/login", loginController.login);

router.get("/get-athlete/:id", athleteController.getAthlete);

export { router };

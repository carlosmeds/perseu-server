import { Router } from "express";
import { firstController } from "../app/controller/FirstController";
import { authMiddleware } from "./middleware/auth";
import { registerController } from "../app/controller/RegisterController";
import { loginController } from "../app/controller/LoginController";
import { athleteController } from "../app/controller/AthleteController";
import { coachController } from "../app/controller/CoachController";

const router: Router = Router();

router.get("/", authMiddleware, firstController.home);

router.post("/register-athlete", registerController.registerAthlete);
router.post("/register-coach", registerController.registerCoach);

router.post("/login", loginController.login);

router.get("/get-athlete/:id", athleteController.getAthlete);

router.get("/get-coach/:id", coachController.getCoach);


export { router };

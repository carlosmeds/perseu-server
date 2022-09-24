import { Router } from "express";
import { firstController } from "../app/controller/FirstController";
import { authMiddleware } from "./middleware/auth";
import { registerController } from "../app/controller/RegisterController";
import { loginController } from "../app/controller/LoginController";
import { athleteController } from "../app/controller/AthleteController";
import { coachController } from "../app/controller/CoachController";
import { teamController } from "../app/controller/TeamController";

const router: Router = Router();

router.get("/", authMiddleware, firstController.home);

router.post("/athlete", registerController.registerAthlete);
router.post("/coach", registerController.registerCoach);

router.post("/login", loginController.login);

router.get("/athlete/:id", athleteController.getAthlete);

router.get("/coach/:id", coachController.getCoach);

router.post("/team/:id", teamController.createTeam);

export { router };

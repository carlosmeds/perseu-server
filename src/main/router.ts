import { Router } from "express";
import { authMiddleware } from "./middleware/auth";
import { registerController } from "../app/controller/RegisterController";
import { loginController } from "../app/controller/LoginController";
import { athleteController } from "../app/controller/AthleteController";
import { coachController } from "../app/controller/CoachController";
import { teamController } from "../app/controller/TeamController";

const router: Router = Router();

router.post("/athlete", authMiddleware, registerController.registerAthlete);
router.post("/coach", authMiddleware, registerController.registerCoach);

router.post("/login", loginController.login);

router.get("/athlete/:id", authMiddleware, athleteController.getAthlete);

router.get("/coach/:id", authMiddleware, coachController.getCoach);

router.post("/team/:id", authMiddleware, teamController.createTeam);
router.get("/team/:id", authMiddleware, teamController.getTeam);
router.get(
  "/team/:id/athletes",
  authMiddleware,
  teamController.getAthletesByTeam
);
router.get(
  "/team/:id/request",
  authMiddleware,
  teamController.getRequestsByTeam
);

router.post(
  "/athlete/:id/request",
  authMiddleware,
  athleteController.createRequest
);

export { router };

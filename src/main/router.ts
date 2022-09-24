import { Router } from "express";
import { authMiddleware } from "./middleware/auth";
import { registerController } from "../app/controller/RegisterController";
import { loginController } from "../app/controller/LoginController";
import { athleteController } from "../app/controller/AthleteController";
import { coachController } from "../app/controller/CoachController";
import { teamController } from "../app/controller/TeamController";
import { requestController } from "../app/controller/RequestController";

const router: Router = Router();

router.post("/login", loginController.login);

router.post("/athlete", authMiddleware, registerController.registerAthlete);
router.get("/athlete/:id", authMiddleware, athleteController.getAthlete);
router.post(
  "/athlete/:id/request",
  authMiddleware,
  requestController.createRequest
);

router.post("/coach", authMiddleware, registerController.registerCoach);
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
  requestController.getRequestsByTeam
);
router.get(
  "/team/:teamId/athlete/:athleteId/request/",
  authMiddleware,
  requestController.getRequestByAthlete
);
router.patch(
  "/team/:teamId/athlete/:athleteId/request/accept",
  authMiddleware,
  requestController.acceptRequest
);
router.patch(
  "/team/:teamId/athlete/:athleteId/request/decline",
  authMiddleware,
  requestController.declineRequest
);

export { router };

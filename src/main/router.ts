import { Router } from "express";
import { authMiddleware as auth } from "./middleware/auth";
import { registerController as registerCtl } from "../app/controller/RegisterController";
import { loginController as loginCtl } from "../app/controller/LoginController";
import { athleteController as athleteCtl } from "../app/controller/AthleteController";
import { coachController as coachCtl } from "../app/controller/CoachController";
import { teamController as teamCtl } from "../app/controller/TeamController";
import { requestController as reqCtl } from "../app/controller/RequestController";
import { handleErrorAsync as handle } from "./middleware/handleErrorAsync";

const router: Router = Router();

router.post("/login", handle(loginCtl.login));

router.post("/athlete", handle(registerCtl.registerAthlete));
router.get("/athlete/:id", auth, handle(athleteCtl.getAthlete));
router.post("/athlete/:id/request", auth, handle(reqCtl.createRequest));
router.get("/athlete/:athleteId/request/", auth, handle(reqCtl.getRequestByAthlete));
router.patch("/athlete/:athleteId/request/accept", auth, handle(reqCtl.acceptRequest));
router.patch("/athlete/:athleteId/request/decline", auth, handle(reqCtl.declineRequest));

router.post("/coach", registerCtl.registerCoach);
router.get("/coach/:id", auth, handle(coachCtl.getCoach));

router.post("/team/:id", auth, handle(teamCtl.createTeam));
router.get("/team/:id", auth, handle(teamCtl.getTeam));
router.get("/team/:id/athletes", auth, handle(teamCtl.getAthletesByTeam));
router.get("/team/:id/request", auth, handle(reqCtl.getRequestsByTeam));

export { router };

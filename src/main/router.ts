import { Router } from "express";
import { authMiddleware as auth } from "./middleware/auth";
import { registerController as registerCtl } from "../app/controller/RegisterController";
import { loginController as loginCtl } from "../app/controller/LoginController";
import { athleteController as athleteCtl } from "../app/controller/AthleteController";
import { coachController as coachCtl } from "../app/controller/CoachController";
import { teamController as teamCtl } from "../app/controller/TeamController";
import { requestController as reqCtl } from "../app/controller/RequestController";
import { handleErrorAsync as handle } from "./middleware/handleErrorAsync";
import { userController as userCtl } from "../app/controller/UserController";
import { trainingController as trainingCtl } from "../app/controller/TrainingController";

const router: Router = Router();

router.post("/login", handle(loginCtl.login));
router.post("/login/check", handle(loginCtl.checkLogin));
router.post("/admin/login", handle(loginCtl.adminLogin));

router.patch("/user/:id/password", auth, handle(userCtl.updatePassword));

router.post("/athlete", handle(registerCtl.registerAthlete));
router.get("/athlete/:id", auth, handle(athleteCtl.getAthlete));
router.put("/athlete/:id", auth, handle(athleteCtl.updateAthlete));

router.post("/athlete/:id/request", auth, handle(reqCtl.createRequest));
router.get("/athlete/:athleteId/request/", auth, handle(reqCtl.getRequestByAthlete));
router.patch("/athlete/:athleteId/request/accept", auth, handle(reqCtl.acceptRequest));
router.patch("/athlete/:athleteId/request/decline", auth, handle(reqCtl.declineRequest));
router.delete("/athlete/:athleteId/request/cancel", auth, handle(reqCtl.cancelRequest));

router.get("/athlete/:id/training", auth, handle(trainingCtl.getTrainingByAthlete));

router.post("/coach", handle(registerCtl.registerCoach));
router.get("/coach/:id", auth, handle(coachCtl.getCoach));
router.put("/coach/:id", auth, handle(coachCtl.updateCoach));

router.post("/team/:id", auth, handle(teamCtl.createTeam));
router.get("/team/:id", auth, handle(teamCtl.getTeam));
router.get("/team/:id/athletes", auth, handle(teamCtl.getAthletesByTeam));
router.get("/team/:id/request", auth, handle(reqCtl.getRequestsByTeam));
router.patch("/team/:id", auth, handle(teamCtl.updateTeamName));

router.post("/team/:id/training", auth, handle(trainingCtl.createTraining));
router.get("/team/:id/training", auth, handle(trainingCtl.getTrainingsByTeam));

router.post("/training/:id", auth, handle(trainingCtl.assignTrainingById));
router.get("/training/:id", auth, handle(trainingCtl.getTrainingById));

export { router };

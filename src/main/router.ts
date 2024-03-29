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
import { checkInController as checkInCtl } from "../app/controller/CheckInController";
import { adminController as adminCtl } from "../app/controller/AdminController";
import { groupController as groupCtl } from "../app/controller/GroupController";
import { notificationController as notificationCtl } from "../app/controller/NotificationController";

const router: Router = Router();

router.post("/login", handle(loginCtl.login));
router.post("/login/check", handle(loginCtl.checkLogin));

router.post("/admin/login", handle(loginCtl.adminLogin));
router.post("/admin", handle(registerCtl.registerAdmin));
router.get("/admin/:id", handle(adminCtl.getAdminById));
router.delete("/admin/:id", auth, handle(adminCtl.deactivateAdmin));
router.get("/admin/entities/stats", auth, handle(adminCtl.getStats));
router.get("/admin/athlete/:id", auth, handle(adminCtl.getAthleteForAdmin));

router.patch("/user/:id/password", auth, handle(userCtl.updatePassword));
router.get("/user/admin", auth, handle(userCtl.getAdmins));
router.get("/user/coach", auth, handle(userCtl.getCoaches));
router.get("/user/athlete", auth, handle(userCtl.getAthletes));
router.get("/user/team/:id", auth, handle(userCtl.getUsersByTeamId));
router.get("/user/:id/name", auth, handle(userCtl.getNameByUserId));
router.post("/user/:id/notification/token", auth, handle(notificationCtl.saveToken));

router.post("/athlete", handle(registerCtl.registerAthlete));
router.get("/athlete/:id", auth, handle(athleteCtl.getAthlete));
router.put("/athlete/:id", auth, handle(athleteCtl.updateAthlete));
router.delete("/athlete/:id", auth, handle(athleteCtl.deleteAthlete));

router.post("/athlete/:id/request", auth, handle(reqCtl.createRequest));
router.get("/athlete/:athleteId/request/", auth, handle(reqCtl.getRequestByAthlete));
router.patch("/athlete/:athleteId/request/accept", auth, handle(reqCtl.acceptRequest));
router.patch("/athlete/:athleteId/request/decline", auth, handle(reqCtl.declineRequest));
router.delete("/athlete/:athleteId/request/cancel", auth, handle(reqCtl.cancelRequest));

router.get("/athlete/:id/training/current", auth, handle(trainingCtl.getCurrentTraining));
router.get("/athlete/:id/training", auth, handle(trainingCtl.getTrainingsByAthlete));
router.get("/athlete/:id/check-in", auth, handle(checkInCtl.getCheckInByAthlete));

router.get("/coach/no-team", auth, handle(coachCtl.getCoachesWithoutTeam));
router.post("/coach", handle(registerCtl.registerCoach));
router.get("/coach/:id", auth, handle(coachCtl.getCoach));
router.put("/coach/:id", auth, handle(coachCtl.updateCoach));

router.get("/team", auth, handle(teamCtl.getAllTeams));
router.post("/team/:id", auth, handle(teamCtl.createTeam));
router.get("/team/:id", auth, handle(teamCtl.getTeam));
router.delete("/team/:id", handle(teamCtl.deleteTeam));
router.patch("/team/:id", auth, handle(teamCtl.updateTeamName));
router.get("/team/:id/athletes", auth, handle(teamCtl.getAthletesByTeam));
router.get("/team/:id/request", auth, handle(reqCtl.getRequestsByTeam));
router.get("/team/:id/details", auth, handle(teamCtl.getTeamDetails));
router.post("/team/:id/coach/switch", handle(teamCtl.switchCoach));

router.post("/team/:id/training", auth, handle(trainingCtl.createTraining));
router.get("/team/:id/training", auth, handle(trainingCtl.getTrainingsByTeam));

router.post("/training/:id", auth, handle(trainingCtl.assignTrainingById));
router.get("/training/:id", auth, handle(trainingCtl.getTrainingById));
router.post("/training/:id/athlete/:athleteId/check-in", auth, handle(checkInCtl.athleteCheckIn));
router.patch("/training/:id/athlete/:athleteId/deactivate", auth, handle(trainingCtl.deactivateTraining));

router.post("/team/:id/group", auth, handle(groupCtl.createGroup));
router.get("/team/:id/group", auth, handle(groupCtl.getGroupsByTeam));
router.get("/athlete/:id/group", auth, handle(groupCtl.getGroupsByAthlete));
router.get("/group/:id", auth, handle(groupCtl.getGroupById));

export { router };

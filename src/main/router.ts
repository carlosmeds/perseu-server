import { Router } from "express";
import { firstController } from "../app/controller/FirstController";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth";
import { JWT_SECRET } from "./config/env";

const router: Router = Router();

router.get("/", authMiddleware, firstController.home);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = {
      email: "email",
      password: "password",
    };

    if (user) {
      const token = jwt.sign(
        { email: user.email },
        JWT_SECRET!,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({token});
    }
  } catch (err) {
    console.log(err);
  }
});

export { router };

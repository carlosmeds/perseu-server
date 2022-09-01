import { Router } from "express";
import { firstController } from "../app/controller/FirstController";
import jwt from "jsonwebtoken";

const router: Router = Router();

//Routes
router.get("/", firstController.home);

router.post("/login", async (req, res) => {
  try {
    // Get user input
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
      // Create token
      const token = jwt.sign(
        { email: user.email },
        'KyHaIILsnmIaYWu',
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json(token);
    }
  } catch (err) {
    console.log(err);
  }
});

export { router };

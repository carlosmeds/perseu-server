import { Request } from "express";
import { UserRepo } from "../../infra/postgres/repo/UserRepo";
import { LoginUseCase } from "../../domain/usecases/login/login";
import { CheckLoginUseCase } from "../../domain/usecases/login/checkLogin";
import { AdminLoginUseCase } from "../../domain/usecases/login/adminLogin";

class LoginController {
  async login(req: Request) {
    const { email, password } = req.body;
    const userRepo = new UserRepo();

    const loginUseCase = new LoginUseCase(userRepo);

    return await loginUseCase.execute(email, password);
  }

  async checkLogin(req: Request) {
    const { token } = req.body;
    const userRepo = new UserRepo();

    const checkLoginUseCase = new CheckLoginUseCase(userRepo);

    return await checkLoginUseCase.execute(token);
  }

  async adminLogin(req: Request) {
    const { email, password } = req.body;
    const userRepo = new UserRepo();

    const adminLoginUseCase = new AdminLoginUseCase(userRepo);

    return await adminLoginUseCase.execute(email, password);
  }
}

export const loginController = new LoginController();

import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticate = new AuthenticateUserUseCase();

    const token = await authenticate.execute({
      username,
      password,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };

import { Request, Response } from "express";
import { CreateteUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, name, password } = request.body;
    console.log(username);
    const createUserUseCase = new CreateteUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      username,
      password,
    });

    return response.json(user);
  }
}

export { CreateUserController };

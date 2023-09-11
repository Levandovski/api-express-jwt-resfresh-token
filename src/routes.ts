import { Request, Response, Router } from "express";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/refreshTokenUserController";

const router = Router();

router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthenticateUserController().handle);
router.post("/refresh-token", new RefreshTokenUserController().handle);

router.get(
  "/courses",
  ensureAuthenticated,
  (request: Request, response: Response) => {
    return response.json([
      { id: 1, name: "NodeJS" },
      { id: 2, name: "Javascript" },
      { id: 3, name: "ReactJS" },
    ]);
  }
);

export { router };

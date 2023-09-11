import { compare } from "bcrypt";
import { client } from "../../prisma/client";
import { sign } from "jsonwebtoken";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToken } from "../../provider/GenerateToken";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    //Verificar se o suuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!userAlreadyExists) throw new Error("User or password incorrect");

    const passwordMatch = compare(password, userAlreadyExists.password);

    if (!passwordMatch) throw new Error("User or password incorrect");

    const generateToken = new GenerateToken();
    const token = generateToken.execute(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      },
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };

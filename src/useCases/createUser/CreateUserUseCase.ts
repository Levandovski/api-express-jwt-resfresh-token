import { hash } from "bcrypt";

import { client } from "../../prisma/client";

interface IUseRequest {
  name: string;
  password: string;
  username: string;
}

class CreateteUserUseCase {
  async execute({ name, username, password }: IUseRequest) {
    //Verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });
    //Cadastra o usuário
    if (userAlreadyExists) throw new Error("User already exists!");

    const passwordHash = await hash(password, 10);

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateteUserUseCase };

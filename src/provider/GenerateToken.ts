import { sign } from "jsonwebtoken";

class GenerateToken {
  async execute(userId: string) {
    const token = sign({}, process.env.JWT_PASS, {
      subject: userId,
      expiresIn: "20s",
    });
    return token;
  }
}

export { GenerateToken };

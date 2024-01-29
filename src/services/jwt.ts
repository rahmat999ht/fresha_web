import jwt from "jsonwebtoken";
import { env } from "~/env";

const DEFAULT_SIGN_OPTION: jwt.SignOptions = {
  expiresIn: 3 * 24 * 60 * 60, // 12 days
};

declare module "jsonwebtoken" {
  interface JwtPayload {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    emailVerified: Date | null;
    image: string | null;
  }
}

export function signJwtAccessToken(
  payload: jwt.JwtPayload,
  options: jwt.SignOptions = DEFAULT_SIGN_OPTION,
) {
  const secretKey = env.NEXTAUTH_SECRET;
  const token = jwt.sign(payload, secretKey ?? "", options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secretKey = env.NEXTAUTH_SECRET;
    const decoded = jwt.verify(token, secretKey ?? "");
    return decoded as jwt.JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

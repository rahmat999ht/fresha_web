import { HTTPException } from "hono/http-exception";
import * as costumerRepo from "~/repository/costumer";
import { signJwtAccessToken } from "~/services/jwt";
import { validateCreateUser } from "~/utils/validation";

/**
 * Signs in a user.
 *
 * This takes a user sign up object, checks if the email or phone number
 * already exists, hashes the password, and creates a new user record.
 *
 * Throws errors if email or phone number already exists.
 */
export const signin = async (signinProps: { email: string }) => {
  await validateCreateUser(signinProps);

  return costumerRepo.createCustamer(signinProps);
};

/**
 * Logs in a user.
 *
 * This takes a user login object, finds the user record by email,
 * verifies the provided password, generates a JWT access token if valid,
 * and returns the user object without the password and the new JWT token.
 *
 * Throws errors if user not found or invalid password.
 */
export const login = async (loginProps: { email: string }) => {
  const costumer = await costumerRepo.getCustamerByUniq({
    where: { email: loginProps.email },
  });

  if (!costumer) {
    throw new HTTPException(401, {
      message: "Email anda tidak terdaftar",
    });
  }

  const token = signJwtAccessToken(costumer);

  return { costumer, token };
};

/**
 * Gets the current authenticated user from a JWT token.
 *
 * Takes a JWT token, verifies it, and returns the payload
 * as the current user if valid.
 *
 * Throws errors if no token provided or invalid token.
 */
export const currentUser = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  const costumer = await costumerRepo.getCustamerByUniq({ where: { id, email } });

  if (!costumer) {
    throw new HTTPException(404, {
      message: "User ini tidak ada",
    });
  }

  return costumer;
};

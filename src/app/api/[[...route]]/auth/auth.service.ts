import { HTTPException } from "hono/http-exception";
import * as costumerRepo from "~/repository/costumer";
import { signJwtAccessToken } from "~/services/jwt";
import { validateCreateUser } from "~/utils/validation";

export const signin = async (signinProps: { email: string }) => {
  await validateCreateUser(signinProps);

  return costumerRepo.createCustamer(signinProps);
};

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

export const currentUser = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  const costumer = await costumerRepo.getCustamerByUniq({
    where: { id, email },
  });

  if (!costumer) {
    throw new HTTPException(404, {
      message: "User ini tidak ada",
    });
  }

  return costumer;
};

import type { Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import * as costamerRepo from "~/repository/costumer";

export const validateCreateUser = async (data: Prisma.CustamerCreateInput) => {
  const [checkEmail] = await Promise.all([
    costamerRepo.getUserByUniq({
      where: {
        email: data.email ?? "",
      },
    }),
    // costamerRepo.getUserByUniq({
    //   nomorTelephone: create.nomorTelephone,
    // }),
  ]);

  if (checkEmail) {
    throw new HTTPException(401, {
      message: "Email sudah ada",
    });
  }
};

import type { HastagMl, Prisma } from "@prisma/client";
import { db } from "~/server/db";

export type InputCreateHastagMl ={
  name : string,
  custamerId : string,
}

export function createHastag(
  input: InputCreateHastagMl,
): Promise<HastagMl> {
  const hastagMl = db.hastagMl.create({
    data: {
      name: input.name,
      custamerId: input.custamerId,
    },
  });

  return hastagMl;
}

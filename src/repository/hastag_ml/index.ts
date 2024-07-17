import type { HastagMl } from "@prisma/client";
import { db } from "~/server/db";

export type InputCreateHastagMl = {
  name: string;
  custamerId: string;
};

export function createHastag(input: InputCreateHastagMl): Promise<HastagMl> {
  const hastagMl = db.hastagMl.create({
    data: {
      name: input.name,
      custamerId: input.custamerId,
    },
  });

  return hastagMl;
}

export function getsHastagMl(): Promise<HastagMl[]> {
  return db.hastagMl.findMany() as Promise<HastagMl[]>;
}

export function getsHastagMlCount(): Promise<number> {
  return db.hastagMl.count() as Promise<number>;
}

export function getHastagMlFirst(id: string): Promise<HastagMl> {
  return db.hastagMl.findFirst({
    where: { id },
    include: {
      Custamer: true,
    },
  }) as Promise<HastagMl>;
}

export function getHastagMlWhereIdCus(id: string): Promise<HastagMl[]> {
  return db.hastagMl.findMany({
    where: { custamerId: id },
  }) as Promise<HastagMl[]>;
}

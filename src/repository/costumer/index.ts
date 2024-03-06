import type { Custamer, Prisma } from "@prisma/client";
import { type z } from "zod";
import { db } from "~/server/db";
import type { custamerSchema } from "~/type/customer";

export type FindManyProps = Prisma.CustamerFindManyArgs;
export type FindFirstProps = Prisma.CustamerFindFirstArgs;
export type CustomerProps = z.infer<typeof custamerSchema>;

export function getsCustomer(fineManyProps: FindManyProps) {
  return db.custamer.findMany(fineManyProps) as Promise<Custamer[]>;
}

export const getCustamerCount = () => {
  const usersCount = db.custamer.count();

  return usersCount;
};

export const getCustamerByUniq = (where: Prisma.CustamerFindUniqueArgs) => {
  const user = db.custamer.findUnique(where);

  return user;
};

export function getCustamerFirst(id: string) {
  return db.custamer.findFirst({
    where: { id },
    include: {
      riwPes: true,
    },
  });
}

export const createCustamer = (data: Prisma.CustamerCreateInput) => {
  const user = db.custamer.create({
    data: {
      email: data.email,
      isActive: true,
    },
  });

  return user;
};

export const updateCustamer = (input: CustomerProps) => {
  const user = db.custamer.update({
    where: { id: input.id },
    data: {
      name: input.name,
      image: input.image,
      address: input.address,
      email: input.email,
      phone: input.phone,
    },
  });

  return user;
};

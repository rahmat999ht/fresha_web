import type { Custamer, Prisma } from "@prisma/client";
import { db } from "~/server/db";
import type {
  FindManyCustomerProps,
  UpdateCustomerProps,
} from "~/type/customer";

export function getsCustomer(fineManyProps: FindManyCustomerProps) : Promise<Custamer[]> {
  return db.custamer.findMany(fineManyProps) ;
}

export function getCustamerCount() : Promise<number>{
  const custamerCount = db.custamer.count();

  return custamerCount;
}

export function getCustamerByUniq(where: Prisma.CustamerFindUniqueArgs) {
  const custamer = db.custamer.findUnique(where);

  return custamer;
}

export function getCustamerFirst(id: string)  {
  return db.custamer.findFirst({
    where: { id },
    include: {
      riwPes: {
        include: {
          listProduct: true,
        },
      },
    },
  });
}

export function createCustamer(data: Prisma.CustamerCreateInput) : Promise<Custamer> {
  const custamer = db.custamer.create({
    data: {
      email: data.email,
      name:data.name,
      isActive: true,
    },
  });

  return custamer;
}

export function updateCustamer(input: UpdateCustomerProps) : Promise<Custamer> {
  const custamer = db.custamer.update({
    where: { id: input.id },
    data: {
      name: input.name,
      image: input.image,
      address: input.address,
      phone: input.phone,
    },
  });

  return custamer;
}

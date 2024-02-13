import type { Custamer, Prisma } from "@prisma/client";
import { type z } from "zod";
import { db } from "~/server/db";
import type { custamerSchema } from "~/type/customer.schema";

// /**
//  * Retrieves a list of users from the database, filtering and selecting fields based on the provided arguments.
//  *
//  * @param userFindManyArgs - Optional filtering and selection criteria to apply to the query.
//  */
// export const getUsers = (userFindManyArgs: TFindManyUser = undefined) => {
//   const users = db.custamer.findMany({
//     select: selectUserWithoutPass,
//     orderBy: {
//       email: "asc",
//     },
//     ...userFindManyArgs,
//   });

//   return users;
// };

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

/**
 * Retrieves a single user from the database based on the provided unique identifier.
 *
 * @param where - The unique identifier to search for the user by.
 */
export const getCustamerByUniq = (where: Prisma.CustamerFindUniqueArgs) => {
  const user = db.custamer.findUnique(where);

  return user;
};

export function getCustamerFirst(findFirstProps: FindFirstProps) {
  return db.custamer.findFirst(findFirstProps);
}

/**
 * Creates a new user record in the database.
 *
 * @param data - The user data to insert into the database.
 */
export const createCustamer = (data: Prisma.CustamerCreateInput) => {
  const user = db.custamer.create({
    data,
  });

  return user;
};

// /**
//  * Updates an existing user record in the database.
//  *
//  * @param data - The updated user data. Must include the user's id to identify the record to update.
//  */
export const updateCustamer = (
  input: CustomerProps,
) => {
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

// /**
//  * Deletes a user record from the database.
//  *
//  * @param where - The unique identifier of the user record to delete.
//  */
// export const deleteUser = (where: TWhereUniqueUser) => {
//   const user = prisma.user.delete({
//     where,
//   });

//   return user;
// };

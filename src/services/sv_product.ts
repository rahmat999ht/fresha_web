"use server";

import { api } from "~/trpc/server";
// import toast from "react-hot-toast";

export const deleteProduct = async (idItem: string) => {
  try {
    console.log(`item ${idItem}`);
    if (!idItem) {
      console.log(`item ${idItem}`);
      return;
    }
    console.log(`Berhasil Menghapus ${idItem}`);
    return await api.product.delete.mutate({ id: idItem });
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }
};

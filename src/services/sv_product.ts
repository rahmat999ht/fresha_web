"use server";

// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

export const deleteProduct = async () => {
  const trpc = api.useContext();

  const deleteItem = api.product.delete.useMutation({
    onSettled: async (values, error, value) => {
      console.log("SETTLED", value);
      await trpc.product.getAll.invalidate();
      if (values) {
        const name = values.name;
        toast.success(`Berhasil Menghapus Product ${name}`);
      } else if (error) {
        toast.success(`Error ${error.message}`);
      }
    },
  });

  return deleteItem;
};
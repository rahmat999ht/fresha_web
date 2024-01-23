"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

import { api } from "~/trpc/react";

export function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [hastag, setHastag] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setCategory("");
      setHastag("");
      setDescription("");
      setPrice(0);
      setStock(0);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProduct.mutate({
          name: name,
          image: name,
          category: category,
          hastag_ml: hastag,
          desc: description,
          price: price,
          stock: stock,
        });
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            variant="flat"
            label="Name"
          />
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            variant="flat"
            label="Category"
          />
        </div>
        <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
          <Input
            value={hastag}
            onChange={(e) => setHastag(e.target.value)}
            type="text"
            variant="flat"
            label="Hastag"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            variant="flat"
            label="description"
          />
        </div>
        <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
          <Input
            value={price.toString()} // Convert number to string
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            type="number"
            variant="flat"
            label="Price"
          />

          <Input
            value={stock.toString()} // Convert number to string
            onChange={(e) => setStock(parseInt(e.target.value, 10))}
            type="number"
            variant="flat"
            label="Stock"
          />
        </div>
        <Button type="submit" color="success" disabled={createProduct.isLoading}>
          {createProduct.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

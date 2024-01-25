"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Button, Image } from "@nextui-org/react";
import axios from "axios";
import { api } from "~/trpc/react";
import CameraIcon from "public/icons/CameraIcon";
import { type NextPage } from "next";

interface Props {
  dirs: string[];
}

export const CreateProduct: NextPage<Props> = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [hastag, setHastag] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const data = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log("Unexpected error:", error);
      }
    }
    setUploading(false);
  };

  const createNewProduct = api.product.create.useMutation({
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
        if (selectedFile) {
          createNewProduct.mutate({
            name: name,
            image: selectedFile.name,
            category: category,
            hastag_ml: hastag,
            desc: description,
            price: price,
            stock: stock,
          });
        }
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex w-full flex-col gap-8">
        <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
          <div className="flex w-80 flex-col gap-4">
            <label>
              <input
                type="file"
                hidden
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file ?? new Blob()));
                    setSelectedFile(file);
                  }
                }}
              />
              <div className="flex aspect-video w-80 cursor-pointer items-center justify-center rounded border-2 border-dashed">
                {selectedImage ? (
                  <Image
                    width={300}
                    height={200}
                    alt="NextUI hero Image with delay"
                    src={selectedImage}
                  />
                ) : (
                  <div className="mb-6 flex flex-wrap gap-4 md:mb-0 md:flex-nowrap">
                    <span>Select Image</span>
                    <CameraIcon />
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="flex w-full flex-col gap-8">
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
                label="Description"
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
          </div>
        </div>
        <Input
          value={selectedFile ? selectedFile.name : "Image Kosong"}
          type="text"
          disabled
          variant="flat"
          label="Image"
        />
        <Button
          type="submit"
          color="success"
          disabled={createNewProduct.isLoading && uploading}
          onClick={handleUpload}
        >
          {createNewProduct.isLoading && uploading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

// export default CreateProduct;

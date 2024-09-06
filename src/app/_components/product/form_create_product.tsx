"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useState, useEffect, useRef } from "react";
import { Input, Button, Image } from "@nextui-org/react";
import { api } from "~/trpc/react";
import CameraIcon from "public/icons/CameraIcon";
import { type NextPage } from "next";
import { supabase } from "~/utils/supabase";
import * as mobilenet from "@tensorflow-models/mobilenet";
import styles from "./product.module.css";
import "@tensorflow/tfjs";

export const FormCreateProduct: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [hastag, setHastag] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [identifyLoading, setIdentifyLoading] = useState(false);

  const [isModelLoading, setModelLoading] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [results, setResults] = useState<
    {
      className: string;
      probability: number;
    }[]
  >([]);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const loadModel = async () => {
    setModelLoading(true);
    try {
      const initModel = await mobilenet.load();
      setModel(initModel);
      setModelLoading(false);
    } catch (e) {
      console.log(e);
      setModelLoading(false);
    }
  };

  const handleIdentify = async () => {
    setIdentifyLoading(true);
    const imageElement = imageRef.current;

    if (!imageElement) {
      console.error("Image element is undefined.");
      setIdentifyLoading(false);
      return;
    }

    if (model) {
      const predictions = await model.classify(imageElement);
      setResults(predictions);

      if (results.length > 0) {
        updateHastag('');
        const allHastags = results[0]!.className!;
        updateHastag(allHastags);
        console.log(allHastags, "hasil result");
      }
      setIdentifyLoading(false);
    } else {
      console.error("Model is null.");
      setIdentifyLoading(false);
    }
  };

  useEffect(() => {
    void loadModel();
  }, []);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file ?? new Blob()));
      setSelectedFile(file);
    }
  };

  const updateHastag = (hastag: string) => {
    setHastag(hastag);
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
      setSelectedImage("");
      setResults([]);
      setSelectedFile(undefined);
    },
  });

  const handleSubmit = async () => {
    setUploading(true);
    if (selectedFile) {
      const imageUrl =
        "https://omhmokdygpqbhwdtshvk.supabase.co/storage/v1/object/public/images/sayur/";

      const imageName = Date.now().toString() + selectedFile.name;
      const { data, error } = await supabase.storage
        .from("images")
        .upload("sayur/" + imageName, selectedFile);

      createNewProduct.mutate({
        name: name,
        image: imageUrl + imageName,
        category: category,
        hastag_ml: hastag,
        desc: description,
        price: price,
        stock: stock,
      });
      setUploading(false);
      console.log("berhasil guys");

      if (data) {
        console.log(data);
      } else if (error) {
        console.log(error);
      }
    }
  };

  if (isModelLoading) {
    return <h2>Model Loading...</h2>;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
          <div className="flex w-80 flex-col gap-4">
            <label>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  void handleImage(e);
                }}
              />
              <div className="flex aspect-video w-80 cursor-pointer items-center justify-center rounded border-2 border-dashed">
                {selectedImage ? (
                  <Image
                    width={300}
                    height={200}
                    alt="NextUI hero Image with delay"
                    src={selectedImage}
                    ref={imageRef}
                  />
                ) : (
                  <div className="mb-6 flex flex-wrap gap-4 md:mb-0 md:flex-nowrap">
                    <span>Select Image</span>
                    <CameraIcon />
                  </div>
                )}
              </div>
            </label>
            {selectedImage && (
              <Button
                type="submit"
                color="success"
                disabled={identifyLoading}
                onClick={handleIdentify}
              >
                {identifyLoading ? "Identify..." : "Detect image"}
              </Button>
            )}
          </div>
          <div className="flex w-full flex-col gap-4">
            <Input
              value={selectedFile ? selectedFile.name : "Image Kosong"}
              type="text"
              disabled
              variant="flat"
              label="Image"
            />
            {results.length > 0 ? (
              <div className="imageResult">
                {results.map((result, index) => {
                  return (
                    <div className={styles.borderCard} key={result.className}>
                      <span className={styles.name}>{result.className}</span>
                      <div className={styles.confidence}>
                        <span className={styles.confidenceText}>
                          Confidence level:{" "}
                          {(result.probability * 100).toFixed(2)}%
                        </span>
                        {index === 0 && (
                          <span className={styles.bestGuess}>Best Guess</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center font-medium italic text-gray-500">
                kosong
              </div>
            )}
          </div>
        </div>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex w-full flex-col gap-6">
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input
              isRequired
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              variant="flat"
              label="Name"
            />
            <select
              id="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="bg-gray-60  block w-full rounded-lg p-2 py-3 text-sm text-gray-900"
            >
              <option selected>Pilih jenis sayuran</option>
              <option value="Daun">Daun</option>
              <option value="Batang">Batang</option>
              <option value="Akar">Akar</option>
              <option value="Polong">Polong</option>
              <option value="Bunga">Bunga</option>
              <option value="Buah">Buah</option>
              <option value="Umbi Batang">Umbi Batang</option>
              <option value="Umbi Lapis">Umbi Lapis</option>
              <option value="Jamur">Jamur</option>
            </select>
          </div>
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input
              isRequired
              value={hastag}
              onChange={(e) => setHastag(e.target.value)}
              type="text"
              variant="flat"
              label="Hastag"
            />
            <Input
              isRequired
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              variant="flat"
              label="Description"
            />
          </div>
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input
              isRequired
              value={price.toString()}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              variant="flat"
              label="Price"
            />
            <Input
              isRequired
              value={stock.toString()}
              onChange={(e) => setStock(Number(e.target.value))}
              type="number"
              variant="flat"
              label="Stock"
            />
          </div>
          <Button
            type="submit"
            color="success"
            onClick={() => {
              void handleSubmit();
            }}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

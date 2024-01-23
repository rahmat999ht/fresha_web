"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { deleteProduct } from "~/services/sv_product";
import { toast } from 'react-hot-toast';

export interface IModal {
  title: string;
  image?: string;
  subTitle?: string;
  content: string;
  desc?: string;
}

interface OpenModalProps {
  data: IModal;
  toOpen: React.ReactNode; // Menggunakan React.ReactNode untuk menangani konten dinamis
  isAction?: boolean;
  actionTitle?: string; // Menggunakan React.ReactNode untuk menangani konten dinamis
  idItem?: string; // Menggunakan React.ReactNode untuk menangani konten dinamis
}

export default function OpenModal({
  data,
  toOpen,
  isAction = false,
  actionTitle = "Action",
  idItem,
}: OpenModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly variant="light" onPress={onOpen}>
        {toOpen}
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#F3FAF7] dark:bg-[#19172c] text-[#111827]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {data.title}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center">
                  <Image width={300} alt="NextUI hero Image" src={data.image} />
                </div>
                <p>{data.subTitle}</p>
                <p>{data.content}</p>
                <p>{data.desc}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {isAction && idItem && (
                  <Button
                    color="danger"
                    onPress={() => {
                      deleteProduct(idItem)
                        .then(()=>{
                          toast.success('Sukses menghapus data product');
                        })
                        .catch((error) => {
                          toast.error(`pesan error${error}`);
                        });
                      onClose();
                    }}
                  >
                    {actionTitle}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

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
import { FreshaImage } from "public/images/FRESHA";

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
  onAction?: () => void; // Menggunakan React.ReactNode untuk menangani konten dinamis
}

export default function OpenModal({
  data,
  toOpen,
  isAction = false,
  actionTitle = "Action",
  onAction,
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
        // isDismissable
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
                  {data.image ? (
                    <Image
                      width={300}
                      alt="NextUI hero Image"
                      src={data.image}
                    />
                  ) : (
                    <FreshaImage />
                  )}
                </div>
                <p className="text-bold text-sm">{data.subTitle}</p>
                <p className="text-bold text-sm">{data.content}</p>
                <p className="text-bold text-sm">{data.desc}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {isAction && onAction && (
                  <Button
                    color="danger"
                    onPress={() => {
                      onAction();
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

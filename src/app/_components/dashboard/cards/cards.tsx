import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { Card, CardBody } from "@nextui-org/react";

export interface ICardProps {
  item: {
    title: string;
    number: number;
    // change: number;
  };
}

const Cards: React.FC<ICardProps> = ({ item }) => {
  return (
    <Card className="px-1 py-1">
      <CardBody className="overflow-visible py-2">
        <div className={`${styles.container} bg-white`}>
          <MdSupervisedUserCircle size={24} />
          <div className={styles.texts}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.number}>{item.number}</span>
            {/* <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
          {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week
        </span> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Cards;

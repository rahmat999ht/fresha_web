import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

export interface ICardProps {
  item: {
    title: string;
    number: number;
    change: number;
  };
}

const Cards: React.FC<ICardProps> = ({ item }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>{item.number}</span>
        <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week
        </span>
      </div>
    </div>
  );
};

export default Cards;

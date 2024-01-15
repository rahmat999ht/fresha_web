import React from "react";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Adiwidya Dev</div>
      <div className={styles.text}>© All rights reserved.</div>
    </div>
  );
};

export default Footer;

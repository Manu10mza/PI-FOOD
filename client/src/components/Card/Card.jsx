import React from "react";
import styles from "./Card.module.css";

export default function Card({ title, image, diets }) {
  return (
    <div>
      <div className={styles.all}>
        <div className={styles.polaroid}>
          <div className={styles.container}>
            <img className={styles.img} src={image} alt="img not found" />
            <h3 className={styles.title}>{title}</h3>
            <h5 className={styles.diets}>
              Diets: {diets.map((e) => e + ", ")}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

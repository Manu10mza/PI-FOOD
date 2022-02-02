import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.principal}>
      <div className={styles.title}>
        <h1>Welcome to FOOD APP</h1>
        <Link to="/home">
          <button className={styles.btn}> Discover</button>
        </Link>
      </div>
    </div>
  );
}

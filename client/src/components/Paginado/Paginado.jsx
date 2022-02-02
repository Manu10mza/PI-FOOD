import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((number) => (
            <li className={styles.li} key={number}>
              {/* <a onClick={() => paginado(number)}>{number}</a>; */}
              <button className={styles.btn} onClick={() => paginado(number)}>
                {" "}
                {number}{" "}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

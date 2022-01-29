import React from "react";
import "./Paginado.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumber &&
          pageNumber.map((number) => (
            <li className="li" key={number}>
              {/* <a onClick={() => paginado(number)}>{number}</a>; */}
              <button onClick={() => paginado(number)}> {number} </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

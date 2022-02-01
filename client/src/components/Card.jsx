import React from "react";

export default function Card({ title, image, diets }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{diets.map((e) => e + " | ")}</h5>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  );
}

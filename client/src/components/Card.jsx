import React from "react";

export default function Card({ title, image, diet }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{diet}</h5>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  );
}

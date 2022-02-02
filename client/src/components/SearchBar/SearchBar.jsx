import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(getNameRecipe(name));
    document.getElementById("searchBar").value = "";
  }

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.search}
        id="searchBar"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={styles.btn}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}

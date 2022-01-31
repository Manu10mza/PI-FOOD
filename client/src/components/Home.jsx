import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesByDiet,
  filterCreated,
  orderByTitle,
  orderByPoints,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

var img_default = document.createElement("img");
img_default.source = "./default_image.jpg";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  //estados locales
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [order, setOrder] = useState("");
  //Paginado
  const indexOfLastRecipe = currentPage * recipesPerPage; // 9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterDiet(e) {
    dispatch(filterRecipesByDiet(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleSort(e) {
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`); //para q se modifique el state y se renderice
  }

  function handleScore(e) {
    dispatch(orderByPoints(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`); //para q se modifique el state y se renderice
  }

  return (
    <div>
      <Link to="/recipe">Create a recipe</Link>
      <h1> FOOD APP</h1>
      <button onClick={handleClick}>All recipes</button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="All">----</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select onChange={(e) => handleScore(e)}>
          <option value="All">----</option>
          <option value="high">High Score</option>
          <option value="low">Low Score</option>
        </select>
        <select onChange={(e) => handleFilterDiet(e)}>
          <option value="All"> All diets</option>
          <option value="gluten free"> Gluten free</option>
          <option value="dairy free"> Dairy free</option>
          <option value="paleolithic"> Paleolithic</option>
          <option value="ketogenic"> Ketogenic</option>
          <option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
          <option value="vegan"> Vegan</option>
          <option value="pescatarian"> Pescatarian</option>
          <option value="primal"> Primal</option>
          <option value="fodmap friendly"> Fodmap friendly</option>
          <option value="whole 30"> Whole 30</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Existing</option>
        </select>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
        <SearchBar />
        {currentRecipes?.map((e) => {
          return (
            <div className="card">
              <Link to={"/home/" + e.id}>
                <Card
                  title={e.title}
                  image={e.image ? e.image : img_default}
                  diet={e.diet}
                />
                ;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

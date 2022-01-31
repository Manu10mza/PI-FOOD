import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetails } from "../redux/actions";
import { useEffect } from "react";

export default function Details(props) {
  const dispatch = useDispatch();
  const myRecipe = useSelector((state) => state.details);
  console.log(myRecipe[0]);
  let { id } = useParams();
  //valido react v5 props.match.params.id

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  //falta corregir diets
  return (
    <div>
      {myRecipe.length > 0 ? (
        <div>
          <h1>Title: {myRecipe[0].title}</h1>
          <img src={myRecipe[0].image} atl="" width="250px" height="250px" />
          <h3>
            Diets:
            {!myRecipe[0].createdInDb
              ? myRecipe[0].diets + " "
              : myRecipe[0].diets.map((e) => e.title + " ")}
          </h3>
          <br />
          <p>Summary: {myRecipe[0].summary}</p>
          <br />
          <h3>Score: {myRecipe[0].score}</h3>
          <br />
          <h3>Health: {myRecipe[0].health}</h3>
          <br />
          <p> Steps: {myRecipe[0].steps}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Go back</button>
      </Link>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetails } from "../../redux/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css";

export default function Details(props) {
  const dispatch = useDispatch();
  const myRecipe = useSelector((state) => state.details);
  console.log(myRecipe[0]);
  let { id } = useParams();
  //valido react v5 props.match.params.id

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);
  return (
    <div className={styles.principal}>
      <div className={styles.blur}></div>
      <div>
        {myRecipe.length > 0 ? (
          <div>
            <div className={styles.all}>
              <div className={styles.polaroid}>
                <div className={styles.container}>
                  <h1 className={styles.title}>{myRecipe[0].title}</h1>
                  <img className={styles.img} src={myRecipe[0].image} atl="" />
                  <h5 className={styles.diets}>
                    Diets:{" "}
                    {!myRecipe[0].createdInDb
                      ? myRecipe[0].diets.map((e) =>
                          myRecipe[0].diets.indexOf(e) <
                          myRecipe[0].diets.length - 1
                            ? e + ", "
                            : e
                        )
                      : myRecipe[0].diets.map((e) =>
                          myRecipe[0].diets.indexOf(e)
                            ? e.title + ", "
                            : e.title + " "
                        )}
                  </h5>
                </div>
              </div>
            </div>
            <br />
            <div className={styles.details}>
              <h3 className={styles.score}>Score: {myRecipe[0].score}</h3>
              <h3 className={styles.score}>Health: {myRecipe[0].health}</h3>
              <p className={styles.summary}>Summary: {myRecipe[0].summary}</p>
              <p className={styles.steps}> Steps: {myRecipe[0].steps}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <Link to="/home">
          <button className={styles.btn}>Go back</button>
        </Link>
      </div>
    </div>
  );
}

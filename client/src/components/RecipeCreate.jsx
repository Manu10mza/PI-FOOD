import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getTypes } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

async function validURL(str) {
  var pattern = await new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// function validDiets(array) {
//   if (
//     (input.diets.includes("dairy free") &&
//       input.diets.includes("lacto ovo vegetarian")) ||
//     ((input.diets.includes("lacto ovo vegetarian") ||
//       input.diets.includes("vegan")) &&
//       (input.diets.includes("pescatarian") || input.diets.includes("primal")))
//   ) {
//     return (errors.diets = "Incompatible diets");
//   }
// }

//Validacion de formulario

function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "A title is required";
  } else if (!input.summary) {
    errors.summary = "A summary is required";
  } else if (input.score > 100 || input.score < 0) {
    errors.score = "Score must be a number between 0 and 100";
  } else if (input.health > 100 || input.health < 0) {
    errors.health = "Health must be a number between 0 and 100";
    //   } else if (typeof input.step !== "string") {
    //     errors.steps = "Steps must be a string";
  } else if (validURL(input.image)) {
    errors.image = "Image must be a URL";
  } else if (
    (input.diets.includes("dairy free") &&
      input.diets.includes("lacto ovo vegetarian")) ||
    ((input.diets.includes("lacto ovo vegetarian") ||
      input.diets.includes("vegan")) &&
      (input.diets.includes("pescatarian") || input.diets.includes("primal")))
  ) {
    //gluten free
    //dairy free
    //lacto ovo vegetarian
    //vegan
    //paleolithic
    //primal
    //pescatarian
    //foodmap friendly
    //whole 30
    errors.diets = "Incompatible diets";
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  //estado local para guardar formulario
  const [input, setInput] = useState({
    title: "",
    summary: "",
    score: "",
    health: "",
    steps: "",
    image: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }
  //borrar si no se utiliza
  //   function handleSelect(e) {
  //     setInput({
  //       ...input,
  //       diets: [...input.diets, e.target.value],
  //     });
  //   }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postRecipe(input));
    alert("Recipe uploaded!");
    setInput({
      title: "",
      summary: "",
      score: "",
      health: "",
      steps: "",
      image: "",
      diets: [],
    });
    navigate("/home");
  }

  function handleDelete(e) {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== e),
    });
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label>Summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {errors.summary && <p className="error">{errors.summary}</p>}
        </div>
        <div>
          <label>Score:</label>
          <input
            type="number"
            value={input.score}
            name="score"
            onChange={(e) => handleChange(e)}
          />
          {errors.score && <p className="error">{errors.score}</p>}
        </div>
        <div>
          <label>Health:</label>
          <input
            type="number"
            value={input.health}
            name="health"
            onChange={(e) => handleChange(e)}
          />
          {errors.health && <p className="error">{errors.health}</p>}
        </div>
        <div>
          <label>Steps:</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          />
          {errors.steps && <p className="error">{errors.steps}</p>}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>
        {/* <div>
          <label>Diets:</label>
          <input
            type="text"
            value={input.diets}
            name="diets"
            onChange={(e) => handleChange(e)}
          />
        </div> */}
        <div>
          <label>Diets:</label>
          {types.map((e) => (
            <label>
              <input
                type="checkbox"
                name={e.title}
                value={e.title}
                onChange={(e) => handleCheck(e)}
              />
              {e.title}
            </label>
          ))}
          {errors.diets && <p className="error">{errors.diets}</p>}
        </div>
        {/* <select onChange={(e) => handleSelect(e)}>
          {types.map((e) => (
            <option value={e.title}>{e.title}</option>
          ))}
        </select> */}
        {/* <ul>
          <li>{input.diets.map((e) => e + ", ")}</li>
        </ul> */}
        <br />
        <button type="submit"> Upload</button>
      </form>
      {input.diets.map((e) => (
        <div className="divDiets">
          <p>{e}</p>
          <button className="buttonX" onClick={() => handleDelete(e)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

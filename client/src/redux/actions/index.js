import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: json.data,
    });
  };
}

export function filterRecipesByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderByTitle(payload) {
  return {
    type: ORDER_BY_TITLE,
    payload,
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/recipe", payload);
    console.log(response);
    return response;
  };
}

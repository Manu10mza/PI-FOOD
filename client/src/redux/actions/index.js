import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_POINTS = "ORDER_BY_POINTS";
export const GET_TYPES = "GET_TYPES";
export const GET_DETAILS = "GET_DETAILS";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: json.data,
    });
  };
}

export function getNameRecipe(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/recipes?name=" + payload);
      return dispatch({
        type: GET_RECIPES_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("/types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/recipes/" + id);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
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

export function orderByPoints(payload) {
  return {
    type: ORDER_BY_POINTS,
    payload,
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post("/recipe", payload);
    console.log(response);
    return response;
  };
}

import {
  GET_RECIPES,
  FILTER_BY_DIET,
  FILTER_CREATED,
  ORDER_BY_TITLE,
  ORDER_BY_POINTS,
  GET_RECIPES_NAME,
  GET_TYPES,
  GET_DETAILS,
} from "../actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  types: [],
  details: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes;
      // console.log("all Recipes", allRecipes);
      // console.log("Payload", action.payload);
      const dietFiltered =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((e) => e.diets.some((d) => d === action.payload));
      return {
        ...state,
        recipes: dietFiltered,
      };
    case FILTER_CREATED:
      const allRecipes2 = state.allRecipes;
      const createdFilter =
        action.payload === "created"
          ? allRecipes2.filter((e) => e.createdInDb)
          : allRecipes2.filter((e) => !e.createdInDb);
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes : createdFilter,
      };
    case ORDER_BY_TITLE:
      let sortedArr =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes : sortedArr,
      };
    case ORDER_BY_POINTS:
      let sortedArr1 =
        action.payload === "low"
          ? state.recipes.sort((a, b) => {
              if (a.score > b.score) {
                return 1;
              }
              if (b.score > a.score) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.score > b.score) {
                return -1;
              }
              if (b.score > a.score) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes : sortedArr1,
      };
    default:
      return state;
  }
};

export default rootReducer;

import axios from "axios";
import {
  GET_ALL_RECIPES,
  GET_DIETS,
  GET_RECIPES_BY_NAME,
  CLEAR_RECIPE_BY_NAME,
  CLEAR_RECIPE_FILTERED,
  FILTER_BY_DIET,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  FILTER_BY_ORIGIN,
  ADD_NEW_RECIPE,
  CURRENT_PAGE,
  CURRENT_DIETS,
} from "./types";

export const getAllRecipes = () => {
  return async (dispatch) => {
    const response = await axios.get("/recipes");
    const allRecipes = response.data;

    dispatch({
      type: GET_ALL_RECIPES,
      payload: allRecipes,
    });
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    const response = await axios.get("/diets");
    const diets = response.data;
    dispatch({
      type: GET_DIETS,
      payload: diets,
    });
  };
};

export const getRecipesByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(`/recipes?name=${name}`);
    const recipesByName = response.data;
    
    if (
      recipesByName.message === "Lo siento, no existen recetas con ese nombre"
    ) {
      window.alert("Ups, parece que no hay recetas con ese nombre");
      return;
    }

    dispatch({
      type: GET_RECIPES_BY_NAME,
      payload: recipesByName,
    });
  };
};

export const addNewRecipe = (recipe) => {
  return {
    type: ADD_NEW_RECIPE,
    payload: recipe
  }
}

export const clearRecicesSearch = () => {
  return {
    type: CLEAR_RECIPE_BY_NAME,
    payload: [],
  };
};

export const clearReacipeFiltered = () => {
  return {
    type: CLEAR_RECIPE_FILTERED,
    payload: [],
  }
}

export const filterByDiet = (diet) => {
  return {
    type: FILTER_BY_DIET,
    payload: diet,
  };
};


export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  }
}

export const orderByScore = (score) => {
  return {
    type: ORDER_BY_SCORE,
    payload: score,
  };
}

export const orderByName = (value) => {
  return {
    type: ORDER_BY_NAME,
    payload: value,
  };

}

export const setCurrentPage = (pageNumber) => {
  return {
    type: CURRENT_PAGE,
    payload:pageNumber
  }
}

export const setCurrentDiets = (diet) => {
  return {
    type: CURRENT_DIETS,
    payload: diet
  }
}
export const ADD_RECIPE = "ADD_RECIPE";
export const REMOVE_FROM_CALENDRA = "REMOVE_FROM_CALENDRA";

export function addRecipe({ day, recipe, meal }) {

  return {
    type: ADD_RECIPE,
    day,
    recipe,
    meal
  }
}

export function removeFromCalendra({ day, meal }) {

  return {
    type: REMOVE_FROM_CALENDRA,
    day,
    meal
  }
}
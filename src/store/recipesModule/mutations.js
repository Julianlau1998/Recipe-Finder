export function GET_RECIPE (state) {
  state.recipe.loading = true
  state.err = null
}

export function RECEIVE_RECIPE (state, recipe) {
  state.recipe.data = recipe
  state.recipe.loading = false
}

export function GET_RECIPES (state) {
  state.recipes.loading = true
  state.err = null
}

export function RECEIVE_RECIPES (state, { recipes, offset }) {
  if (!recipes.length) {
    state.recipes.finished = true
  } else {
    state.recipes.finished = false
  }
  if (offset !== 0 && offset !== undefined) {
    state.recipes.data = state.recipes.data.concat(recipes)
  } else {
    state.recipes.data = recipes
  }
  state.recipes.loading = false
}

export function POST_RECIPE (state) {
  state.recipe.posting = true
}

export function RECIPE_POSTED (state) {
  state.recipe.posting = false
}

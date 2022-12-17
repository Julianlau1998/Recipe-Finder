export function GET_RECIPE (state) {
  state.recipe.loading = true
  state.err = null
}

export function RECEIVE_RECIPE (state, note) {
  state.recipe.data = note
  state.recipe.loading = false
}

export function GET_RECIPES (state) {
  state.recipes.loading = true
  state.err = null
}

export function RECEIVE_RECIPES (state, note) {
  state.recipes.data = note
  state.recipes.loading = false
}
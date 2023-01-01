export function GET_CATEGORIES (state) {
  state.categories.loading = true
  state.err = null
}

export function RECEIVE_CATEGORIES (state, categories) {
  state.categories.data = categories
  state.categories.loading = false
}

export function GET_CATEGORY (state) {
  state.category.loading = true
  state.err = null
}

export function RECEIVE_CATEGORY (state, category) {
  state.category.data = category
  state.category.loading = false
}
export function POST_CATEGORY (state) {
  state.category.submitting = true
  state.err = null
}
export function CATEGORY_POSTED (state) {
  state.category.submitting = false
}
export function DELETE_CATEGORY (state) {
  state.category.loading = true
  state.err = null
}
export function CATEGORY_DELETED (state) {
  state.category.loading = false
}
export function PUT_CATEGORY (state) {
  state.category.submitting = true
  state.err = null
}
export function CATEGORY_PUT (state) {
  state.category.submitting = false
}

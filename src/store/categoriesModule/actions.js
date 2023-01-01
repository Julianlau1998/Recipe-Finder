import axios from 'axios'

export function getAll ({ commit }) {
  commit('GET_CATEGORIES')
  axios
    .get('/api/categories')
    .then(response => {
      commit('RECEIVE_CATEGORIES', response.data)
    })
    .catch(err => {
      commit('CATEGORIES_ERROR', err)
    })
}
export function getOne ({ commit }, id) {
  commit('GET_CATEGORY')
  axios
    .get(`/api/categories/${id}`)
    .then(response => {
      commit('RECEIVE_CATEGORY', response.data)
    })
    .catch(err => {
      commit('CATEGORY_ERROR', err)
    })
}
export function post ({ commit }, category) {
  commit('POST_CATEGORY')
  axios
    .post('/api/categories', category)
    .then(function () {
      commit('CATEGORY_POSTED')
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function deleteOne ({ commit }, id) {
  commit('DELETE_CATEGORY')
  axios
    .delete(`/api/categories/${id}`)
    .then(function () {
      commit('CATEGORY_DELETED')
    })
    .catch(function (error) {
      console.log(error)
    })
}
export function put ({ commit }, category) {
  commit('PUT_CATEGORY')
  axios
    .put(`/api/categories/${category.id}`, category)
    .then(function () {
      commit('CATEGORY_PUT')
    })
    .catch(function (error) {
      console.log(error)
    })
}

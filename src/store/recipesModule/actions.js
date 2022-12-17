import axios from 'axios'

const config = {
  headers:{
    'x-rapidapi-key': process.env.VUE_APP_API_KEY
  }
};

export function getRandom ({ commit }) {
  commit('GET_RECIPE')
  axios
    .get('https://themealdb.p.rapidapi.com/random.php', config)
    .then(response => {
      commit('RECEIVE_RECIPE', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getByCategory ({ commit }, category='vegetarian') {
  commit('GET_RECIPES')
  axios
      .get(`https://themealdb.p.rapidapi.com/filter.php?c=${category}`, config)
      .then(response => {
        commit('RECEIVE_RECIPES', response.data)
      })
      .catch(err => {
        console.log(err)
      })
}

export function getById ({ commit }, id) {
    commit('GET_RECIPE')
    axios
        .get(`https://themealdb.p.rapidapi.com/lookup.php?i=${id}`, config)
        .then(response => {
            commit('RECEIVE_RECIPE', response.data)
        })
        .catch(err => {
            console.log(err)
        })
}
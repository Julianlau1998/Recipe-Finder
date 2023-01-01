import Vue from 'vue'
import Vuex from 'vuex'
import recipesModule from './recipesModule'
import categoriesModule from "@/store/categoriesModule";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recipesModule,
    categoriesModule
  }
})

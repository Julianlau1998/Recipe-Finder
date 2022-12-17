import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Recipe from '../views/Recipe'
import Favorites from "@/views/Favorites"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: Recipe
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router

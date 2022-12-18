<template>
  <div>
    <Recipes
        @changeCategory="getByCategory"
        :recipes="shuffleArray(recipes)"
        :category-prop="category"
    />
  </div>
</template>

<script>
import {mapState} from "vuex"
import Recipes from "@/components/recipes/Recipes"

export default {
  name: "DiscoverRecipes",
  components: {
    Recipes
  },
  computed: {
    ...mapState(['recipesModule']),
    recipes () {
      return (!this.recipesModule.recipes.loading && this.recipesModule.recipes.data.meals) || []
    }
  },
  created () {
    const category = JSON.parse(localStorage.getItem('category'))
    if (category !== null && category !== undefined) {
      this.category = category
      this.getByCategory(category)
    } else {
      this.getByCategory()
    }
  },
  methods: {
    getByCategory (category) {
      this.$store.dispatch('recipesModule/getByCategory', category)
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return(array)
    }
  }
}
</script>
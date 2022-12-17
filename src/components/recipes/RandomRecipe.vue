<template>
  <div>
    <Recipe :recipe="recipe" @getRandom="getRandom" />
    <button class="button is-primary is-bottom-center" @click="getRandom">
      Get Random Recipe
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Recipe from "@/components/recipes/Recipe";
export default {
  name: 'HomeView',
  components: {Recipe},
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['recipesModule']),
    recipes () {
      return (!this.recipesModule.recipe.loading && this.recipesModule.recipe.data) || []
    },
    recipe () {
      return this.recipes.meals ? this.recipes.meals[0] : {}
    }
  },
  created () {
    this.getRandom()
  },
  methods: {
    getRandom () {
      this.$store.dispatch('recipesModule/getRandom')
    }
  }
}
</script>

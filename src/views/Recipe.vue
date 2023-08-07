<template>
  <div>
    <Recipe :recipe="recipe" />
    <span v-if="recipes.length > 2" class="pt-6">
      <hr class="hr mt-6">
      <h1 class="header is-size-2 mt-6 mb-2">
        Discover More Recipes
      </h1>
      <recipes
          v-if="recipe.ingredients.length"
          :recipes="recipes"
          :show-filters="false"
      />
    </span>
    <button class="button is-primary is-bottom-center" @click="goBack">
      Back
    </button>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import Recipe from "@/components/recipes/Recipe"
import Recipes from "@/components/recipes/Recipes"

export default {
  name: "Recipe-component",
  components: {
    Recipe,
    Recipes
  },
  data () {
    return {
      id: 0,
      randomisation: 0,
    }
  },
  computed: {
    ...mapState(['recipesModule']),
    recipe () {
      return (!this.recipesModule.recipe.loading && this.recipesModule.recipe.data) || {}
    },
    recipes () {
      return (!this.recipesModule.recipes.loading && this.recipesModule.recipes.data.filter(recipe => recipe.id !== this.recipe.id)) || []
    }
  },
  watch: {
    recipe (val) {
      if (val.country?.length || !this.recipes.length) {
        this.getAllRecipes({ offset: '0', random: this.randomisation, fulltext: this.recipe.country })
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getById(this.id)
    this.setRandom()
  },
  methods: {
    ...mapActions({
      getById: 'recipesModule/getById',
      getAllRecipes: 'recipesModule/getAll',
    }),
    goBack () {
      this.$router.go(-1)
    },
    setRandom () {
      this.randomisation = JSON.stringify(Math.floor(Math.random() * 10)+1)
    }
  }
}
</script>

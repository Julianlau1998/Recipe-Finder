<template>
  <div>
    <Recipe :recipe="recipe" />
    <button class="button is-primary is-bottom-center" @click="goBack">
      Back
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Recipe from "@/components/recipes/Recipe"

export default {
  name: "Recipe-component",
  components: {
    Recipe
  },
  data () {
    return {
      id: 0
    }
  },
  computed: {
    ...mapState(['recipesModule']),
    recipe () {
      return (!this.recipesModule.recipe.loading && this.recipesModule.recipe.data.meals[0]) || []
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getById(this.id)
  },
  methods: {
    getById (id) {
      this.$store.dispatch('recipesModule/getById', id)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
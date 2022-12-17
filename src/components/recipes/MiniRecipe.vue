<template>
  <div @click="openRecipe" class="column is-half-tablet is-4-desktop is-3-widescreen">
    <img
        class="is-small-image mt-5 is-pointer"
        :src="recipe.strMealThumb"
        :alt="`${recipe.strMeal}-image`"
    >
    <br>
    <h3 class="header is-size-4 is-secondary is-pointer">
      {{ recipe.strMeal }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "MiniRecipe",
  props: {
    recipe: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    openRecipe () {
      this.$router.push({ name: 'recipe', params: { id: this.recipe.idMeal } })
    }
  }
}
</script>
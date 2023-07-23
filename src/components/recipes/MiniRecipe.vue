<template>
  <div class="column is-half-tablet is-4-desktop is-3-widescreen">
    <img
        @click="openRecipe"
        class="is-small-image has-border mt-5 is-pointer has-hover"
        :src="recipe.image"
        :alt="`${recipe.title}-image`"
        tabindex="1"
        @keydown.enter="openRecipe"
    >
    <br>
    <h3 @click="openRecipe" class="header miniRecipe is-size-4 is-secondary is-pointer has-text-weight-bold	">
      {{ recipe.title }}
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
      this.$router.push({ name: 'recipe', params: { id: this.recipe.id } })
      this.$router.go(0)
    }
  }
}
</script>

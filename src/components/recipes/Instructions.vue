<template>
  <div class="columns mt-2-desktop pb-6">
    <div class="column is-4">
      <h4 class="header is-size-4 mb-3 has-text-right-desktop">
        Ingredients:
      </h4>
      <div class="has-text-centered has-text-right-desktop is-small-text">
        <p style="display: inline-block; text-align: left;" tabindex="1">
        <span
            v-for="( ingredient, index ) in recipe.ingredients"
            :key="`ingredient-${index}`"
        >
          <span v-if="ingredient">
            <span v-if="ingredient.measurement">
              {{ ingredient.measurement.replace('1 cups', '1 cup') }}
            </span>
            {{ ingredient.ingredient }}
            <br>
          </span>
        </span>
        </p>
      </div>
    </div>
    <div class="column is-8 has-text-left-mobile">
      <p class="mb-6 is-text" style="white-space: pre-line" tabindex="1">
        {{ instructions }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IngredientList",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {
    instructions () {
      if (!this.recipe.description) return ''
      return this.recipe.description.replaceAll(/\. /g, '.\n')
    }
  }
}
</script>

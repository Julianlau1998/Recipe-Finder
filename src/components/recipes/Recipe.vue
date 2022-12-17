<template>
  <div class="home">
    <i
        class="fas fa-star is-pointer mt-2"
        @click="toggleFavorite"
        :class="favorite ? 'is-yellow' : ''"
    />
    <br>
    <h1 class="header is-size-3">
      {{ recipe.strMeal ? recipe.strMeal : 'Loading...' }}
    </h1>
    <p class="mb-5 is-fourth">
      {{ recipe.strCategory ? recipe.strCategory : 'Loading...' }}
    </p>
    <img
        class="is-header-image mb-5 mt-5"
        :src="recipe.strMealThumb ? recipe.strMealThumb : 'https://via.placeholder.com/450'"
        :alt="`${recipe.strMeal} image`"
    >
    <br>
    <p class="mb-6 is-text" style="white-space: pre-line">
      {{ instructions }}
    </p>
    <div>
      <h4 class="header is-size-4 mb-3">
        Ingredients:
      </h4>
      <div class="has-text-centered">
        <p style="display: inline-block; text-align: left;">
          <span v-for="i in 20" :key="`ingredient-${i}`">
            <span v-if="recipe[`strIngredient${i}`]">
              {{i}}.
              {{ recipe[`strIngredient${i}`] }}
              <br>
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recipe-component",
  props: {
    recipe: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      favorite: false,
      favorites: []
    }
  },
  watch: {
    recipe(val) {
      if (val?.idMeal) {
        this.favorites.forEach(favorite => {
          if (favorite.idMeal === val.idMeal) {
            this.favorite = true
          }
        })
      }
    }
  },
  created() {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites === null || favorites === undefined) {
      this.favorites = []
    } else {
      this.favorites = favorites
    }
  },
  computed: {
    instructions () {
      if (!this.recipe.strInstructions) return ''
      return this.recipe.strInstructions.replaceAll(/\. /g, '.\n')
    }
  },
  methods: {
    toggleFavorite () {
      this.favorite = !this.favorite
      if (this.favorite) {
        this.favorites.push(this.recipe)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      } else {
        this.favorites = this.favorites.filter((favorite) => {
          return favorite.idMeal !== this.recipe.idMeal
        })
        console.log(this.favorites)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    }
  }
}
</script>
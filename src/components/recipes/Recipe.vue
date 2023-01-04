<template>
  <div class="home">
    <i
        class="fas fa-star is-pointer mt-2 mb-2"
        @click="toggleFavorite"
        :class="favorite ? 'is-yellow' : ''"
    />
    <br>
    <h1 class="header is-size-3">
      {{ recipe.title ? recipe.title : 'Loading...' }}
    </h1>
    <p class="is-fourth" :class="!shareAvailable ? 'mb-3' : ''">
      {{ recipe.category ? recipe.category : 'Loading...' }}
      &nbsp;
      <span v-if="recipe.country !== 'Unknown'" class="mb-3 is-third">
        {{ recipe.country ? recipe.country : 'Loading...' }}
      </span>
    </p>
    <div v-if="shareAvailable" class="mt-negative-1">
      <img
          @click="share"
          class="is-share-icon"
          src="../../../public/img/share.png" alt="share"
      />
    </div>
    <img
        class="is-header-image mb-5"
        :src="recipe.image ? recipe.image : 'https://via.placeholder.com/450'"
        :alt="`${recipe.title} image`"
    >
    <br>
    <div class="columns mt-2-desktop">
      <div class="column is-4">
        <div>
          <h4 class="header is-size-4 mb-3 has-text-right-desktop">
            Ingredients:
          </h4>
          <div class="has-text-centered has-text-right-desktop is-small-text">
            <p style="display: inline-block; text-align: left;">
              <span v-for="( ingredient, index ) in recipe.ingredients" :key="`ingredient-${index}`">
                <span v-if="ingredient">
    <!--              {{index+1}}.-->
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
      </div>
      <div class="column is-8 has-text-left-mobile">
        <p class="mb-6 is-text" style="white-space: pre-line">
          {{ instructions }}
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
      this.favorite = false
      if (val?.id) {
        this.favorites.forEach(favorite => {
          if (favorite.id === val.id) {
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
      if (!this.recipe.description) return ''
      return this.recipe.description.replaceAll(/\. /g, '.\n')
    },
    shareAvailable () {
      return navigator.share !== undefined
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
          return favorite.id !== this.recipe.id
        })
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    },
    async share () {
      const response = await fetch(this.recipe.image)
      const blob = await response.blob()
      const filesArray = [
        new File(
            [blob],
            `${this.recipe.title}.jpg`,
            {
              type: "image/jpeg",
              lastModified: new Date().getTime()
            }
        )
      ]
      let ingredients = this.recipe.ingredients.map((ingredient) => `${ingredient.measurement.replace('1 cups', '1 cup')} ${ingredient.ingredient}`)
      ingredients = ingredients.toString().replaceAll(',', '\n')
      await navigator.share({
        text: `${this.recipe.title}: \n\n\n${this.recipe.description} \n\n\nIngredients: \n\n${ingredients}`,
        files: filesArray,
        url: !this.$store.state.iOS ? 'https://play.google.com/store/apps/details?id=com.recipe_finder_jl.app&gl=DE' : 'https://apps.apple.com/de/app/recipe-finder-cookbook/id1662386400?l=en'
      })
    }
  }
}
</script>

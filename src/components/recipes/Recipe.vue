<template>
  <div v-touch:swipe="swipeHandler" class="home">
    <i
        class="fas fa-star icon is-pointer mt-2 mb-2"
        @click="toggleFavorite"
        :class="favorite ? 'is-yellow' : 'is-outlined'"
    />
    <categoryInfo
      :share-available="shareAvailable"
      :category="category"
      :country="country"
      :open-category="openCategory"
      :open-country="openCountry"
    />
    <h1 class="header is-size-3">
      {{ title }}
    </h1>
    <div v-if="shareAvailable" class="mt-negative-1">
      <Share class="mt-negative-1" @share="share" />
    </div>
    <img
        class="is-header-image mb-5 has-border"
        :class="!shareAvailable ? 'mt-3' : ''"
        :src="recipe.image ? recipe.image : 'https://via.placeholder.com/450'"
        :alt="`${recipe.title} image`"
    >
    <Instructions :recipe="recipe" />
  </div>
</template>

<script>
import Instructions from "@/components/recipes/Instructions"
import CategoryInfo from "@/components/recipes/CategoryInfo"
import Share from "@/components/base/Share"

export default {
  name: "Recipe-component",
  components: { CategoryInfo, Instructions, Share },
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
    this.getFavorites()
  },
  computed: {
    shareAvailable () {
      return navigator.share !== undefined
    },
    category () {
      return this.recipe.category ? this.recipe.category : 'Loading...'
    },
    country () {
      return this.recipe.country ? this.recipe.country : 'Loading...'
    },
    title () {
      return this.recipe.title ? this.recipe.title : 'Loading...'
    }
  },
  methods: {
    getFavorites () {
      const favorites = JSON.parse(localStorage.getItem('favorites'))
      if (favorites === null || favorites === undefined) {
        this.favorites = []
      } else {
        this.favorites = favorites
      }
    },
    setFavorites (favorites) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    },
    toggleFavorite () {
      this.favorite = !this.favorite
      if (this.favorite) {
        this.favorites.push(this.recipe)
        this.setFavorites(this.favorites)
      } else {
        this.favorites = this.favorites.filter((favorite) => favorite.id !== this.recipe.id)
        this.setFavorites(this.favorites)
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
    },
    openCategory () {
      if (`${this.$route.path}?category=${this.$route.query.category}` !== `/?category=${this.recipe.category}`) {
        this.$router.push(`/?category=${this.recipe.category}`)
      }
      if (this.$route.path === '/') {
        this.$emit('changePage')
      }
    },
    openCountry () {
      if (`${this.$route.path}?country=${this.$route.query.country}` !== `/?country=${this.recipe.country}`) {
        this.$router.push(`/?country=${this.recipe.country}`)
      }
      if (this.$route.path === '/') {
        this.$emit('changePage')
      }
    },
    swipeHandler (direction) {
      if (direction === 'right') {
        this.componentTransitionName = 'swipe-component-right'
        this.$router.go(-1)
      }
    }
  }
}
</script>

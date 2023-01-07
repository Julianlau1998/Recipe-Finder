<template>
  <div v-touch:swipe="swipeHandler">
    <h3 class="header is-size-3">
      Favorites
    </h3>
    <hr class="hr">
    <Recipes
        v-if="favorites.length"
        :recipes="favorites"
        :isFilterHidden="true"
        :isSearchHidden="true"
    />
    <div v-else class="mt-6">
      <h4 class="header is-size-4">
        No Favorites Yet
      </h4>
      <p>
        Add a recipe to your favorites by clicking on the star icon above the recipe
      </p>
    </div>
    <button class="button is-primary is-bottom-center" @click="home">
      Home
    </button>
  </div>
</template>

<script>
import Recipes from "@/components/recipes/Recipes";
export default {
  name: "Favorites-view",
  components: {
    Recipes
  },
  data () {
    return {
      favorites: []
    }
  },
  created() {
    this.favorites = JSON.parse(localStorage.getItem('favorites'))
    if (this.favorites === null || this.favorites === undefined) this.favorites = []
  },
  methods: {
    home () {
      this.$router.push('/')
    },
    swipeHandler (direction) {
      if (direction === 'right') {
        this.componentTransitionName = 'swipe-component-right'
        this.$router.push('/')
      }
    }
  }
}
</script>

<template>
  <div>
    <h3 class="header is-size-3">
      Favorites
    </h3>
    <hr class="hr">
    <Recipes :recipes="favorites" :isFilterHidden="true" />
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
    }
  }
}
</script>
<template>
  <div>
    <Recipe :recipe="recipe" @getRandom="getRandom" @changePage="$emit('changePage')" />
    <button
        class="button is-primary is-bottom-center"
        @click="getRandom"
        tabindex="1"
        @keydown.enter="getRandom"
    >
      Get Random Recipe
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Recipe from "@/components/recipes/Recipe";
export default {
  name: 'HomeView',
  components: { Recipe },
  data () {
    return {
      randomClicks: 0
    }
  },
  computed: {
    ...mapState(['recipesModule']),
    recipe () {
      return (!this.recipesModule.recipe.loading && this.recipesModule.recipe.data[0]) || {}
    },
    iOS () {
      return window.webkit && window.webkit.messageHandlers.showInterstitial
    }
  },
  created () {
    this.randomClicks = JSON.parse(localStorage.getItem('clicks'))
    if (this.randomClicks === null || this.randomClicks === undefined || isNaN(this.randomClicks)) {
      this.randomClicks = 0
    }
    this.getRandom()
  },
  methods: {
    getRandom () {
      if (this.iOS) {
        this.randomClicks += 1
        localStorage.setItem('clicks', this.randomClicks)
        if (this.randomClicks >= 10) {
          this.showInterstitialAd()
          this.randomClicks = 0
          localStorage.setItem('clicks', JSON.stringify(this.randomClicks))
        }
      }
      this.$store.dispatch('recipesModule/getRandom')
    },
    showInterstitialAd () {
      window.webkit.messageHandlers.showInterstitial.postMessage({
        "message": 'Show Interstitial'
      })
    }
  }
}
</script>

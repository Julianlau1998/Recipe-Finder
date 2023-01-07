<template>
  <div v-touch:swipe="swipeHandler" class="is-flex-center mt-7">
    <div>
      <span
          class="is-pointer is-nav-element mr-1"
          :class="page===0 ? 'is-current-page' : ''"
          @click="page=0"
      >
        Random
      </span>
      <span
          class="is-pointer is-nav-element ml-1"
          :class="page===1 ? 'is-current-page' : ''"
          @click="page=1"
      >
        Discover
      </span>
    </div>
    <hr class="hr">
    <transition
        :name= componentTransitionName
        mode="out-in"
        ref="componentTransition"
    >
      <RandomRecipe @changePage="page=1" v-if="page===0" />
      <DiscoverRecipes @home="page=0" @changePage="page=1" v-else />
    </transition>
  </div>
</template>

<script>
import RandomRecipe from "@/components/recipes/RandomRecipe"
import DiscoverRecipes from "@/components/recipes/DiscoverRecipes"

export default {
  components: {
    DiscoverRecipes,
    RandomRecipe
  },
  data () {
    return {
      page: 0,
      device: {},
      currentComponent: 'RandomRecipe',
      componentTransitionName: 'swipe-component-left',
    }
  },
  created () {
    const page = localStorage.getItem('page')
    if ((page === null || page === undefined) && !this.$route.query.category?.length && !this.$route.query.country?.length) {
      this.page = 0
      console.log(1)
    } else if (this.$route.query.category?.length || this.$route.query.country?.length) {
      this.page = 1
      console.log(2)
    } else {
      this.page = parseInt(page)
      console.log(3)
    }
  },
  watch: {
    page (val) {
      if (val === 0) {
        this.componentTransitionName = 'swipe-component-right'
        localStorage.setItem('page', 0)
      } else {
        this.componentTransitionName = 'swipe-component-left'
        localStorage.setItem('page', 1)
      }
    }
  },
  methods: {
    swipeHandler (direction) {
      if (this.page === 0 && direction == 'left') {
        this.componentTransitionName = 'swipe-component-left'
        this.page = 1
      } else if ( this.page === 1 && direction == 'right') {
        this.componentTransitionName = 'swipe-component-right'
        this.page = 0
        localStorage.setItem('page', 0)
      }
    }
  }
}

</script>

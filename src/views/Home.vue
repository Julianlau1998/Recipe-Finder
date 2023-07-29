<template>
  <div
      v-touch:swipe="swipeHandler"
      class="is-flex-center mt-7"
  >
    <PageSelector :page="page" @changePage="changePage" />
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
import RandomRecipe from "@/components/Home/RandomRecipe"
import DiscoverRecipes from "@/components/Home/DiscoverRecipes"
import PageSelector from "@/components/base/PageSelector"

export default {
  name: "Home-view",
  components: {
    DiscoverRecipes,
    RandomRecipe,
    PageSelector
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
    const page = parseInt(localStorage.getItem('page'))
    if (this.isValueSelected || page === 1) {
      this.page = 1
    } else {
      this.page = 0
    }
  },
  watch: {
    page (val) {
      if (val === 0) {
        this.componentTransitionName = 'swipe-component-right'
        localStorage.setItem('page', '0')
      } else {
        this.componentTransitionName = 'swipe-component-left'
        localStorage.setItem('page', '1')
      }
    }
  },
  computed: {
    isValueSelected () {
      return this.$route.query.category?.length || this.$route.query.country?.length
    }
  },
  methods: {
    changePage (page) {
      this.page = page
      if (this.isValueSelected) this.$router.replace('/')
    },
    swipeHandler (direction) {
      if (this.page === 0 && direction === 'left') {
        this.page = 1
      } else if ( this.page === 1 && direction === 'right') {
        this.page = 0
      }
    }
  }
}

</script>

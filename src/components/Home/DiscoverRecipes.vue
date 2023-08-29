<template>
  <div v-infinite-scroll="loadMore">
    <Recipes
        :recipes="recipes"
        :categories="categories"
        :category="category"
        @changeCategory="changeCategory"
        @search="changeCategory(category, $event)"
        @searchCountry="changeCategory('1', $event)"
    />
    <div v-if="recipesModule.recipes.loading" class="columns is-centered mt-6">
      <div class="column is-half has-text-centered">
        <div class="spinner" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Recipes from "@/components/recipes/Recipes"

export default {
  name: "DiscoverRecipes",
  components: {
    Recipes
  },
  computed: {
    ...mapState(['recipesModule']),
    ...mapState(['categoriesModule']),
    recipes () {
      return this.recipesModule.recipes.data
    },
    categories () {
      return (!this.categoriesModule.categories.loading && this.categoriesModule.categories.data) || []
    }
  },
  data () {
    return {
      category: '1',
      allFetchedRecipes: [],
      offset: 0,
      randomisation: 0,
      fulltext: ''
    }
  },
  created () {
    this.setRandom()
    this.getCategories()
    const category = JSON.parse(localStorage.getItem('category') !== undefined ? localStorage.getItem('category') : null)
    if (category !== null && category !== undefined && category !== '1' ) {
      this.category = category
      this.getByCategory({category: category, offset: this.offset, random: this.randomisation })
    } else {
      this.getAll({ offset: '0', random: this.randomisation })
    }
  },
  methods: {
    ...mapActions({
      getAll: 'recipesModule/getAll',
      getByCategory: 'recipesModule/getByCategory',
      getCategories: 'categoriesModule/getAll',
    }),
    loadMore () {
      if (this.recipesModule.recipes.loading || this.recipesModule.recipes.finished) return
      this.offset += 20
      if (this.category !== null && this.category !== undefined && this.category !== '1' ) {
        this.getByCategory({
          category: this.category,
          offset: this.offset,
          random: this.randomisation,
          fulltext: this.fulltext
        })
      } else {
        this.getAll({
          offset: this.offset,
          random: this.randomisation,
          fulltext: this.fulltext
        })
      }
    },
    changeCategory(category, fulltext='') {
      if (fulltext === '' && category !== this.category) {
        fulltext = this.fulltext
      } else {
        this.fulltext = fulltext
      }
      this.setRandom()
      this.offset = 0
      this.category = category
      if (category === '1') {
        this.getAll({ offset: 0, random: this.randomisation, fulltext: fulltext })
      } else {
        this.getByCategory({category: category, offset: 0, random: this.randomisation, fulltext: fulltext })
      }
    },
    setRandom () {
      this.randomisation = JSON.stringify(Math.floor(Math.random() * 10)+1)
    }
  }
}
</script>

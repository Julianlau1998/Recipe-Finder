<template>
  <div>
    <div class="columns fixed-width is-vcentered is-centered">
      <div class="column is-3 is-vcentered pt-2 pb-0">
        <SearchBar
            v-if="!isSearchHidden"
            v-model="fulltext"
            @input="debounceSearch"
            :fulltextProp="fulltext"
            :clearSearch="clearSearch"
        />
      </div>

      <div class="column is-3 pt-2 pb-0">
        <select
            v-if="!isFilterHidden"
            @change="changeCategory($event)"
            class="select mt-3 mb-3"
            id="select"
            v-model="category"
        >
          <option
              v-for="(category, index) in categories"
              :key="`category-${index}`"
              :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="recipes.length" class="columns is-multiline is-justify-content-center">
        <MiniRecipe
            v-for="(recipe, index) in recipes"
            :key="`miniRecipe-${index}`"
            :recipe="recipe"
        />
    </div>
    <span v-else-if="!recipesModule.recipes.loading" class="mt-6">
      No Recipes Found
    </span>
  </div>
</template>

<script>
import MiniRecipe from "@/components/recipes/MiniRecipe";
import {debounce} from "lodash"
import {mapState} from "vuex"
import SearchBar from "@/components/base/SearchBar"

export default {
  name: "Recipes-component",
  components: {
    MiniRecipe,
    SearchBar
  },
  props: {
    recipes: {
      type: Array,
      required: true,
      default: () => []
    },
    isFilterHidden: {
      required: false,
      type: Boolean,
      default: false
    },
    isSearchHidden: {
      required: false,
      type: Boolean,
      default: false
    },
    categoryProp: {
      required: false,
      type: String,
      default: '1'
    },
    categories: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      category: '1',
      fulltext: ''
    }
  },
  created () {
    this.category = this.categoryProp
  },
  computed: {
    ...mapState(['recipesModule'])
  },
  watch: {
    categories (val) {
      if (val.length > 0) {
        const queries = this.$route.query
        if (queries.category) {
          this.category = this.categories.filter(category => category.title === queries.category)[0].id
          this.$emit('changeCategory', this.category)
        }
        if (queries?.country) {
          this.fulltext = queries.country
          this.category = '1'
          this.$emit('searchCountry', queries.country)
        }
      }
    },
    fulltext (val) {
      if (!val.length) {
        this.$emit('search', '')
      }
    }
  },
  methods: {
    changeCategory () {
      localStorage.setItem('category', JSON.stringify(this.category))
      const category = this.categories.filter(category => category.id === this.category)[0].title
      this.$router.push(`?category=${category}`)
      this.$emit('changeCategory', this.category)
    },

    debounceSearch: debounce(function (e) {
      this.$router.push(`?country=${e}`)
      this.$emit('search', e)
    }, 200),

    clearSearch () {
      this.fulltext=''
      this.$router.push(`?country=`)
      if (this.fulltext.length) {
        this.fulltext=''
      }
    }
  }
}
</script>

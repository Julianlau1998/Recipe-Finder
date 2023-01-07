<template>
  <div>
    <div class="columns fixed-width is-vcentered is-centered">
      <div class="column is-3 is-vcentered pt-2 pb-0">
        <div class="field">
          <div class="control has-icons-right">
            <input
                v-model="fulltext"
                @input="debounceSearch"
                class="input is-success is-secondary"
                type="text"
                placeholder="Search"
            >
            <span class="icon is-small is-right is-allow-click mr-1" @click="clearSearch">
              <i v-if="!fulltext.length" class="fas fa-search"></i>
              <i v-else class="fas fa-eraser"></i>
            </span>
          </div>
        </div>
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
import {mapState} from "vuex";

export default {
  name: "Recipes-component",
  components: {
    MiniRecipe
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
        const savedCategory = this.$route.query
        if (savedCategory?.category) {
          this.category = this.categories.filter(category => category.title === savedCategory.category)[0].id
          this.$emit('changeCategory', this.category)
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
      this.$router.push(`/?category=${category}`)
      this.$emit('changeCategory', this.category)
    },

    debounceSearch: debounce(function (e) {
      this.$emit('search', e.target.value)
    }, 200),

    clearSearch () {
      this.fulltext=''
      if (this.fulltext.length) {
        this.fulltext=''
      }
    }
  }
}
</script>

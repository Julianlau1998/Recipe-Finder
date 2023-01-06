<template>
  <div>
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
      <div class="columns is-multiline is-justify-content-center">
        <MiniRecipe
            v-for="(recipe, index) in recipes"
            :key="`miniRecipe-${index}`"
            :recipe="recipe"
        />
      </div>
  </div>
</template>

<script>
import MiniRecipe from "@/components/recipes/MiniRecipe";

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
      category: '1'
    }
  },
  created () {
    this.category = this.categoryProp
  },
  watch: {
    categories (val) {
      if (val.length > 0) {
        const savedCategory = this.$route.query
        this.category = this.categories.filter(category => category.title === savedCategory.category)[0].id
        this.$emit('changeCategory', this.category)
      }
    }
  },
  methods: {
    changeCategory () {
      localStorage.setItem('category', JSON.stringify(this.category))
      const category = this.categories.filter(category => category.id === this.category)[0].title
      this.$router.push(`/?category=${category}`)
      this.$emit('changeCategory', this.category)
    }
  }
}
</script>

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
  created() {
    this.category = this.categoryProp
  },
  methods: {
    changeCategory () {
      localStorage.setItem('category', JSON.stringify(this.category))
      this.$emit('changeCategory', this.category)
    }
  }
}
</script>

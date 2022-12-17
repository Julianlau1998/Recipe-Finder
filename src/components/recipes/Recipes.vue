<template>
  <div>
    <select v-if="!isFilterHidden" @change="changeCategory($event)" class="select mt-3 mb-3" id="select" v-model="category">
      <option value="Breakfast">Breakfast</option>
      <option value="Dessert">Dessert</option>
      <option value="Vegetarian">Vegetarian</option>
      <option value="Pasta">Pasta</option>
      <option value="Vegan">Vegan</option>
      <option value="Beef">Beef</option>
      <option value="Chicken">Chicken</option>
      <option value="Pork">Pork</option>
      <option value="Lamb">Lamb</option>
      <option value="Goat">Goat</option>
      <option value="Side">Side</option>
      <option value="Seafood">Seafood</option>
      <option value="Side">Side</option>
      <option value="Starter">Starter</option>
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
    }
  },
  data () {
    return {
      category: 'Vegetarian'
    }
  },
  methods: {
    changeCategory () {
      localStorage.setItem('category', JSON.stringify(this.category))
      this.$emit('changeCategory', this.category)
    }
  }
}
</script>

<style scoped>

</style>
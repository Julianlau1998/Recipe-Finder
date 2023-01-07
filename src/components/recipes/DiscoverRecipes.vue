<template>
  <div v-infinite-scroll="loadMore">
    <Recipes
        @changeCategory="changeCategory"
        @search="changeCategory(category, $event)"
        @searchCountry="changeCategory('1', $event)"
        :recipes="recipes"
        :category-prop="category"
        :categories="categories"
    />
    <div v-if="recipesModule.recipes.loading" class="columns is-centered mt-6">
      <div class="column is-half has-text-centered">
        <div class="loader" />
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
    // this.getByCategoryMealDB('Beef')
    //     .then(() => {
    //       this.migrateFromMealDB('744070fb-b130-4674-6f20-1481e5fba200', false, false)
    //     })
    // this.getByCategoryMealDB('Pasta')
    //     .then(() => {
    //       this.migrateFromMealDB('a0245507-5276-4736-6609-255a3860ce0b', false, false)
    //     })
    // this.getByCategoryMealDB('Vegetarian')
    //     .then(() => {
    //       this.migrateFromMealDB('d05a7f75-b21a-4723-4d71-d6767502f1d0', true, false)
    //     })
    // this.getByCategoryMealDB('Vegan')
    //     .then(() => {
    //       this.migrateFromMealDB('fc79b73f-63b8-474c-5f50-81c7fb83b3df', true, true)
    //     })
    // this.getByCategoryMealDB('Dessert')
    //     .then(() => {
    //       this.migrateFromMealDB('e052de13-0b05-40d5-7ea6-9fdefb57d8ed', true, false)
    //     })
    // this.getByCategoryMealDB('Breakfast')
    //     .then(() => {
    //       this.migrateFromMealDB('9cd33c5e-e74e-409a-6646-5d4c3bfad655', false, false)
    //     })
    // this.getByCategoryMealDB('Chicken')
    //     .then(() => {
    //       this.migrateFromMealDB('1183223e-682a-4d8b-6e1c-feacf0dc7e9c', false, false)
    //     })
    // this.getByCategoryMealDB('Pork')
    //     .then(() => {
    //       this.migrateFromMealDB('31ca7fe5-7117-4ec8-725a-a5dad96234fd', false, false)
    //     })
    // this.getByCategoryMealDB('Lamb')
    //     .then(() => {
    //       this.migrateFromMealDB('625595b7-e598-4501-4069-106a3fd2b11e', false, false)
    //     })
    // this.getByCategoryMealDB('Starter')
    //     .then(() => {
    //       this.migrateFromMealDB('2650f7a3-84b5-433a-78bd-b67441894cc7', false, false)
    //     })
    // this.getByCategoryMealDB('Seafood')
    //     .then(() => {
    //       this.migrateFromMealDB('fa21cc6a-33e4-4c39-509c-cc42c7a43728', false, false)
    //     })
    // this.getByCategoryMealDB('Side')
    //     .then(() => {
    //       this.migrateFromMealDB('73aacae5-21ca-4cc6-71da-15568a8cb542', false, false)
    //     })

    this.randomisation = JSON.stringify(Math.floor(Math.random() * 10)+1)
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
      getById: 'recipesModule/getById',
      postRecipe: 'recipesModule/post',
      getAll: 'recipesModule/getAll',
      getByCategory: 'recipesModule/getByCategory',
      getCategories: 'categoriesModule/getAll',
      getByCategoryMealDB: 'recipesModule/getByCategoryMealDB',
      getByIdMealDB: 'recipesModule/getByIdMealDB'
    }),
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return(array)
    },
    loadMore () {
      if (this.recipesModule.recipes.loading || this.recipesModule.recipes.finished) return
      this.offset += 20
      if (this.category !== null && this.category !== undefined && this.category !== '1' ) {
        this.getByCategory({category: this.category, offset: this.offset, random: this.randomisation, fulltext: this.fulltext })
      } else {
        this.getAll({ offset: this.offset, random: this.randomisation, fulltext: this.fulltext })
      }
    },
    changeCategory(category, fulltext='') {
      if (fulltext === '' && category !== this.category) {
        fulltext = this.fulltext
      } else {
        this.fulltext = fulltext
      }
      this.randomisation = JSON.stringify(Math.floor(Math.random() * 10)+1)
      this.offset = 0
      this.category = category
      if (category === '1') {
        this.getAll({ offset: 0, random: this.randomisation, fulltext: fulltext })
      } else {
        this.getByCategory({category: category, offset: 0, random: this.randomisation, fulltext: fulltext })
      }
    },
    migrateFromMealDB (categoryID, is_vegetarian, is_vegan) {
      let fetchedRecipe
      setTimeout(async () => {
        this.recipesModule.mealDBRecipes.data.meals.forEach((smallRecipe) => {
          this.getByIdMealDB(smallRecipe.idMeal)
              .then(() => {
                let recipe = {
                  title: "",
                  description: "",
                  ingredients: [],
                  duration: "",
                  category: "",
                  image: "",
                  country: "",
                  is_vegetarian: is_vegetarian,
                  is_vegan: is_vegan
                }
                fetchedRecipe = this.recipesModule.recipe.data.meals[0]
                recipe.title = fetchedRecipe.strMeal
                recipe.description = fetchedRecipe.strInstructions.replaceAll(/\. /g, '.\n')
                recipe.duration = "0"
                recipe.category = categoryID
                recipe.image = fetchedRecipe.strMealThumb
                recipe.country = fetchedRecipe.strArea
                for (let i = 1; i < 21; i++) {
                  if (fetchedRecipe[`strIngredient${i}`]) {
                    recipe.ingredients.push({
                      "ingredient": fetchedRecipe[`strIngredient${i}`],
                      "measurement": fetchedRecipe[`strMeasure${i}`]
                    })
                  }
                }
                this.allFetchedRecipes.push(recipe)
                this.postRecipe(recipe)

              })
          console.log(this.allFetchedRecipes)
        })
      }, 2000 )
    }
  }
}
</script>

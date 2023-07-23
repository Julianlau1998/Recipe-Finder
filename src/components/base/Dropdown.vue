<template>
  <div>
    <select
        class="select mt-3 mb-3"
        id="select"
        v-model="value"
        @input="$emit('input', value)"
        @change="$emit('change', $event)"
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
</template>

<script>
export default {
  name: "Dropdown-component",
  props: {
    valueProp: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      value: ''
    }
  },
  watch: {
    valueProp(val) {
      this.value = val
    }
  },
  created () {
    this.value = this.valueProp
  }
}
</script>

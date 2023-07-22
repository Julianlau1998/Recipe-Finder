<template>
  <select
      class="select mt-3 mb-3"
      id="select"
      :value="value"
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
</template>

<script>
export default {
  name: "Dropdown-component",
  props: {
    value: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="SearchBar">
    <div class="control has-icons-right">
      <input
          :value="value"
          @input="$emit('input', $event.target.value)"
          class="input is-secondary"
          type="text"
          placeholder="Search"
      >
      <span class="icon is-small is-right is-allow-click mr-1" @click="clear">
        <i v-if="!value.length" class="fas fa-search"></i>
        <i v-else class="fas fa-eraser"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default  {
  name: "SearchBar",
  props: {
    clearSearch: {
      type: Function,
      required: true
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    clear () {
      this.value = ''
      this.clearSearch()
    }
  }
}
</script>

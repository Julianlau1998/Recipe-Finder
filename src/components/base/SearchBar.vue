<template>
  <div class="SearchBar">
    <div class="control has-icons-right">
      <input
          v-model="fulltext"
          @input="$emit('input', fulltext)"
          class="input is-success is-secondary"
          type="text"
          placeholder="Search"
      >
      <span class="icon is-small is-right is-allow-click mr-1" @click="clear">
        <i v-if="!fulltext.length" class="fas fa-search"></i>
        <i v-else class="fas fa-eraser"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    clearSearch: {
      type: Function,
      required: true
    },
    fulltextProp: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      fulltext: ''
    }
  },
  created () {
    this.fulltext = this.fulltextProp
  },
  watch: {
    fulltextProp (val) {
      this.fulltext = val
    }
  },
  methods: {
    clear () {
      this.fulltext = ''
      this.clearSearch()
    }
  }
}
</script>

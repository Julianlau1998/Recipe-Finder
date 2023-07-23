<template>
  <span>
    <div>
      <span
          class="is-pointer is-nav-element mr-1"
          :class="page===0 ? 'is-current-page' : ''"
          @click="$emit('changePage', 0)"
          tabindex="1"
          @keydown.enter="$emit('changePage', 0)"
      >
        Random
      </span>
      <span
          class="is-pointer is-nav-element ml-1"
          :class="page===1 ? 'is-current-page' : ''"
          @click="$emit('changePage', 1)"
          tabindex="2"
          @keydown.enter="$emit('changePage', 1)"
      >
          Discover
      </span>
    </div>
    <hr class="hr">
  </span>
</template>

<script>
export default {
  name: "PageSelector",
  props: {
    page: {
      type: Number,
      required: true
    }
  }
}
</script>

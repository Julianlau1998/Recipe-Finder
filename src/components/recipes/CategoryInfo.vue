<template>
  <p class="is-fourth is-pointer" :class="!shareAvailable ? 'mb-3' : ''">
      <span @click="openCategory" tabindex="1" @keydown.enter="openCategory">
        {{ category }}
      </span>
    &nbsp;
    <span
        v-if="country !== 'Unknown'"
        @click="openCountry"
        class="mb-3 is-third is-pointer"
        tabindex="1"
        @keydown.enter="openCountry"
    >
      {{ country }}
    </span>
  </p>
</template>

<script>
export default {
  name: "CategoryInfo",
  props: {
    shareAvailable: {
      type: Boolean,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    openCategory: {
      type: Function,
      required: true
    },
    openCountry: {
      type: Function,
      required: true
    }
  }
}
</script>

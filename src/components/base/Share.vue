<template>
  <img
      @click="$emit('share')"
      class="is-share-icon"
      src="../../../public/img/share.png"
      alt="share"
  />
</template>

<script>
export default {
  name: "Share-component"
}
</script>

<template>
  <div id="app">
    <topNav />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import topNav from '@/components/TopNav/TopNav'
  export default {
    components: {
      topNav
    },
    data () {
      return {
        iOS: false
      }
    },
    created() {
      this.iOS = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      this.$store.state.iOS = this.iOS
    }
  }
</script>

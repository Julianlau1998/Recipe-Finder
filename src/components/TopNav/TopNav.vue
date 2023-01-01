<template>
    <div class="is-topnav has-text-left p-3 pb-4 pt-4">
        <div class="columns is-mobile">
            <div class="column pl-5 is-pointer">
                <span @click="home">
                    Recipe Finder
                </span>
            </div>
            <div class="column settingsWrapper">
                <div v-if="settings" class="settingsItems settings">
                    <span v-if="helpAvailable">
                        <span @click="openFavorites" class="is-icon-container is-pointer mt-6 setting noselect">
                            <i class="fas fa-star is-smallIcon pr-1" />
                            Favorites
                        </span>
                    </span>
                </div>
                <i
                    class="fas fa-bars settings-icon is-pointer"
                    @click="settings=!settings"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopNav',
    props: {
        helpAvailable: {
            required: false,
            default: true
        }
    },
    data () {
        return {
            settings: false,
            shareAvailable: false,
            playBillingSupported: false
        }
    },
    created () {
        if(navigator.share !== undefined) {
            this.shareAvailable = true
        }
    },
    methods: {
      openFavorites () {
          this.settings = false
          this.$router.push('/favorites')
        },
        home () {
            if (this.$route.path === '/') return
            this.$router.push('/')
        }
    }
}
</script>

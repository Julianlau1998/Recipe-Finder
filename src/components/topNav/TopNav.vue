<template>
    <div class="is-topnav has-text-left p-3 pb-4 pt-4">
        <div class="columns is-mobile">
            <div class="column pl-5 is-pointer">
                <span @click="openHome" tabindex="1" @keydown.enter="openHome">
                    Recipe Finder
                </span>
            </div>
            <div class="column settingsWrapper">
                <div v-if="settings" class="settingsItems settings">
                    <span>
                        <span
                            @click="openFavorites"
                            class="is-icon-container is-pointer mt-6 setting noselect"
                            tabindex="2"  @keydown.enter="openFavorites"
                        >
                            <i class="fas fa-star is-smallIcon pr-1" />
                            Favorites
                        </span>
                    </span>
                </div>
                <i
                    class="fas fa-bars settings-icon is-pointer"
                    @click="settings=!settings"
                    tabindex="1" @keydown.enter="settings=!settings"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopNav',
    data () {
        return {
            settings: false,
        }
    },
    methods: {
        openFavorites () {
          this.settings = false
          this.$router.push('/favorites')
        },
        openHome () {
            if (this.$route.path === '/') return
            this.$router.push('/')
        }
    }
}
</script>

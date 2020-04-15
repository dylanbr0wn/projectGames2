<template>
    <div id="app">
        <v-app :style="{background: $vuetify.theme.themes[isDark].background}">

            <v-navigation-drawer absolute app dark expand-on-hover permanent v-model="drawer">
                <v-list subheader two-line>
                    <v-list-item @click="drawer = false" to='/'>
                        <v-list-item-action>
                            <v-icon>home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                            <v-list-item-subtitle> Its comfortable here</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="drawer = false" to='/games'>
                        <v-list-item-action>
                            <v-icon>games</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Games</v-list-item-title>
                            <v-list-item-subtitle>Go find some games!</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="drawer = false">
                        <v-list-item-action>
                            <v-icon>person</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Account</v-list-item-title>
                            <v-list-item-subtitle>You, yourself, and thi</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" block dark
                               ripple v-if="!$vuetify.theme.dark">
                            <v-icon>brightness_3</v-icon>
                            Join the Dark Side
                        </v-btn>
                        <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" block light
                               ripple v-if="$vuetify.theme.dark">
                            <v-icon>brightness_5</v-icon>
                            Return to the Light
                        </v-btn>
                    </div>
                </template>

            </v-navigation-drawer>
            <v-content>
                <v-container fluid fill-height>
                    <v-fade-transition mode="out-in">
                        <router-view></router-view>
                    </v-fade-transition>
                </v-container>
            </v-content>
            <v-footer
                    absolute
                    app
                    dark
                    padless
            >
                <v-card
                        class=" flex text-center"
                        flat
                        tile
                >
                    <v-card-text>
                        <v-btn
                                :href="social.link"
                                :key="social.icon"
                                class="mx-4 white--text"
                                icon
                                v-for="social in socials"
                        >
                            <v-icon size="24px">{{ social.icon }}</v-icon>
                        </v-btn>
                        <v-divider
                                class="mx-4"
                                dark
                                vertical
                        ></v-divider>
                        <span class="subheading">Made by Dylan Brown using IGDB</span>
                    </v-card-text>

                </v-card>

            </v-footer>

        </v-app>

    </div>

</template>

<script>
    import Games from './components/GameList.vue';


    // const fb = require('@/firebaseConfig');


    export default {
        name: 'app',
        components: {
            Games,
        },
        watch: {},
        data: () => ({
            drawer: false,
            goDark: false,
            socials: [
                {
                    icon: "fab fa-facebook",
                    link: "https://www.facebook.com/dylan.brown.140"
                },
                {
                    icon: "fab fa-instagram",
                    link: "https://www.instagram.com/dylansnothome/"
                },
                {
                    icon: "fab fa-github",
                    link: "https://github.com/dylanbr0wn"
                }
            ],

        }),
        computed: {
            isDark() {
                return (this.$vuetify.theme.dark) ? 'dark' : 'light'
            }
        },
        methods: {
            // async searchGames() {
            //     if (this.query && this.query !== this.lastquery) {
            //         this.lastquery = this.query;
            //         const response = await GamesService.searchGame(this.query);
            //         this.games = response.data;
            //     } else if (!this.query && this.query !== this.lastquery) {
            //         this.lastquery = this.query;
            //         this.getGames();
            //     }
            //     this.$router.push({name: 'games'});
            // },
        },
    };
</script>

<style>
    .title-bar {
        width: 100%;

    }

    .vr {
        display: inline;
        height: 100%;
        width: 1px;
        border: 1px inset;
        margin: 5px
    }

</style>

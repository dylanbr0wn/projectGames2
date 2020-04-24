<template>
    <v-container>
        <v-row style="width:100%">
            <v-col
                    cols="12"
                    sm="8"
                    md="8"
                    lg="8"
            >
                <v-skeleton-loader
                        v-if="!isLoaded"
                        class="mx-auto"
                        type="card"
                        height="200"
                ></v-skeleton-loader>
                <v-card
                        v-if="isLoaded"
                        height="200"
                        hover
                        color="white"

                >


                    <v-img
                            height="200"
                            :src="coverURL"
                            :alt="game.name"
                    >
                        <v-row align="center" class="bottom-gradient white--text pa-2 fill-height">
                            <v-col>
                                <div class="display-3 text-uppercase font-weight-regular card-title text-center">
                                    {{game.name}}
                                </div>
                            </v-col>
                        </v-row>

                    </v-img>

                </v-card>
                <v-skeleton-loader
                        v-if="!isLoaded"
                        class="mx-auto mt-10"
                        type="actions,card-heading, list-item-two-line, list-item-two-line, list-item,article, article"
                        height="550"
                ></v-skeleton-loader>
                <v-card
                        v-if="isLoaded"
                        height="550"
                        class="mt-10"
                        hover
                >

                    <v-tabs
                            v-model="tab"
                            grow
                            dark
                            show-arrows
                            class="white--text"
                    >
                        <v-tab>Details</v-tab>
                        <v-tab>Images</v-tab>
                        <v-tab>Related Games</v-tab>


                    </v-tabs>
                    <v-tabs-items v-model="tab"

                    >
                        <v-tab-item>
                            <v-card flat style="height: 100%">
                                <v-card-subtitle v-if="game.genres.length !== 0" class="subtitle-1 py-1 ml-5 mt-4">
                                    Genre: <span class="body-2">{{game.genres.join(', ')}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>
                                <v-card-subtitle v-if="getGameModes !== ''" class="subtitle-1 py-1 ml-5">Game Modes:
                                    <span class="body-2">{{getGameModes}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>
                                <v-card-subtitle v-if="getPlatforms !== ''" class="subtitle-1 py-1 ml-5">Platforms:
                                    <span class="body-2">{{getPlatforms}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>
                                <v-card-subtitle v-if="getDeveloper !== ''" class="subtitle-1 py-1 ml-5">Developer:
                                    <span class="body-2">{{getDeveloper}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>
                                <v-card-subtitle v-if="getPublisher !== ''" class="subtitle-1 py-1 ml-5">Publisher:
                                    <span class="body-2">{{getPublisher}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>
                                <v-card-subtitle v-if="getPorter !== ''" class="subtitle-1 py-1 ml-5">Porting: <span
                                        class="body-2">{{getPorter}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>
                                <v-card-subtitle v-if="getSupporting !== ''" class="subtitle-1 py-1 ml-5">Supporting:
                                    <span class="body-2">{{getSupporting}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>

                                <v-card-subtitle v-if="game.summary !== ''" class="subtitle-1 py-1 ml-5">Summary:
                                </v-card-subtitle>
                                <div style="height: 200px; overflow:scroll;" class=" body-2 pt-1 px-9 pb-5">
                                    {{game.summary}}
                                </div>
                            </v-card>

                        </v-tab-item>
                        <v-tab-item>
                            <v-container fluid>
                                <v-row class="pa-5"
                                       style="height: 470px; overflow: scroll"

                                >
                                    <v-col


                                            v-for="i in getImages.length"
                                            :key="i"
                                            cols="12"
                                            md="4"
                                    >
                                        <v-dialog
                                                width="700"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-img
                                                        :src="getImages[i-1]"
                                                        :alt="'artwork-'+ i"
                                                        max-height="110"
                                                        v-on="on"
                                                >
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                                class="fill-height ma-0"
                                                                align="center"
                                                                justify="center"
                                                        >
                                                            <v-progress-circular indeterminate
                                                                                 color="grey lighten-5"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                            </template>
                                            <v-img
                                                    :src="getImages[i-1]"
                                                    :alt="'artwork-'+ i"
                                                    contain
                                                    width="700"
                                                    align="center"
                                                    justify="center"
                                            >
                                                <template v-slot:placeholder>
                                                    <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                    >
                                                        <v-progress-circular indeterminate
                                                                             color="grey lighten-5"></v-progress-circular>
                                                    </v-row>
                                                </template>


                                            </v-img>

                                        </v-dialog>

                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item>
                            <v-container fluid>
                                <v-row class="pa-5"
                                       style="height: 470px; overflow: scroll"

                                >
                                    <v-col


                                            v-for="i in relatedGames.length"
                                            :key="i"
                                            cols="12"
                                            md="4"
                                    >
                                        <v-skeleton-loader
                                                v-if="!relatedLoaded"
                                                type="card"
                                                height="150"
                                        ></v-skeleton-loader>
                                        <v-hover v-slot:default="{ hover }"
                                                 v-if="relatedLoaded"

                                        >

                                            <v-card

                                                    height="150"
                                                    @click.native="$emit('goToDetail',relatedGames[i-1].id)"
                                                    :hover="hover"
                                                    ripple
                                                    color="white"

                                            >

                                                <v-img
                                                        height="110"
                                                        :src="relatedGames[i-1].coverURL"
                                                        :alt="relatedGames[i-1].name"
                                                >
                                                    <v-fade-transition>
                                                        <div
                                                                v-if="hover"
                                                                class="d-flex transition-fast-in-fast-out"
                                                                style="height: 100%; background-color: rgba(0,0,0,0.6)"
                                                        >
                                                            <v-btn
                                                                    style="opacity: 100% !important;"
                                                                    class="mx-auto my-auto"
                                                            >

                                                                Details
                                                            </v-btn>
                                                        </div>
                                                    </v-fade-transition>

                                                </v-img>
                                                <v-card-title
                                                        class="mt-0 py-2  display-block subtitle-2 font-weight-light">
                                                <span class="text-truncate d-inline-block"
                                                >
                                                   {{relatedGames[i-1].name}}
                                                </span>


                                                </v-card-title>
                                            </v-card>
                                        </v-hover>
                                    </v-col>
                                </v-row>
                            </v-container>

                        </v-tab-item>

                    </v-tabs-items>

                </v-card>

            </v-col>
            <v-col
                    sm="4"
                    md="4"
                    lg="4"
            >
                <v-card
                        height="550"
                        hover
                >
                    asdasd
                </v-card>
                <v-card
                        height="200"
                        class="mt-10"
                        hover
                >

                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {


    name: 'GameDetails',
    props: {
        game: Object,
        companies: Array,
        coverURL: String,
        relatedGames: Array,
        isLoaded: Boolean,
        relatedLoaded: Boolean
    },
    data() {
        return {
            tab: null,
            dialog: null
        };
    },
    methods: {},
    computed: {
        getDeveloper() {
            return this.companies.filter(comp => comp.developer === true).map(dev => dev.company).join(', ')
        },
        getPublisher() {
            return this.companies.filter(comp => comp.publisher === true).map(dev => dev.company).join(', ')
        },
        getPorter() {
            return this.companies.filter(comp => comp.porting === true).map(dev => dev.company).join(', ')
        },
        getSupporting() {
            return this.companies.filter(comp => comp.supporting === true).map(dev => dev.company).join(', ')
        },
        getGameModes() {
            return this.game.game_modes.map(mode => mode.name).join(', ')
        },
        getPlatforms() {
            return this.game.platforms.map(plat => plat.name).join(', ')
        },
        getImages() {
            let images = this.game.artworks.slice()
            if (this.coverURL !== '') {
                images.push(this.coverURL)
            }
            return images
        },

    },
    created() {
    }
};
</script>

<style scoped>
    .bottom-gradient {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent);
    }

    .card-title {
        letter-spacing: 5px;
    }
</style>

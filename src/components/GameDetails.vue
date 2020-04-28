<template>
    <v-container>
        <v-row style="width:100%;">
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
                        color="white"

                >


                    <v-img
                            height="200"
                            :src="getCoverURL"
                            :alt="game.name"
                            :lazy-src="getLazyCoverURL"
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
                <v-card height="550"
                        class="mx-auto mt-10"
                        v-if="!isLoaded"
                >
                    <v-skeleton-loader


                            type="actions,card-heading, list-item-two-line, list-item,article, article"

                    ></v-skeleton-loader>
                </v-card>

                <v-card
                        v-if="isLoaded"
                        height="550"
                        class="mt-10"
                >

                    <v-tabs
                            v-model="tab"
                            grow

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
                                <v-card-subtitle v-if="getGenres !== ''" class="subtitle-1 py-1 ml-5 mt-4">
                                    Genre: <span class="body-2">{{getGenres}}</span>
                                    <v-divider></v-divider>
                                </v-card-subtitle>
                                <v-card-subtitle v-if="getThemes !== ''" class="subtitle-1 py-1 ml-5 ml-5">
                                    Themes: <span class="body-2">{{getThemes}}</span>
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
                                                max-width="700"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-img
                                                        :src="getThumbImages[i-1]"
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
                                                    max-width="1000"
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


                                            v-for="i in game.similar_games.length"
                                            :key="i"
                                            cols="12"
                                            md="4"
                                    >
                                        <v-skeleton-loader
                                                v-if="!isLoaded"
                                                type="card"
                                                height="150"
                                        ></v-skeleton-loader>
                                        <v-hover v-slot:default="{ hover }"
                                                 v-if="isLoaded"

                                        >

                                            <v-card

                                                    height="150"
                                                    @click.native="$emit('goToDetail',game.similar_games[i-1].id)"
                                                    :hover="hover"
                                                    ripple
                                                    color="white"

                                            >

                                                <v-img
                                                        height="110"
                                                        :src="getRelatedCover(game.similar_games[i-1])"
                                                        :alt="game.similar_games[i-1].name"
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
                                                   {{game.similar_games[i-1].name}}
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
                <v-card height="550"
                        v-if="!isLoaded"
                >
                    <v-skeleton-loader

                            type="card-heading,list-item-avatar-two-line, list-item-three-line, divider, card-heading,list-item ,list-item-two-line,list-item-two-line,list-item-two-line"

                    ></v-skeleton-loader>
                </v-card>


                <v-expansion-panels
                        v-if="isLoaded"
                        accordion
                        mandatory

                        style="max-height: 700px"

                >
                    <v-expansion-panel

                    >
                        <v-expansion-panel-header>Reviews</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex align-content-center display-2 justify-center"
                                 v-if="'aggregated_rating' in game"
                            >{{game.aggregated_rating}}%
                            </div>
                            <div class="d-flex align-content-center title justify-center"
                                 v-if="!('aggregated_rating' in game)"

                            >No review data available.
                            </div>
                            <div class="d-flex align-content-center justify-center"
                                 v-if="'aggregated_rating' in game"
                                 style=""
                            >


                                <v-rating

                                        :value="game.aggregated_rating/20"
                                        readonly
                                        large

                                ></v-rating>
                            </div>
                            <div class="d-flex align-content-center justify-center"
                                 v-if="'aggregated_rating' in game"
                            >Average from {{game.aggregated_rating_count}} reviews
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel


                    >
                        <v-expansion-panel-header>Age Rating</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex align-content-center title justify-center"
                                 v-if="getRatingImage === ''"

                            >No rating data available.
                            </div>
                            <div class="d-flex pa-2" v-if="getRatingImage !== ''">

                                <v-img :src="getRatingImage"

                                       height="80"
                                       contain
                                       width="100"
                                       class="ml-5"
                                >
                                </v-img>
                                <div class="d-flex align-content-center body-2 justify-center ml-2 px-3">
                                    {{getAgeRating}}
                                </div>

                            </div>
                            <div v-if="getRatingImage !== ''" class="d-flex px-7 body-2 mt-2"
                                 style="overflow: scroll; max-height: 200px">
                                {{getRatingSynopsis}}
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel


                    >
                        <v-expansion-panel-header>Creator Details</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex align-content-center title justify-center"
                                 v-if="!('involved_companies' in this.game)"

                            >No creator data available.
                            </div>

                            <div class="d-flex pa-2" v-if="'involved_companies' in this.game">
                                <v-list three-line subheader disabled>
                                    <v-list-item v-if="getDeveloper !== ''">
                                        <v-list-item-content>
                                            <v-list-item-title>Developer:</v-list-item-title>
                                            <v-list-item-subtitle>{{getDeveloper}}</v-list-item-subtitle>
                                        </v-list-item-content>

                                    </v-list-item>
                                    <v-divider v-if="getPublisher !== ''"></v-divider>
                                    <v-list-item v-if="getPublisher !== ''">
                                        <v-list-item-content>
                                            <v-list-item-title>Publisher:</v-list-item-title>
                                            <v-list-item-subtitle>{{getPublisher}}</v-list-item-subtitle>
                                        </v-list-item-content>

                                    </v-list-item>
                                    <v-divider v-if="getPorter !== ''"></v-divider>
                                    <v-list-item v-if="getPorter !== ''">
                                        <v-list-item-content>
                                            <v-list-item-title>Porting:</v-list-item-title>
                                            <v-list-item-subtitle>{{getPorter}}</v-list-item-subtitle>
                                        </v-list-item-content>

                                    </v-list-item>
                                    <v-divider v-if="getSupporting !== ''"></v-divider>
                                    <v-list-item v-if="getSupporting !== ''">
                                        <v-list-item-content>
                                            <v-list-item-title>Supporting:</v-list-item-title>
                                            <v-list-item-subtitle>{{getSupporting}}</v-list-item-subtitle>
                                        </v-list-item-content>

                                    </v-list-item>

                                </v-list>
                            </div>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {


    name: 'GameDetails',
    props: {
        game: Object,
        isLoaded: Boolean,
    },
    data() {
        return {
            tab: null,
            dialog: null,
            age_ratings: {
                6: require('@/assets/ESRB-ver2013_RP.png'),
                7: require('@/assets/ESRB-ver2013_eC.png'),
                8: require('@/assets/ESRB-ver2013_E.png'),
                9: require('@/assets/ESRB-ver2013_E10-Plus.png'),
                10: require('@/assets/ESRB-ver2013_T.png'),
                11: require('@/assets/ESRB-ver2013_M.png'),
                12: require('@/assets/ESRB-ver2013_Ao.png')
            }
        };
    },
    methods: {
        getRelatedCover(game) {
            if ("cover" in game) {
                return `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${game.cover.image_id}.jpg`
            } else {
                return ''
            }
        }


    },
    computed: {
        getDeveloper() {
            if ("involved_companies" in this.game) {
                return this.game.involved_companies.filter(comp => comp.developer === true).map(dev => dev.company.name).join(', ')
            } else {
                return ''
            }
        },
        getPublisher() {
            if ("involved_companies" in this.game) {

                return this.game.involved_companies.filter(comp => comp.publisher === true).map(dev => dev.company.name).join(', ')
            } else {
                return ''
            }

        },
        getPorter() {
            if ("involved_companies" in this.game) {
                return this.game.involved_companies.filter(comp => comp.porting === true).map(dev => dev.company.name).join(', ')
            } else {
                return ''
            }
        },
        getSupporting() {
            if ("involved_companies" in this.game) {
                return this.game.involved_companies.filter(comp => comp.supporting === true).map(comp => comp.company.name).join(', ')
            } else {
                return ''
            }
        },
        getGameModes() {
            if ("game_modes" in this.game) {
                return this.game.game_modes.map(mode => mode.name).join(', ')
            } else {
                return ''
            }
        },
        getThemes() {
            if ("themes" in this.game) {
                return this.game.themes.map(theme => theme.name).join(', ')
            } else {
                return ''
            }
        },
        getPlatforms() {
            if ("platforms" in this.game) {
                return this.game.platforms.map(plat => plat.name).join(', ')
            } else {
                return ''
            }
        },
        getImages() {
            let images = []
            if (this.getCoverURL !== '') {
                images.push(this.getCoverURL)
            }
            if ("artworks" in this.game) {
                let artworks = this.game.artworks.map(art => `https://images.igdb.com/igdb/image/upload/t_1080p/${art.image_id}.jpg`).slice()
                images = images.concat(artworks)

            }
            return images

        },
        getThumbImages() {
            let images = []
            if (this.getCoverURL !== '') {
                images.push(this.getCoverURL)
            }
            if ("artworks" in this.game) {
                let artworks = this.game.artworks.map(art => `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${art.image_id}.jpg`).slice()
                images = images.concat(artworks)

            }
            return images
        },
        getAgeRating() {
            if ("age_ratings" in this.game) {
                if ("content_descriptions" in this.game.age_ratings[0]) {
                    return this.game.age_ratings[0].content_descriptions.map(desc => desc.description).join(', ')
                } else {
                    return "Content descriptions unavailable."
                }
            } else {
                return ''
            }
        },
        getCoverURL() {
            if ("cover" in this.game) {
                return `https://images.igdb.com/igdb/image/upload/t_1080p/${this.game.cover.image_id}.jpg`
            } else {
                return ''
            }
        },
        getLazyCoverURL() {
            if ("cover" in this.game) {
                return `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${this.game.cover.image_id}.jpg`
            } else {
                return ''
            }
        },
        getGenres() {
            if ("genres" in this.game) {
                return this.game.genres.map(genre => genre.name).join(', ')
            } else {
                return ''
            }
        },
        getRatingSynopsis() {
            if ("age_ratings" in this.game) {
                if ("synopsis" in this.game.age_ratings[0]) {
                    return this.game.age_ratings[0].synopsis
                } else {
                    return "No rating synposis available."
                }
            } else {
                return "No rating synposis available."
            }

        },
        getRatingImage() {
            if ("age_ratings" in this.game) {
                if ("rating" in this.game.age_ratings[0]) {
                    return this.age_ratings[this.game.age_ratings[0].rating]
                } else {
                    return ''
                }
            } else {
                return ""
            }

        },


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

    .back-black {
        background-color: black;
        color: white;
    }
</style>

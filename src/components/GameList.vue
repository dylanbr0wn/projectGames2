<template>
        <v-container>

            <v-data-iterator
                    class="iteratorTrans"
                    :items="games"
                    :items-per-page.sync="itemsPerPage"
                    hide-default-footer
                    :page="page"

            >
                <template v-slot:header>
                    <v-toolbar
                            :light="!$vuetify.theme.dark"
                            :dark="$vuetify.theme.dark"
                            class="mb-1"
                    >
                        <v-text-field
                                @keydown.enter="$emit('searchGames',search)"
                                class="textsearchbox"
                                prepend-icon="search"
                                hide-details
                                autofocus
                                label="Search a game"
                                :disabled="!isLoaded"
                                v-model="search"

                        ></v-text-field>
                        <v-spacer>
                        </v-spacer>
                        <span
                                class="mr-4
                                grey--text"
                        >
                            Page {{ page }}
                            </span>
                        <v-btn
                                large
                                depressed
                                dark
                                color="black darken-3"
                                class="mr-1"
                                @click="$emit('formerPage')"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                                large
                                depressed
                                dark
                                color="black darken-3"
                                class="ml-1"
                                @click="$emit('nextPage')"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-toolbar>
                </template>

                <template v-slot:no-data>

                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                                lg="4"
                                v-for="index in itemsPerPage"
                                :key="index"
                        >
                            <v-skeleton-loader
                                    class="mx-auto"
                                    type="card"
                                    height="200"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </template>

                <template v-slot:default="props">
                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                md="4"
                                lg="4"
                                v-for="game in props.items"
                                :key="game.id"
                        >
                            <v-hover v-slot:default="{ hover }">
                                <v-card
                                        height="200"
                                        @click.native="$emit('goToDetail',game.id)"
                                        :hover="hover"
                                        ripple
                                        color="white"

                                >

                                    <v-img
                                            height="140"
                                            :src="getCoverURL(game)"
                                            :alt="game.name"
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
                                    <v-card-title class="mt-0 display-block title font-weight-light">
                                    <span class="text-truncate d-inline-block"
                                          style="max-width: 80%;"
                                    >
                                       {{game.name}}
                                    </span>

                                        <v-spacer></v-spacer>
                                        <v-btn

                                                top
                                                right
                                                small
                                                :color="getRatingColor(game.aggregated_rating)"
                                                v-if="'aggregated_rating' in game"
                                        >
                                            <div class="white--text subtitle-2">{{game.aggregated_rating }}%</div>
                                        </v-btn>
                                    </v-card-title>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </template>


            </v-data-iterator>

        </v-container>
</template>

<script>
export default {
    name: 'GamesList',
    props: {
        games: {
            type: Array,
            default: []
        },
        itemsPerPage: Number,
        page: Number,
        numberOfPages: Number,
        isLoaded: Boolean
    },
    data: () => ({
        itemsPerPageArray: [4, 8, 12],
        search: '',
        genres: [
            {
                "id": 13,
                "name": "Simulator",
                "color": "teal"
            },
            {
                "id": 24,
                "name": "Tactical",
                "color": "deep-purple"
            },
            {
                "id": 26,
                "name": "Quiz/Trivia",
                "color": "orange"
            },
            {
                "id": 4,
                "name": "Fighting",
                "color": "amber"
            },
            {
                "id": 15,
                "name": "Strategy",
                "color": "cyan"
            },
            {
                "id": 31,
                "name": "Adventure",
                "color": "indigo"
            },
            {
                "id": 12,
                "name": "Role-playing (RPG)",
                "color": "pink"
            },
            {
                "id": 5,
                "name": "Shooter",
                "color": "red"
            },
            {
                "id": 7,
                "name": "Music",
                "color": "purple"
            },
            {
                "id": 32,
                "name": "Indie",
                "color": "blue-grey"
            }
        ]
    }),
    methods: {
        // getRandomInt() {
        //     return Math.floor(Math.random() * Math.floor(this.colorPallet.length));
        // },
        getItemColor(game) {
            if ("genres" in game) {
                for (const x of this.genres) {
                    for (const y of game.genres) {
                        if (x.id === y) {
                            return x.color
                        }
                    }

                }
            }
            return "white"
        },
        isItemDark(game) {
            return this.getItemColor(game) !== "white"
        },
        getRatingColor(rating) {
            if (90 < rating && rating <= 100) {
                return "#673ab7"
            } else if (75 < rating && rating <= 90) {
                return "#43a047"
            } else if (50 < rating && rating <= 75) {
                return "#ff9800"
            } else {
                return "#d50000"
            }

        },
        getCoverURL(game) {
            if ("cover" in game) {
                return `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${game.cover.image_id}.jpg`
            } else {
                return ''
            }
        },
    }
};
</script>

<style scoped>

    .alert {
        background: #fdf2ce;
        font-weight: bold;
        display: inline-block;
        padding: 5px;
        margin-top: -20px;
    }

    .v-card__text, .v-card__title {
        word-break: normal; /* maybe !important  */
    }

    .iteratorTrans {
        transition: all 0.5s;
        height: 100%;
    }

</style>

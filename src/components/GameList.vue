<template>
        <v-container>

            <v-data-iterator
                    class="iteratorTrans"
                    :items="games"
                    :items-per-page.sync="itemsPerPage"
                    hide-default-footer
                    :page="page"
            >

                <template v-slot:no-data>

                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                lg="6"
                                v-for="index in itemsPerPage"
                                :key="index"
                        >
                            <v-skeleton-loader
                                    class="mx-auto"
                                    type="article"
                                    height="150"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </template>

                <template v-slot:default="props">
                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                lg="6"
                                v-for="game in props.items"
                                :key="game.id"
                        >


                            <v-card
                                    height="150"
                                    @click.native="$emit('goToDetail',game.id)"
                                    hover
                                    ripple
                                    :color="getItemColor(game)"
                                    :dark="isItemDark(game)"
                                    :light="!isItemDark(game)"

                            >
                                        <span>
                                            <v-card-title class=" ">
                                                {{game.name}}
                                                <v-spacer></v-spacer>
                                                <v-rating
                                                        readonly
                                                        :value="game.aggregated_rating/20"
                                                        small
                                                        half-increments
                                                        :color="getRatingColor(game)"
                                                        v-if="'aggregated_rating' in game"
                                                ></v-rating>
                                            </v-card-title>

                                        </span>

                                <v-divider></v-divider>
                                <v-card-text class="text-truncate ">
                                    {{game.summary}}
                                </v-card-text>
                            </v-card>


                        </v-col>
                    </v-row>
                </template>
                <template v-slot:footer>
                    <v-row class="mt-2" align="center" justify="center">
                        <v-spacer></v-spacer>

                        <span
                                class="mr-4
                                grey--text"
                        >
                            Page {{ page }}
                            </span>
                        <v-btn
                                fab
                                dark
                                color="black darken-3"
                                class="mr-1"
                                @click="$emit('formerPage')"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                                fab
                                dark
                                color="black darken-3"
                                class="ml-1"
                                @click="$emit('nextPage')"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
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
        getRatingColor(game) {
            if (this.getItemColor(game) !== "white") {
                return "black"
            } else {
                return "white"
            }
        }
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
    }

</style>

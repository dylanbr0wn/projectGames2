<template>
    <v-container fill-height>
        <vue-headful title="Project Games - Games"/>


        <template>
            <v-fade-transition mode="out-in">
                <GameList
                        style="height: 100%"
                        class="align-self-start mt-10 "
                        :isLoaded=isLoaded
                        :games=games
                        :itemsPerPage=itemsPerPage
                        :page=page
                        v-on:searchGames="searchGames"
                        v-on:goToDetail="goToDetail"
                        v-on:updateItemsPerPage="updateItemsPerPage"
                        v-on:formerPage="formerPage"
                        v-on:nextPage="nextPage"

                />
            </v-fade-transition>

        </template>

    </v-container>
</template>

<script>
// @ is an alias to /src
import GameList from '@/components/GameList.vue';
import GamesService from '@/services/GamesService';

export default {
    name: 'Games',
    components: {
        GameList,
    },
    props: {
        query: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        lastQuery: '',
        games: [],
        search: '',
        gamesTemp: [],
        isLoaded: false,
        itemsPerPage: 9,
        itemsPerPageArray: [4, 8, 12],
        page: 1,
    }),
    created() {
        if (this.query.length !== 0) {
            this.searchGames(this.query)
        } else {
            this.getGames(this.page, this.itemsPerPage);
        }

    },
    methods: {
        getGames(page, itemsPerPage) {
            this.isLoaded = false;
            this.games = [];
            this.gamesTemp = [];
            GamesService.fetchSomeGames(page, itemsPerPage)
                .then(res => {
                    this.gamesTemp = res.data;
                    this.parseGames();
                }).catch(function (error) {
                console.log(error);
            });

        },
        searchGames(query) {
            this.query = query;
            if (query.length === 0) {
                this.page = 1
                this.getGames(this.page, this.itemsPerPage)
            } else {
                if (this.query !== this.lastQuery) {
                    this.lastQuery = this.query;
                    this.page = 1;
                }
                this.isLoaded = false;
                this.games = [];
                this.gamesTemp = [];
                GamesService.searchGame(query, this.page, this.itemsPerPage).then(res => {

                    this.gamesTemp = res.data;
                    this.parseGames();

                }).catch(function (error) {
                    console.log(error);
                });
            }


        },
        parseGames() {
            for (const game of this.gamesTemp) {
                if ("aggregated_rating" in game) {
                    game.aggregated_rating = Math.round((game.aggregated_rating + Number.EPSILON))
                }

            }
                this.games = this.gamesTemp
                this.isLoaded = true;
        },
        goToDetail(id) {
            this.$router.push({path: `/game/${id}`});
        },
        nextPage() {

            if (this.query.length === 0) {
                this.isLoaded = false;
                this.games = [];
                this.page += 1;
                this.getGames(this.page, this.itemsPerPage);
            } else if (this.itemsPerPage === this.gamesTemp.length) {
                this.isLoaded = false;
                this.games = [];
                this.page += 1;
                this.searchGames(this.query);
            }


        },
        formerPage() {

            if (this.query.length === 0 && this.page - 1 >= 1) {
                this.isLoaded = false;
                this.games = [];
                this.page -= 1
                this.getGames(this.page, this.itemsPerPage);
            } else if (this.page - 1 >= 1) {
                this.isLoaded = false;
                this.games = [];
                this.page -= 1;
                this.searchGames(this.query);


            }
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
    },
    computed: {
        numberOfPages() {
            if (this.query.length === 0) {
                return 0
            } else {
                return Math.ceil(this.games.length / this.itemsPerPage)
            }

        },
    }
};
</script>
<style scoped>
    .textsearchbox {
        transition: all 0.4s;
    }

    /*.textsearchbox:hover{*/
    /*    !*transform: scale(1.01);*!*/
    /*    -webkit-box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.57);*/
    /*    -moz-box-shadow: 0px 0px 16px -2px rgba(0,0,0,0.57);*/
    /*    box-shadow: 0px 0px 16px -2px rgba(0,0,0,0.57);*/

    /*}*/
</style>

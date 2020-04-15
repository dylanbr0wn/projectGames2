<template>
    <v-container fill-height>
        <vue-headful title="Project Games - Games"/>
        <v-toolbar
                :light="!$vuetify.theme.dark"
                :dark="$vuetify.theme.dark"
                style=" position:fixed; top:2vh;z-index: 100"

        >
            <v-text-field
                    @keydown.enter="searchGames(query)"
                    class="textsearchbox"
                    prepend-icon="search"
                    hide-details
                    autofocus
                    label="Search a game"
                    :disabled="!isLoaded"
                    v-model="query"

            ></v-text-field>


        </v-toolbar>


        <template class="mt-5">
            <v-fade-transition mode="out-in">
                <GameList
                        :isLoaded=isLoaded
                        :games=games
                        :itemsPerPage=itemsPerPage
                        :page=page
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
        games: [],
        isLoaded: false,
        itemsPerPage: 6,
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
            GamesService.fetchSomeGames(page, itemsPerPage)
                .then(res => {
                    this.isLoaded = true;
                    this.games = res.data;
                }).catch(function (error) {
                console.log(error);
            });

        },
        searchGames(query) {
            if (query.length === 0) {
                this.page = 1
                this.getGames(this.page, this.itemsPerPage)
            } else {
                this.page = 1
                this.isLoaded = false;
                this.games = [];
                GamesService.searchGame(query).then(res => {
                    this.isLoaded = true;
                    this.games = res.data


                }).catch(function (error) {
                    console.log(error);
                });
            }


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
            } else {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            }


        },
        formerPage() {
            if (this.query.length === 0) {
                this.isLoaded = false;
                this.games = [];
                if (this.page - 1 >= 1) this.page -= 1
                this.getGames(this.page, this.itemsPerPage);
            } else {
                if (this.page - 1 >= 1) this.page -= 1
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

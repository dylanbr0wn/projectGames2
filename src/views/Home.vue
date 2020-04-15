<template>
    <v-container fill-height>
        <vue-headful title="Project Games - Home"></vue-headful>
        <homeSearch v-on:searchInput="listGames"/>
    </v-container>
</template>

<script>
    // @ is an alias to /src
    import homeSearch from "../components/homeSearch";
    import GamesService from "../services/GamesService";

    export default {
        name: 'home',
        components: {
            homeSearch,
        },
        data: () => ({
            games: [],

        }),
        methods: {
            listGames(query) {
                this.$router.push({name: 'games', params: {query: query}});
            }

        }
    };
</script>

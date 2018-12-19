<template>
  <div class='game'>
    <vue-headful :title="title"/>
    <GameDetails v-bind:game=game  />
  </div>
</template>

<script>
// @ is an alias to /src
import GameDetails from '@/components/GameDetails.vue';
import GamesService from '@/services/GamesService';

export default {
    name: 'Detail',
    props: {
        id: String,
        games: Array,
    },
    data() {
        return{
            game: {},
            title: {},
        };
    },
    components: {
        GameDetails,
    },
    created() {
        this.getGameDetails();
    },
    methods: {
        getGameDetails() {
            let gameToDetail = this.games.find(x => x._id === this.id);
            this.game = gameToDetail;
            this.title = `Project Games - ${this.game.title}`
            this.fixGameScore(this.game.rating)
        },
        fixGameScore(score) {
            score = String(score);
            const fixed = score.replace(/\/\d/i, '');
            this.game.rating = Number(fixed);
        },
    },
};
</script>

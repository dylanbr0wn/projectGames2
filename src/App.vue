<template>
    <div id="app">
        <v-app id="inspire" :dark="goDark">
            <v-app toolbar>
                <v-navigation-drawer v-model="drawer" fixed temporary app>
                <v-list dense>
                    <v-list-tile to='/' @click="drawer = false">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile to='/games' @click="drawer = false">
                    <v-list-tile-action>
                        <v-icon>games</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Games</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-navigation-drawer>
                <v-toolbar app fixed>
                    <v-toolbar-side-icon @click.stop="drawer = !drawer" clipped-left></v-toolbar-side-icon>
                    <v-toolbar-title left>Project Games</v-toolbar-title>
                    <v-spacer>
                    </v-spacer>
                    <v-flex xs2>
                       <v-form @submit.prevent="searchGames">
                            <v-text-field solo placeholder="Search Games" append-icon="search" @click:append="searchGames" hide-details single-line v-model="query" name="query"></v-text-field>
                       </v-form>
                    </v-flex>
                    <v-toolbar-items> 
                        <v-btn ripple flat icon @click="goDark = !goDark">
                            <v-icon v-if="!goDark">brightness_3</v-icon>
                            <v-icon v-if="goDark">brightness_5</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <main>
                    <v-container fluid>
                        <v-fade-transition mode="out-in">
                            <router-view :games=games></router-view>
                        </v-fade-transition>
                    </v-container>
                </main>      
            </v-app>
        </v-app>
    </div>
</template>

<script>
import Games from './components/GameList.vue';
import GamesService from '@/services/GamesService';

// const fb = require('@/firebaseConfig');


export default {
  name: 'app',
  components: {
    Games,
  },
  created() {
      this.getGames();
      
  },
  watch: {
      $route(before,after){
            this.lastquery = this.query;
            this.query = '';
            if (this.query === '' && this.lastquery === ''){
                this.getGames();
            }
      },
  },
  data() {
    return {
        drawer: false,
        goDark: false,
        games: Array,
        query: '',
        lastquery: String,
    };
  },
  methods: {
    getGames() {
      GamesService.fetchSomeGames()
      .then(res => {
          this.games = res.data.games;
      })
      
    },
    async searchGames() {
        if (this.query && this.query !== this.lastquery) {
            this.lastquery = this.query;
            const response = await GamesService.searchGame(this.query);
            this.games = response.data;
        } else if (!this.query && this.query !== this.lastquery) {
            this.lastquery = this.query;
            this.getGames();
        }
        this.$router.push({name: 'games'});
    },
  },
};
</script>

<style>
</style>

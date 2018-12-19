<template>
    <div id="app">  
        <v-container>
            <v-layout wrap>
                <v-flex xs12 class="text-xs-center" mt-5>
                    <h1>Games</h1>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid grid-list-md>
            <v-data-iterator :items="games" :rows-per-page-items="[16,32,64]" :pagination.sync="pagination" :must-sort="true" content-tag="v-layout" row wrap>
                <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
                    <v-card hover @click.native='goToDetail(props.item._id)' height="100%" >
                        <v-card-title class="subheading font-weight-thin">
                            {{props.item.title}}
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            Insert some description or something here.
                        </v-card-text>       
                    </v-card>
                </v-flex>
            </v-data-iterator>
        </v-container>
    </div>
</template>

<script>
import GamesService from '@/services/GamesService';
export default {
  name: 'Games',
  props: {
      games: Array,
  },
  data() {
    return {
        pagination: {},
    };
  },
  watch: {
      games(before, after) {
          this.pagination.page = 1;
      },
  },
  methods: {
    goToDetail(id) {
        this.$router.push({path: `/game/${id}`});
    },
  },
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

</style>

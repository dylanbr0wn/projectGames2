<template>
    <div id="app">
        <v-container>
            <v-layout wrap>
                <v-flex xs12 class="text-xs-center" mt-5>
                    <h1 class="display-2 font-weight-thin text-uppercase">{{game.title}}</h1>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex xs4 >
                    <v-hover>
                    <v-card color="purple" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="white--text">
                            <v-flex xs12>
                                <v-card-title primary-title>
                                    <div class="display-1 font-weight-light">GOG</div>
                                </v-card-title>
                            </v-flex>
                            <v-divider white></v-divider>
                            <v-flex>                               
                                <v-card-title primary-title>
                                        <div>
                                            <div class="title font-weight-thin" v-if="game.pricegog"><span class="headline font-weight-bold">Gog Regular Price:</span> ${{game.pricegog}}</div>
                                            <div class="title font-weight-thin" v-if="game.discountpricegog && game.pricegog != game.discountpricegog"><span class="headline font-weight-bold">Discounted Gog Price:</span> ${{game.discountpricegog}}</div>
                                            <!-- <div class="title" v-if="game.pricesteam"><span class="headline font-weight-bold">Steam Regular Price:</span> ${{game.pricesteam}}</div> -->
                                            <!-- <span class="title" v-if="game.discountpricesteam && game.pricesteam != game.discountpricesteam"><h3>Steam Discounted Price:</h3>{{game.discountpricesteam}}</span>  -->
                                            <!-- <div v-if="game.urlgog "><span class="display-2 font-weight-bold">GOG URL:</span> <a :href=game.urlgog>Link to GOG</a></div>   -->
                                            <v-flex justify-center>
                                                <v-btn color="info font-weight-thin" :href=game.urlgog> Get on GOG<v-icon right>shopping_cart</v-icon></v-btn>
                                            </v-flex>
                                        </div>
                                </v-card-title>
                            </v-flex>
                    </v-card>
                    </v-hover>
                </v-flex>
                <v-flex xs4>
                    <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                            <v-flex xs12>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="display-1 font-weight-light">General Information</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-divider white></v-divider>
                            <v-flex>                               
                                <v-card-title primary-title>
                                        <div>
                                            <div class="title font-weight-thin" v-if="game.developer"><span class="headline font-weight-bold">Developer:</span> {{game.developer}}</div>
                                            <div class="title font-weight-thin" v-if="game.publisher"><span class="headline font-weight-bold">Publisher:</span> {{game.publisher}}</div>
                                            <div class="title font-weight-thin" v-if="game.releasedate"><span class="headline font-weight-bold">Release Date:</span> {{game.releasedate}}</div>
                                            <div class="title font-weight-thin" v-if="game.rating"><span class="headline font-weight-bold">Rating: </span><v-rating v-model="game.rating" half-increments></v-rating></div> 
                                            <!-- <div v-if="game.urlgog "><span class="display-2 font-weight-bold">GOG URL:</span> <a :href=game.urlgog>Link to GOG</a></div>   -->
                                            <!-- <v-btn icon href="/fooRoute" target="_blank"><v-icon>cart</v-icon> Get on GOG</v-btn> -->
                                        </div>
                                </v-card-title>
                            </v-flex>
                    </v-card>
                    </v-hover>
                </v-flex>
                <v-flex xs4>
                    <v-hover>
                    <v-card color="blue" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="white--text">
                            <v-flex xs12>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="display-1 font-weight-light">Steam</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-divider white></v-divider>
                            <v-flex>
                                <v-card-text>
                                    
                                </v-card-text>
                            </v-flex>
                    </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>
export default {
    

  name: 'GameDetails',
  props: {
      game: Object,
      },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>

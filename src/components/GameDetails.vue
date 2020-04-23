<template>
    <v-container>
        <v-row style="width:100%">
            <v-col
                    cols="12"
                    sm="8"
                    md="8"
                    lg="8"
            >
                <v-card
                        height="200"
                        hover
                        color="white"

                >

                    <v-img
                            height="200"
                            :src="coverURL"
                            :alt="game.name"
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
                <!--                <div-->
                <!--                        style="height:200px; width: 100%"-->

                <!--                >-->
                <!--                    <div class="d-flex display-3 font-weight-light mx-auto justify-center"-->
                <!--                          style="width: 100%"-->
                <!--                    >-->
                <!--                        {{game.name}}</div>-->
                <!--                    <div class="d-flex justify-center">-->
                <!--                        <span class="font-weight-thin title px-1" v-for="(company,index) in companies" :key="company.id" >-->
                <!--                            {{company.company}}<span v-if="index+1 < companies.length">, </span>-->
                <!--                        </span>-->
                <!--                    </div>-->
                <!--                </div>-->
                <v-card
                        height="550"
                        class="mt-10"
                        hover
                >

                </v-card>

            </v-col>
            <v-col
                    sm="4"
                    md="4"
                    lg="4"
            >
                <v-card
                        height="550"
                        hover
                >
                    asdasd
                </v-card>
                <v-card
                        height="200"
                        class="mt-10"
                        hover
                >

                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {


    name: 'GameDetails',
    props: {
        game: Object,
        companies: Array,
        coverURL: String
    },
    data() {
        return {};
    },
    methods: {},
    created() {
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
</style>

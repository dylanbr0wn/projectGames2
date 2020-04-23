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
                >
                    <v-card-title class="display-2 font-weight-light ma-auto">{{game.name}}</v-card-title>
                </v-card>
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

</style>

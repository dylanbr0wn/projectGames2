<template>
    <v-container style="margin-top: -20vh">
        <v-row
                class="mx-auto"
        >
            <v-col>
                <div>
                    <p class=" display-3 text-center"
                    >PROJECT G
                        <transition name="rotate" mode="out-in">
                            <v-icon
                                    v-if="!$vuetify.theme.dark"
                                    size="45px"
                                    color="black"
                                    class="mb-2 mx-1"
                                    :key="new Date().getTime()"

                            >
                                {{mainIcon}}
                            </v-icon>
                            <v-icon
                                    v-if="$vuetify.theme.dark"
                                    size="45px"
                                    color="white"
                                    class="mb-2 mx-1"
                                    :key="new Date().getTime()"

                            >
                                {{mainIcon}}
                            </v-icon>
                        </transition>
                        MES
                    </p>
                </div>
            </v-col>
        </v-row>
        <v-row
                class="mt-0"
        >
            <v-col>
                <v-text-field
                        @keydown.enter="$emit('searchInput',search)"
                        class="textsearchbox mt-12"
                        hide-details

                        autofocus
                        label="Search a game"
                        solo
                        rounded
                        v-model="search"
                        :light="$vuetify.theme.dark"
                        :dark="!$vuetify.theme.dark"
                ></v-text-field>
            </v-col>

        </v-row>

    </v-container>

</template>

<script>
    export default {
        name: "homeSearch",
        data: () => ({
            search: null,
            mainIcon: "casino"

        }),
        mounted() {

            let icons = ["gamepad", "videogame_asset", "casino"];

            let count = 0;

            let icon = ''
            setInterval(e => {
                let index = count % 3;
                this.mainIcon = icons[index]
                count++;

            }, 2000);
        }
    }
</script>

<style scoped>
    .textsearchbox {
        transition: all 0.4s;
    }

    .textsearchbox:hover {
        /*transform: scale(1.01);*/
        -webkit-box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.57);
        -moz-box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.57);
        box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.57);

    }

    .rotate-enter {
        opacity: 0;
        transform: rotateZ(-90deg);
    }

    .rotate-enter-active,
    .rotate-leave-active {
        transition: 0.5s;
    }

    .rotate-leave-to {
        opacity: 0;
        transform: rotateZ(90deg);
    }

</style>
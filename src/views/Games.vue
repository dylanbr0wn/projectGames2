<template>
    
  <div class='games'>
      <vue-headful title="Project Games - Games"/>
    <GameList v-bind:games=games />
  </div>
</template>

<script>
// @ is an alias to /src
import GameList from '@/components/GameList.vue';

export default {
    name: 'games',
    components: {
        GameList,
    },
    props: {
        games: Array,
    },
};
</script>

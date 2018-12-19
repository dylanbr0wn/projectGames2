import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Games from './views/Games.vue';
import Details from './views/Details.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home Page', // Title must be a string.
      },
    },
    {
      path: '/games',
      name: 'games',
      component: Games,
      props: true,
      meta: {
        title: 'Games', // Title must be a string.
      },
    },
    {
        path: '/game/:id',
        name: 'detail',
        component: Details,
        props: true,
        meta: {
          title: 'Game Detail', // Title must be a string.
        },
      },

  ],
});

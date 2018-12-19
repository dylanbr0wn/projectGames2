import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';

import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vueHeadful from 'vue-headful';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';


Vue.use(VeeValidate);
Vue.component('vue-headful', vueHeadful);
Vue.use(Vuetify, {
    iconfont: 'mdi',
   });
Vue.config.productionTip = false;
Vue.component('v-select', vSelect);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import VeeValidate from 'vee-validate';
import vueHeadful from 'vue-headful';
import vuetify from './plugins/vuetify';

Vue.use(VeeValidate);
Vue.component('vue-headful', vueHeadful);
// Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.component('v-select', vSelect);

new Vue({
    router,
    vuetify,
    render: (h) => h(App)
}).$mount('#app');

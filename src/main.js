import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';

import VeeValidate from 'vee-validate';
// import Vuetify from 'vuetify';
import vueHeadful from 'vue-headful';

import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import vuetify from './plugins/vuetify';

Vue.use(Autocomplete)


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

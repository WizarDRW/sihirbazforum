import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import store from "./core/services/store/store";
import VueMeta from 'vue-meta'
import VueGtag from 'vue-gtag'
import ApiService from "./core/services/api.service";
import VueCodeHighlight from 'vue-code-highlight';
import Katex from 'vue-katex-auto-render'
import { VueMasonryPlugin } from "vue-masonry";
import { AUTO_THEME } from "./core/services/store/option.module";
import VueCookies from 'vue-cookies'

const moment = require('moment')

Vue.use(VueCodeHighlight)
Vue.use(VueCookies)
Vue.use(VueMasonryPlugin);
Vue.use(VueGtag, {
  config: { id: 'G-7NCN3ZZBC9' }
})
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
require('moment/locale/tr')
Vue.use(require('vue-moment'), {
  moment
});
Vue.directive('katex', Katex);

Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.config.devtools = false;
ApiService.init();


router.beforeEach(async (to, from, next) => {
  store.dispatch('verifyAuth')
  var theme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : { auto: true, dark: null, name: "" }
  if (theme.auto) {
    store.dispatch(AUTO_THEME, theme)
  }
  next();
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

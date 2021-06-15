import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import store from "@/core/services/store/store"
import themes from "../core/themes"

const vuetify = new Vuetify()
Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi'
})

const st_ = store.getters.getTheme;

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: themes[st_.name],
      dark: themes[st_.name]
    },
    dark: store.getters.getTheme.isDark
  }
});

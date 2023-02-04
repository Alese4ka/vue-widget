import Vue, { createApp } from 'vue';
import { createVuetify } from 'vuetify';
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import vueCustomElement from 'vue-custom-element';
// eslint-disable-next-line import/extensions
import App from './App.vue';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'document-register-element/build/document-register-element';

const vuetify = createVuetify();

createApp(App).use(vuetify).use(vueCustomElement).mount('#app');

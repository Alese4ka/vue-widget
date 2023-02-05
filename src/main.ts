import { createApp, defineCustomElement } from 'vue';
import { createVuetify } from 'vuetify';
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import vueCustomElement from 'vue-custom-element';
// eslint-disable-next-line import/extensions, import/no-unresolved
import App from './App.vue';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'document-register-element/build/document-register-element';

const vuetify = createVuetify();
const weatherWidget = defineCustomElement(App);

customElements.define('weather-widget', weatherWidget);
createApp(App).use(vuetify).use(vueCustomElement).mount('#app');

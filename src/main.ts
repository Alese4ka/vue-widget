/* eslint-disable import/extensions */
import { createApp, defineCustomElement } from 'vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import vueCustomElement from 'vue-custom-element';
// eslint-disable-next-line import/extensions, import/no-unresolved
import WeatherWidget from './components/WeatherWidget.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'document-register-element/build/document-register-element';

const vuetify = createVuetify({
  components,
  directives,
});

// const weatherWidget = defineCustomElement(WeatherWidget);
// customElements.define('weather-widget', weatherWidget);

createApp(WeatherWidget).use(vueCustomElement).use(vuetify).mount('weather-widget');

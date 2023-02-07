/* eslint-disable import/extensions */
/* eslint-disable import/order */
import { createApp } from 'vue';
import vueCustomElement from 'vue-custom-element';
import WeatherWidget from './components/WeatherWidget.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'document-register-element/build/document-register-element';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(WeatherWidget).use(vueCustomElement).use(vuetify).mount('weather-widget');

<template>
  <div class="wrapper">
    <div class="location">
      <h2>{{ city }}, {{ country }}</h2>
      <button class="location-btn" @click="showModal">
        <img class="location-btn-settings" alt="settings" src="~@/assets/settings.svg" />
      </button>

      <SettingsModal v-show="isModalVisible" @close="closeModal" @city="getLocation">
      </SettingsModal>
    </div>
    <div class="forecast">
      <h1 class="forecast-temp">{{ temperature }} &deg;C</h1>
      <img class="forecast-weather" alt="weather" v-bind:src="icon" />
    </div>
    <p>{{ main }}. {{ description }}</p>
    <div class="weather-block">
      <div class="weather">
        <div class="weather-wrapper">
          <div class="weather-wrapper-text">Real feel</div>
          <div class="weather-wrapper-measure">{{ realFeel }} &deg;C</div>
        </div>
        <div class="weather-wrapper">
          <div class="weather-wrapper-text">Wind</div>
          <div class="weather-wrapper-measure">{{ wind }} m/s</div>
        </div>
        <div class="weather-wrapper">
          <div class="weather-wrapper-text">Pressure</div>
          <div class="weather-wrapper-measure">{{ pressure }} hPa</div>
        </div>
        <div class="weather-wrapper">
          <div class="weather-wrapper-text">Humidity</div>
          <div class="weather-wrapper-measure">{{ humidity }} %</div>
        </div>
        <div class="weather-wrapper">
          <div class="weather-wrapper-text">Dev point</div>
          <div class="weather-wrapper-measure">{{ devPoint }} &deg;C</div>
        </div>
        <div class="weather-wrapper">
          <div class="weather-wrapper-text">Visibility</div>
          <div class="weather-wrapper-measure">{{ visibility }} km</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// eslint-disable-next-line import/extensions
import SettingsModal from './SettingsModal.vue';

export default defineComponent({
  name: 'WeatherWidget',
  data: () => ({
    API_KEY: 'ea7f2ec7419b33064accc22aac5169a6',
    url_base: 'https://api.openweathermap.org/data/2.5/',
    query: '',
    city: '',
    country: '',
    temperature: 0,
    icon: '',
    main: '',
    description: '',
    realFeel: 0,
    wind: 0,
    pressure: 0,
    humidity: 0,
    devPoint: 0,
    visibility: 0,
    measures: [],
    isModalVisible: false,
  }),
  components: {
    SettingsModal,
  },
  methods: {
    showModal(): void {
      this.isModalVisible = true;
    },

    closeModal(): void {
      this.isModalVisible = false;
    },

    getLocation(childData: any): void {
      this.city = childData;
      this.fetchWeather(childData);
    },

    fetchWeather(city: string): void {
      this.fetchToAPI(city);
    },

    fetchToAPI(city: string): void {
      fetch(
        `${this.url_base}weather?q=${this.query ? this.query : city}&units=metric&appid=${
          this.API_KEY
        }`,
      )
        .then((res) => res.json())
        .then(this.setResults)
        .catch((err) => console.log(err));
    },

    setResults(results: any): void {
      // CHANGE
      if (results.cod === '404') {
        this.city = results.message;
      }
      //
      this.country = results.sys.country;
      this.temperature = Math.round(results.main.temp);
      // eslint-disable-next-line no-template-curly-in-string
      this.icon = `https://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`;
      this.main = results.weather[0].main;
      const desc = results.weather[0].description;
      this.description = desc.charAt(0).toUpperCase() + desc.slice(1);
      this.realFeel = Math.round(results.main.feels_like);
      this.wind = results.wind.speed;
      this.pressure = results.main.pressure;
      this.humidity = results.main.humidity;
      this.devPoint = Math.round(results.main.temp_min);
      this.visibility = results.visibility / 1000;
    },
    async getGeolocationInformation() {
      const API_KEY = '835fd7b8b00d4cad9953656caf096036';
      const API_URL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}`;
      const apiResponse = await fetch(API_URL);
      const data = await apiResponse.json();
      this.city = data.city;
      this.fetchWeather(this.city);
    },
  },
  mounted() {
    this.getGeolocationInformation();
  },
});
</script>

<style scoped lang="scss">
$main-color: #065ddd;
$secondary-color: #ffffff;

@mixin reset-btn {
  border: none;
  background-color: $secondary-color;
  padding: 0;
  margin: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 20rem;
  height: 30rem;
  margin: 1rem auto;
  padding-top: 1rem;
  background: $main-color;
  border-radius: 1rem;
  color: $secondary-color;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .location {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;

    &-btn {
      @include reset-btn;
      background-color: $main-color;

      &-settings {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }
    }
  }

  .forecast {
    display: flex;
    justify-content: space-evenly;

    &-temp {
      margin: auto 0;
      padding: 0;
      font-size: 3rem;
    }

    &-settings {
      width: 5rem;
      height: 5rem;
      cursor: pointer;
    }
  }

  .weather-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .weather {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;

      &-wrapper {
        width: 8rem;
        margin: 1rem;

        &-measure {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="location">
      <!-- <h1>{{ city }}</h1> -->
      <h2>City</h2>
      <img
        class="location-settings"
        @click="showModal"
        alt="settings"
        src="~@/assets/settings.svg"
      />

      <SettingsModal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header> Settings </template>
        <template v-slot:body> City array </template>
        <template v-slot:footer>
          <div>Add Location</div>
          <input placeholder="New York" />
        </template>
      </SettingsModal>
    </div>
    <div class="forecast">
      <!-- <h1>{{ temperature }}</h1> -->
      <h1 class="forecast-temp">26 &deg;C</h1>
      <img class="forecast-settings" alt="sun" src="~@/assets/images.jpeg" />
    </div>
    <p>Broken clouds. Light breeze</p>
    <div class="weather-block">
      <div
        class="weather"
        v-for="item in items"
        :key="item.id"
        :text="item.text"
        :measure="item.measure"
      >
        <div class="weather-text">{{ item.text }}</div>
        <div class="weather-measure">{{ item.measure }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsModal from './SettingsModal.vue';

export default defineComponent({
  name: 'WeatherWidget',
  data: () => ({
    items: [
      { id: '1', text: 'Real feel', measure: '23 C' },
      { id: '2', text: 'Wind', measure: '12 m/s' },
      { id: '3', text: 'Pressure', measure: '1021hPa' },
      { id: '4', text: 'Humidity', measure: '97%' },
      { id: '5', text: 'Dev point', measure: '0 C' },
      { id: '6', text: 'Visibility', measure: '10.0km' },
    ],
    isModalVisible: false,
  }),
  props: {
    city: String,
  },
  components: {
    SettingsModal,
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  width: 20rem;
  height: 30rem;
  background: rgb(217, 217, 228);
  border-radius: 1rem;
  .location {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;

    &-settings {
      width: 2rem;
      height: 2rem;
    }
  }

  .forecast {
    display: flex;
    justify-content: space-evenly;

    &-temp {
      margin: 0;
      padding: 0;
      font-size: 3rem;
    }

    //delete
    &-settings {
      width: 5rem;
      height: 5rem;
    }
  }

  .weather-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .weather {
      display: flex;
      flex-direction: column;
      margin: 1rem 0;
      width: 8rem;

      &-measure {
        font-size: 1.5rem;
      }
    }
  }
}
</style>

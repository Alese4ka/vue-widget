<!-- eslint-disable no-param-reassign -->
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        :style="{
          background: '#ffffff',
          boxShadow: '2px 2px 20px 1px',
          overflowX: 'auto',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '1rem',
          width: '16rem',
          borderRadius: '0.75rem',
        }"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          :style="{
            padding: '1rem',
            display: 'flex',
            position: 'relative',
            borderBottom: '1px solid #eeeeee',
            color: 'black',
            justifyContent: 'space-between',
          }"
          id="modalTitle"
        >
          <div class="modal-header-settings" :style="{ fontSize: '1rem' }">Settings</div>
          <button
            type="button"
            class="btn-close"
            :style="{
              position: 'absolute',
              top: '0',
              right: '0',
              border: 'none',
              fontSize: '1.25rem',
              padding: '0.75rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: 'black',
              background: 'transparent',
            }"
            @click="closeModal"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          :style="{ position: 'relative', padding: '1.25rem 0.75rem' }"
          id="modalDescription"
        >
          <div
            v-if="cityList.length === 0"
            :style="{
              color: '#065ddd',
            }"
          >
            You don't have favorite cities
          </div>
          <div class="modal-body-cities" v-else>
            <draggable class="list-group" :list="cityList" handle=".handle">
              <transition-group type="transition" name="flip-list">
                <div
                  class="list-group-item"
                  :style="{
                    backgroundColor: '#065ddd',
                    marginBottom: '0.75rem',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }"
                  v-for="city in cityList"
                  :key="city.name"
                >
                  <v-icon class="handle"
                    ><img
                      class="list-group-item-grab"
                      :style="{
                        width: '1.5rem',
                        height: '1.5rem',
                        cursor: 'move',
                      }"
                      alt="grab"
                      src="~@/assets/grab.svg"
                  /></v-icon>
                  <button
                    class="list-group-item-set"
                    :style="{
                      border: 'none',
                      padding: '0',
                      margin: '0',
                      backgroundColor: '#065ddd',
                      cursor: 'pointer',
                      color: '#ffffff',
                    }"
                    @click="setLocation(city)"
                  >
                    {{ city.name }}
                  </button>
                  <button
                    class="list-group-item-btn"
                    :style="{
                      border: 'none',
                      padding: '0',
                      margin: '0',
                      backgroundColor: '#065ddd',
                      cursor: 'pointer',
                    }"
                    @click="deleteLocation(city)"
                  >
                    <img
                      class="list-group-item-btn-delete"
                      :style="{
                        width: '1rem',
                        height: '1rem',
                      }"
                      alt="delete"
                      src="~@/assets/delete.svg"
                    />
                  </button>
                </div>
              </transition-group>
            </draggable>
          </div>
        </section>

        <footer
          class="modal-footer"
          :style="{
            padding: '1rem',
            display: 'flex',
            borderTop: '1px solid #eeeeee',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }"
        >
          <div>
            <div
              class="modal-footer-input"
              :style="{
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: '0.5rem',
              }"
            >
              <label
                for="city"
                class="modal-footer-add"
                :style="{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  color: 'black',
                  fontSize: '0.8rem',
                }"
                >Add Location:
                <input
                  class="modal-footer-add-input"
                  :style="{
                    padding: '0.25rem 2.5rem 0.25rem 0.15rem',
                    border: '1px solid #cfcfcf',
                  }"
                  type="text"
                  id="city"
                  v-model="city"
                  placeholder="Insert a city"
                  @keyup.enter="saveLocation"
              /></label>
              <button
                class="modal-footer-btn"
                :style="{
                  border: 'none',
                  padding: '0',
                  margin: '0',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                }"
                @click="saveLocation"
              >
                <img
                  class="modal-footer-btn-save"
                  :style="{
                    width: '1rem',
                    height: '1rem',
                    marginTop: '1rem',
                  }"
                  alt="arrow"
                  src="~@/assets/arrow.svg"
                />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { VueDraggableNext } from 'vue-draggable-next';

type Item = {
  name: string;
};

export default defineComponent({
  name: 'SettingsModal',
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      enabled: true,
      cityList: JSON.parse(localStorage.getItem('cityList')!) || [],
      dragging: false,
      city: '',
    };
  },
  methods: {
    closeModal(): void {
      this.$emit('close');
    },

    saveLocation(): void {
      if (this.city) {
        this.cityList.push({
          name: this.city,
        });
        localStorage.setItem('cityList', JSON.stringify(this.cityList));
        this.city = '';
      }
    },

    deleteLocation(element: Item): void {
      const currentItemId = this.cityList.findIndex((item: Item) => item === element);
      this.cityList.splice(currentItemId, 1);
      localStorage.setItem('cityList', JSON.stringify(this.cityList));
    },

    setLocation(element: Item): void {
      this.$emit('city', element.name);
      this.closeModal();
    },
  },
  mounted() {
    if (localStorage.getItem('cityList')) {
      try {
        this.cityList = JSON.parse(localStorage.getItem('cityList')!);
      } catch (e) {
        localStorage.removeItem('cityList');
      }
    }
  },
});
</script>

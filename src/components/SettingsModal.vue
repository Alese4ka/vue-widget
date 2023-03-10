<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <div class="modal-header-settings">Settings</div>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close modal">
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <div class="modal-body-no-data" v-if="cityList.length === 0">
            You don't have favorite cities
          </div>
          <div class="modal-body-cities" v-else>
            <draggable class="list-group" :list="cityList" handle=".handle">
              <transition-group type="transition" name="flip-list">
                <div class="list-group-item" v-for="city in cityList" :key="city.name">
                  <button class="handle">
                    <img
                      class="list-group-item-grab"
                      alt="grab"
                      src="https://i.postimg.cc/brShvjcJ/grab.png"
                    />
                  </button>
                  <button class="list-group-item-set" @click="setLocation(city)">
                    {{ city.name }}, {{ city.country }}
                  </button>
                  <button class="list-group-item-btn" @click="deleteLocation(city)">
                    <img
                      class="list-group-item-btn-delete"
                      alt="delete"
                      src="https://i.postimg.cc/MKr9DjQh/trash.png"
                    />
                  </button>
                </div>
              </transition-group>
            </draggable>
          </div>
        </section>

        <footer class="modal-footer">
          <div>
            <div v-show="isRepeat" class="modal-footer-repeat">{{ cityError }}</div>
            <div class="modal-footer-input">
              <label for="city" class="modal-footer-add"
                >Add Location:
                <input
                  class="modal-footer-add-input"
                  type="text"
                  id="city"
                  v-model="city"
                  placeholder="Insert a city"
                  @keyup.enter="saveLocation"
              /></label>
              <button class="modal-footer-btn" @click="saveLocation">
                <img
                  class="modal-footer-btn-save"
                  alt="arrow"
                  src="https://i.postimg.cc/RF12XPGh/arrow.png"
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
      cityList: [{ name: '', country: '' }],
      dragging: false,
      city: '',
      country: '',
      cityError: '',
      isRepeat: false,
      API_KEY: 'ea7f2ec7419b33064accc22aac5169a6',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
    };
  },
  methods: {
    closeModal(): void {
      this.$emit('close');
    },

    saveLocation(): void {
      if (this.city) {
        fetch(
          `${this.url_base}weather?q=${this.query ? this.query : this.city}&units=metric&appid=${
            this.API_KEY
          }`,
        )
          .then((res) => res.json())
          .then(this.setResults)
          .catch((err) => this.isError(err));
      }
    },

    setResults(results: any): void {
      this.country = results.sys.country;
      const findRepeatCity = this.cityList.find((item) => item.name === this.city);
      if (!findRepeatCity) {
        this.cityList.push({
          name: this.city,
          country: this.country,
        });
        localStorage.setItem('cityList', JSON.stringify(this.cityList));
        this.city = '';
        this.isRepeat = false;
      } else {
        this.cityError = 'You already have this city';
        this.isRepeat = true;
        this.city = '';
      }
    },

    isError(err: any) {
      this.cityError = "This city doesn't exist";
      this.isRepeat = true;
      this.city = '';
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
    this.isRepeat = false;
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

<style scoped lang="scss">
$main-color: #ffffff;
$secondary-color: #065ddd;
$font-color: #606060;
$border-line: 1px solid #eeeeee;

@mixin reset-btn {
  border: none;
  background-color: $main-color;
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

  .modal {
    background: $main-color;
    border-radius: 1rem;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    width: 16rem;

    &-header,
    &-footer {
      padding: 1rem;
      display: flex;
    }

    &-header {
      position: relative;
      border-bottom: $border-line;
      color: $font-color;
      justify-content: space-between;

      &-settings {
        font-size: 0.8rem;
        font-weight: 600;
      }

      .btn-close {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        font-size: 1.25rem;
        padding: 0.75rem;
        cursor: pointer;
        font-weight: bold;
        color: $font-color;
        background: transparent;
      }
    }

    &-body {
      position: relative;
      padding: 1.25rem 0.75rem;

      &-no-data {
        color: $secondary-color;
      }

      .list-group-item {
        background-color: $secondary-color;
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-set {
          @include reset-btn;
          background-color: $secondary-color;
          cursor: pointer;
        }

        &-grab {
          width: 1.5rem;
          height: 1.5rem;
          cursor: move;
        }

        &-btn {
          @include reset-btn;
          background-color: $secondary-color;

          &-delete {
            width: 1.25rem;
            height: 1.25rem;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }

    &-footer {
      border-top: $border-line;
      flex-direction: column;
      justify-content: flex-end;

      &-repeat {
        color: #cc1212;
        margin-bottom: 1rem;
      }

      &-add {
        display: flex;
        flex-direction: column;
        text-align: left;
        color: $font-color;
        font-size: 0.8rem;
        font-weight: 600;

        &-input {
          padding: 0.25rem 2.5rem 0.25rem 0.25rem;
          border: $border-line;
          color: $font-color;
        }
      }

      &-input {
        display: flex;
        justify-content: space-between;
        margin-right: 0.5rem;
      }

      &-btn {
        @include reset-btn;

        &-save {
          width: 1rem;
          height: 1rem;
          margin-top: 1rem;
          cursor: pointer;
        }
      }
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>

<!-- eslint-disable no-param-reassign -->
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
          <div class="modal-body-cities">
            <draggable class="list-group" :list="list" handle=".handle">
              <transition-group type="transition" name="flip-list">
                <div class="list-group-item" v-for="element in list" :key="element.name">
                  <!-- <img class="list-group-item-grab" alt="grab" src="~@/assets/grab.svg" /> -->
                  <v-icon class="handle"
                    ><img class="list-group-item-grab" alt="grab" src="~@/assets/grab.svg"
                  /></v-icon>
                  {{ element.name }}
                  <button class="list-group-item-btn" @click="deleteLocation(element)">
                    <img
                      class="list-group-item-btn-delete"
                      alt="delete"
                      src="~@/assets/delete.svg"
                    />
                  </button></div
              ></transition-group>
            </draggable>
          </div>
        </section>

        <footer class="modal-footer">
          <div>
            <div class="modal-footer-input">
              <label for="city" class="modal-footer-add"
                >Add Location:
                <input
                  class="modal-footer-add-input"
                  type="text"
                  id="city"
                  ref="inputField"
                  placeholder="Insert a city"
                  @keyup.enter="saveLocation"
              /></label>
              <button class="modal-footer-btn" @click="saveLocation">
                <img class="modal-footer-btn-save" alt="arrow" src="~@/assets/arrow.svg" />
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

export default defineComponent({
  name: 'SettingsModal',
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      enabled: true,
      list: [{ name: 'John' }, { name: 'Joao' }, { name: 'Jean' }, { name: 'Gerard' }],
      dragging: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveLocation() {
      const message = this.$refs.inputField.value;
      if (message) {
        this.list.push({
          name: message,
        });
        this.$refs.inputField.value = '';
      }
    },
    deleteLocation(element: any) {
      const currentItemId = this.list.findIndex((item) => item === element);
      console.log(element, this.list, currentItemId);
      this.list.splice(currentItemId, 1);
    },
  },
});
</script>

<style scoped lang="scss">
$main-color: #606060;
$secondary-color: #eeeeee;
$border-line: 1px solid $secondary-color;

@mixin reset-btn {
  border: none;
  background-color: #ffffff;
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
    background: #ffffff;
    //look
    box-shadow: 2px 2px 20px 1px;
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
      color: $main-color;
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
        color: $main-color;
        background: transparent;
      }
    }

    &-body {
      position: relative;
      padding: 1.25rem 0.75rem;

      .list-group-item {
        background-color: $secondary-color;
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-grab {
          width: 1.5rem;
          height: 1.5rem;
          cursor: move;
        }

        &-btn {
          @include reset-btn;
          background-color: $secondary-color;

          &-delete {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }

    &-footer {
      border-top: $border-line;
      flex-direction: column;
      justify-content: flex-end;

      &-add {
        display: flex;
        flex-direction: column;
        text-align: left;
        color: $main-color;
        font-size: 0.8rem;
        font-weight: 600;

        &-input {
          padding: 0.25rem 2.5rem 0.25rem 0.15rem;
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

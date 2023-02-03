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
                  <v-icon class="handle">mdi-menu</v-icon>
                  {{ element.name }}
                  <img
                    class="list-group-item-delete"
                    @click="deleteLocation"
                    alt="delete"
                    src="~@/assets/delete.svg"
                  /></div
              ></transition-group>
            </draggable>
          </div>
        </section>

        <footer class="modal-footer">
          <div>
            <div class="modal-footer-add">Add Location:</div>
            <div class="modal-footer-input">
              <input placeholder="New York" />
              <img
                class="modal-footer-save"
                @click="saveLocation"
                alt="arrow"
                src="~@/assets/arrow.svg"
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
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
      list: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ],
      dragging: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveLocation() {
      console.log('hhh');
    },
  },
});
</script>

<style scoped lang="scss">
$main-color: #606060;
$secondary-color: #eeeeee;
$border-line: 1px solid $secondary-color;

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

        &-delete {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    &-footer {
      border-top: $border-line;
      flex-direction: column;
      justify-content: flex-end;

      &-add {
        display: flex;
        justify-content: flex-start;
        color: $main-color;
        font-size: 0.8rem;
        font-weight: 600;
      }

      &-save {
        width: 1rem;
        height: 1rem;
        margin-left: 0.5rem;
        cursor: pointer;
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

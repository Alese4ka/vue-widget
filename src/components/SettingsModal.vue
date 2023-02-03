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
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
        </header>

        <section class="modal-body" id="modalDescription">
          <div>City array</div>
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

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsModal',
  methods: {
    close() {
      this.$emit('close');
    },
    saveLocation() {
      console.log('hhh');
    },
  },
});
</script>

<style scoped lang="scss">
$border-line: 1px solid #eeeeee;
$main-color: #606060;

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
    }

    &-footer {
      border-top: $border-line;
      flex-direction: column;
      justify-content: flex-end;

      &-add {
        display: flex;
        justify-content: flex-start;
        color: #606060;
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
</style>

<script setup lang="ts">
defineProps({
  title: String,
  display: Boolean,
  cancel: { type: String, default: 'Cancel' },
  confirm: { type: String, default: 'Confirm' },
  confirmEnabled: { type: Boolean, default: true },
});

defineEmits(['modal-close', 'modal-submit']);
</script>

<template>
  <div class="modal" v-if="display">
    <div class="modal__content">
      <h3 class="modal__content__title">{{ title }}</h3>
      <slot></slot>
      <div class="modal__content__button-group">
        <el-button @click="$emit('modal-close')" type="danger">
          {{ cancel }}
        </el-button>
        <el-button @click="$emit('modal-submit')" type="primary" :disabled="!confirmEnabled">
          {{ confirm }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, $modalOpacity);

  &__content {
    background-color: $white;
    margin: 15% auto;
    padding: 2 * $defaultMargin;
    width: 25%;
    border-radius: $defaultRadius;
    box-shadow: $defaultBoxShadow;

    &__title {
      margin-top: 0px;
      margin-bottom: $defaultMargin;
    }

    &__button-group {
      margin-top: 2 * $defaultMargin;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

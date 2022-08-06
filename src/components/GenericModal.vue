<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { ModalSize } from '@/config/types/modalSize.type';

const props = defineProps({
  title: String,
  display: Boolean,
  cancel: { type: String, default: 'Cancel' },
  confirm: { type: String, default: 'Confirm' },
  confirmEnabled: { type: Boolean, default: true },
  modalSize: { type: String as PropType<ModalSize>, default: ModalSize.SMALL },
});

const sizeClass = computed(() => {
  return {
    'modal__content--small': props.modalSize === ModalSize.SMALL,
    'modal__content--medium': props.modalSize === ModalSize.MEDIUM,
    'modal__content--large': props.modalSize === ModalSize.LARGE,
  };
});

defineEmits(['modal-close', 'modal-submit']);
</script>

<template>
  <div class="modal" v-if="display">
    <div class="modal__content" :class="sizeClass">
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

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, $modalOpacity);

  &__content {
    background-color: $white;
    padding: 2 * $defaultMargin;
    border-radius: $defaultRadius;
    box-shadow: $defaultBoxShadow;

    &--small {
      width: 25%;
    }

    &--medium {
      width: 60%;
    }

    &--large {
      width: 90%;
    }

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

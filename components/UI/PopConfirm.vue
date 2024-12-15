<template>
  <div ref="triggerRef" class="popconfirm-wrapper">
    <slot name="reference" :toggle="togglePopover" />
    <transition name="fade">
      <div v-if="visible" class="popconfirm-content">
        <div class="popconfirm-arrow"></div>
        <div class="popconfirm-inner rounded-lg">
          <p>{{ message }}</p>
          <div class="popconfirm-buttons">
            <button
              class="popconfirm-button cancel !bg-red-500 !text-white"
              @click="onCancel"
            >
              {{ cancelButtonText }}
            </button>
            <button class="popconfirm-button confirm" @click="onConfirm">
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  message: {
    type: String,
    default: 'Are you sure you want to proceed?',
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm',
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel',
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const triggerRef = ref(null)

function togglePopover() {
  visible.value = !visible.value
}

function onConfirm() {
  visible.value = false
  emit('confirm')
}

function onCancel() {
  visible.value = false
  emit('cancel')
}

function handleClickOutside(event) {
  if (triggerRef.value && !triggerRef.value.contains(event.target)) {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.popconfirm-wrapper {
  position: relative;
  display: inline-block;
}

.popconfirm-content {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 1000;
  white-space: nowrap;
}

.popconfirm-arrow {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background-color: white;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  transform: rotate(45deg);
}

.popconfirm-inner {
  padding: 10px;
  text-align: center;
}

.popconfirm-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.popconfirm-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popconfirm-button.cancel {
  background-color: #f5f5f5;
}

.popconfirm-button.confirm {
  background-color: #409eff;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

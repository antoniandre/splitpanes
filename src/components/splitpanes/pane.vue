<template>
<div
  ref="pane"
  class="splitpanes__pane"
  @click="onPaneClick($event, _.uid)"
  :style="styles">
  <slot/>
</div>
</template>

<script setup>
import { inject, ref, computed, onMounted, onBeforeUnmount, watch, getCurrentInstance } from 'vue'

const props = defineProps({
  size: { type: [Number, String], default: null },
  minSize: { type: [Number, String], default: 0 },
  maxSize: { type: [Number, String], default: 100 }
})

const requestUpdate = inject('requestUpdate')
const onPaneAdd = inject('onPaneAdd')
const onPaneRemove = inject('onPaneRemove')
const onPaneClick = inject('onPaneClick')

const uid = getCurrentInstance()?.uid
const pane = ref(null)
const styles = ref({})
const sizeNumber = computed(() => {
  const value = parseFloat(props.size)
  return isNaN(value) ? 0 : value
})
const minSizeNumber = computed(() => {
  const value = parseFloat(props.minSize)
  return isNaN(value) ? 0 : value
})
const maxSizeNumber = computed(() => {
  const value = parseFloat(props.maxSize)
  return isNaN(value) ? 100 : value
})

onMounted((...a) => onPaneAdd({
  id: uid,
  el: pane.value,
  min: minSizeNumber.value,
  max: maxSizeNumber.value,
  size: props.size === null ? null : sizeNumber.value,
  givenSize: props.size,
  // Called from the splitpanes component.
  update: style => (styles.value = style)
}))

onBeforeUnmount(() => onPaneRemove(uid))

watch(() => sizeNumber.value, size => requestUpdate({ uid, size }))
watch(() => minSizeNumber.value, min => requestUpdate({ uid, min }))
watch(() => maxSizeNumber.value, max => requestUpdate({ uid, max }))
</script>

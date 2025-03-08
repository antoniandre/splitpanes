<template>
<div
  ref="paneEl"
  class="splitpanes__pane"
  @click="onPaneClick($event, _.uid)"
  :style="styles">
  <slot/>
</div>
</template>

<script setup>
import { inject, ref, computed, onMounted, onBeforeUnmount, watch, getCurrentInstance } from 'vue'

const props = defineProps({
  size: { type: [Number, String] },
  minSize: { type: [Number, String], default: 0 },
  maxSize: { type: [Number, String], default: 100 }
})

const requestUpdate = inject('requestUpdate')
const onPaneAdd = inject('onPaneAdd')
const horizontal = inject('horizontal')
const onPaneRemove = inject('onPaneRemove')
const onPaneClick = inject('onPaneClick')

const uid = getCurrentInstance()?.uid
const indexedPanes = inject('indexedPanes')
const pane = computed(() => indexedPanes.value[uid])

const paneEl = ref(null)
const sizeNumber = computed(() => {
  const value = isNaN(props.size) || props.size === undefined ? 0 : parseFloat(props.size)

  return Math.max(Math.min(value, maxSizeNumber.value), minSizeNumber.value)
})
const minSizeNumber = computed(() => {
  const value = parseFloat(props.minSize)
  return isNaN(value) ? 0 : value
})
const maxSizeNumber = computed(() => {
  const value = parseFloat(props.maxSize)
  return isNaN(value) ? 100 : value
})
const styles = computed(() => `${horizontal.value ? 'height' : 'width'}: ${pane.value?.size}%`)

watch(() => sizeNumber.value, size => requestUpdate({ uid, size }))
watch(() => minSizeNumber.value, min => requestUpdate({ uid, min }))
watch(() => maxSizeNumber.value, max => requestUpdate({ uid, max }))

onMounted(() => {
  onPaneAdd({
    id: uid,
    el: paneEl.value,
    min: minSizeNumber.value,
    max: maxSizeNumber.value,
    // The given size (useful to know the user intention).
    givenSize: props.size === undefined ? null : sizeNumber.value,
    size: sizeNumber.value // The computed current size at any time.
  })
})

onBeforeUnmount(() => onPaneRemove(uid))
</script>

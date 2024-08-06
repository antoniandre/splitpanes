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
  size: { type: [Number, String], default: null },
  minSize: { type: [Number, String], default: 0 },
  maxSize: { type: [Number, String], default: 100 }
})

const requestUpdate = inject('requestUpdate')
const onPaneAdd = inject('onPaneAdd')
const horizontal = inject('horizontal')
const onPaneRemove = inject('onPaneRemove')
const onPaneClick = inject('onPaneClick')

const uid = getCurrentInstance()?.uid
const panes = inject('panes')
const pane = computed(() => panes.find(pane => pane.id === uid))

const paneEl = ref(null)
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
const styles = computed(() => `${horizontal ? 'height' : 'width'}: ${pane.value?.size}%`)

onMounted(() => {
  onPaneAdd({
    id: uid,
    el: paneEl.value,
    min: minSizeNumber.value,
    max: maxSizeNumber.value,
    // The given size (useful to know the user intention).
    givenSize: props.size === null ? null : sizeNumber.value,
    size: props.size === null ? null : sizeNumber.value // The computed current size at any time.
  })
})

watch(() => sizeNumber.value, size => requestUpdate({ uid, size }))
watch(() => minSizeNumber.value, min => requestUpdate({ uid, min }))
watch(() => maxSizeNumber.value, max => requestUpdate({ uid, max }))

onBeforeUnmount(() => onPaneRemove(uid))
</script>

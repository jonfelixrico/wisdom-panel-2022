<template>
  <div class="q-pa-sm">
    <q-item
      clickable
      dense
      class="rounded-borders"
      :active="active"
      @click="$emit('click')"
      active-class="text-white active"
    >
      <q-item-section> {{ label }} </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    active: Boolean,
    label: String,
  },

  emits: ['click'],
})
</script>

<style lang="scss" scoped>
.active :deep(.q-focus-helper) {
  opacity: 0.1;
  background: white;
}
</style>

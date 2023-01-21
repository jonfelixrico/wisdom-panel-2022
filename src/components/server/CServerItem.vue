<template>
  <div class="row justify-center">
    <q-btn round unelevated @click="$emit('click')">
      <q-avatar>
        <q-img :src="server.iconUrl" />
      </q-avatar>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Server } from 'src/stores/server-store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    isActive: Boolean,
    server: {
      type: Object as PropType<Server>,
      required: true,
    },
  },
  emits: ['click'],
})
</script>

<style></style>

<template>
  <div
    class="row justify-center relative-position root"
    :class="{ active: isActive }"
  >
    <q-btn round unelevated @click="$emit('click')">
      <q-avatar>
        <q-img :src="server.iconUrl" />
      </q-avatar>

      <q-tooltip anchor="center end" self="center left">{{
        server.name
      }}</q-tooltip>
    </q-btn>
    <div class="absolute full-height column justify-center indicator-container">
      <div class="bg-white indicator" />
    </div>
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

<style lang="scss" scoped>
.indicator-container {
  width: 5px;
  left: -2.5px;
}

.indicator {
  border-radius: 5px;
  height: 0;
  transition: height 0.1s;
}

.root {
  &:hover .indicator {
    height: 15px !important;
  }

  &.active .indicator {
    height: 7.5px;
  }
}
</style>

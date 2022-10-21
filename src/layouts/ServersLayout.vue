<template>
  <q-layout view="lHh Lpr lFf" container>
    <q-drawer side="left" v-model="showDrawer">
      server list goes here
    </q-drawer>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showDrawer = ref(true)

    return {
      showDrawer,
    }
  },
})
</script>

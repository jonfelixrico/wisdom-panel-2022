<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-header> test </q-toolbar-header>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="showDrawer"> test </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
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

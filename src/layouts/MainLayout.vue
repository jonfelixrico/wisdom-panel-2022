<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-root">
      <q-toolbar>
        <q-toolbar-header> test </q-toolbar-header>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="showDrawer" class="bg-root"> test </q-drawer>
    <q-page-container class="bg-body">
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

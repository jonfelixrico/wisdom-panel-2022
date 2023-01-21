<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-root">
      <q-toolbar>
        <q-btn round dense flat icon="menu" @click="showDrawer = !showDrawer" />
        <q-toolbar-title>{{ $t('common.appName') }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="showDrawer" class="bg-root">
      <!-- TODO server list here -->
    </q-drawer>
    <q-page-container>
      <router-view />
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

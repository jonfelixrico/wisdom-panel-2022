<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-root">
      <q-toolbar>
        <q-btn round dense flat icon="menu" @click="showDrawer = !showDrawer" />
        <q-toolbar-title>{{ $t('common.appName') }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="showDrawer"
      class="bg-root relative-position"
      :mini="true"
      :overlay="false"
    >
      <!-- We're always using mini because we're following the Discord desktop layout -->
      <template #mini>
        <CServerSelectionList class="absolute-full" />
      </template>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import CServerSelectionList from 'src/components/server/CServerSelectionList.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { CServerSelectionList },
  setup() {
    const showDrawer = ref(true)

    return {
      showDrawer,
    }
  },
})
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-root">
      <q-toolbar>
        <q-toolbar-title>{{ $t('common.appName') }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Like Discord, this will always be shown -->
    <q-drawer
      :model-value="true"
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
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CServerSelectionList },
})
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <!-- Overriding this because QHeader applies bg-primary by default -->
    <q-header class="bg-transparent">
      <q-bar class="bg-root">
        {{ $t('common.appName') }}
      </q-bar>
    </q-header>

    <!-- Like Discord, this will always be shown -->
    <q-drawer
      :model-value="true"
      class="bg-root relative-position"
      :mini="true"
      :breakpoint="0"
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

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <!-- TODO i18nize this -->
        <q-toolbar-title>Wisdom Panel</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useUserLoader } from 'src/composables/user-loader.composable'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const { load } = useUserLoader()
    onMounted(load)
  },
})
</script>

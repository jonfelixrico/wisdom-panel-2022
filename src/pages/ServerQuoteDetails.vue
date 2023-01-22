<template>
  <q-page class="column">
    <q-toolbar class="shadow-1">
      <q-btn icon="arrow_back" flat round dense />
      <!-- TODO i18nize -->
      <q-toolbar-title>{{ $t('quote.detailsPage.title') }}</q-toolbar-title>
    </q-toolbar>
    <div class="col"></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

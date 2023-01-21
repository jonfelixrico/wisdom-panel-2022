<template>
  <q-page class="column items-center justify-center">
    <!-- TODO show a spinner instead if the list is still being loaded -->
    <!-- TODO i18nize this -->
    <div class="text-h2">Welcome!</div>
    <div class="text-h4">
      {{ $t('server.noServerSelected') }}
    </div>
    <!-- TODO ask the user to add them to one of their servers if no servers are detected -->
  </q-page>
</template>

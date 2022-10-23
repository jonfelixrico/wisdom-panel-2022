<template>
  <q-layout view="lHh Lpr lFf" container>
    <q-drawer
      side="left"
      :model-value="true"
      class="relative-position"
      bordered
    >
      <!-- TODO add server details -->
    </q-drawer>

    <q-page-container>
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

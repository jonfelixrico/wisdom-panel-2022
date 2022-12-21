<!-- Literally an empty layout -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- This slot allows this component to be a route layout (via routes)
      or a layout component (via slots) -->
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

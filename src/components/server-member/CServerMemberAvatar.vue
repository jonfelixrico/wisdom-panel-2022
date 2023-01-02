<template>
  <q-avatar :size="size">
    <q-skeleton v-if="!avatarUrl" type="QAvatar" size="100%" />
    <q-icon v-else :name="`img:${avatarUrl}`" :size="size" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    avatarUrl: String,
    size: String,
  },
})
</script>

<template>
  <q-avatar :size="size">
    <q-skeleton v-if="!avatarUrl" type="QAvatar" size="100%" />
    <q-icon v-else :name="`img:${avatarUrl}`" :size="size" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface ServerMember {
  userId: string
  serverId: string
}

export default defineComponent({
  props: {
    /**
     * @deprecated
     */
    user: {
      required: true,
      type: Object as PropType<ServerMember>,
    },

    avatarUrl: String,
    size: String,
  },
})
</script>

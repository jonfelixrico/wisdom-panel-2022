<template>
  <q-avatar :size="size">
    <q-skeleton v-if="!userData?.avatarUrl" type="QAvatar" size="100%" />
    <q-icon v-else :name="`img:${userData?.avatarUrl}`" :size="size" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useServerMember } from './server-member.composables'
import { ServerMember } from './server-member.interface'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<ServerMember>,
      required: true,
    },

    size: String,
  },

  setup(props) {
    return useServerMember(props)
  },
})
</script>

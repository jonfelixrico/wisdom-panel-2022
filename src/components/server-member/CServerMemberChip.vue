<template>
  <CServerMemberAvatar :user="user" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CServerMemberAvatar from './CServerMemberAvatar.vue'

interface ServerMember {
  userId: string
  serverId: string
}

export default defineComponent({
  components: { CServerMemberAvatar },

  props: {
    user: {
      type: Object as PropType<ServerMember>,
      required: true,
    },
  },
})
</script>

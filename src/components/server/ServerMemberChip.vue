<template>
  <div class="row items-center">
    <ServerMemberAvatar :serverId="serverId" :member="member" size="xs" />
    <span class="text-weight-bold q-ml-xs">{{
      member?.nick ?? member?.user?.username
    }}</span>
  </div>
</template>

<script lang="ts">
import { APIGuildMember } from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'
import ServerMemberAvatar from './ServerMemberAvatar.vue'

export default defineComponent({
  props: {
    serverId: {
      required: true,
      type: String,
    },

    member: {
      type: Object as PropType<APIGuildMember>,
      required: true,
    },
  },

  components: { ServerMemberAvatar },
})
</script>

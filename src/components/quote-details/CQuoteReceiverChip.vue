<template>
  <div class="bg-body rounded-borders q-px-xs row items-center">
    <CServerMemberAvatar :user="user" size="xs" class="q-mr-xs" />
    <CServerMemberName :user="user" />
    <span class="pre text-grey-5 text-weight-medium"> x {{ count }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CServerMemberAvatar from '../server-member/CServerMemberAvatar.vue'
import CServerMemberName from '../server-member/CServerMemberName.vue'
import { ServerMember } from '../server-member/server-member.interface'

export default defineComponent({
  components: { CServerMemberAvatar, CServerMemberName },

  props: {
    user: {
      type: Object as PropType<ServerMember>,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
})
</script>

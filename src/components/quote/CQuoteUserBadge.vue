<template>
  <div class="bg-body rounded-borders q-px-xs row items-center">
    <CServerMemberAvatar :user="user" size="xs" class="q-mr-xs" />
    <CServerMemberName :user="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CServerMemberAvatar from 'components/server-member/CServerMemberAvatar.vue'
import CServerMemberName from 'components/server-member/CServerMemberName.vue'
import { ServerMember } from 'components/server-member/server-member.interface'

export default defineComponent({
  components: { CServerMemberAvatar, CServerMemberName },

  props: {
    user: {
      type: Object as PropType<ServerMember>,
      required: true,
    },
  },
})
</script>

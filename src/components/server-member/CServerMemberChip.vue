<!-- Displays a server member's username and avatar -->
<template>
  <div class="row items-center">
    <CServerMemberAvatar :user="user" :size="avatarSize" class="q-mr-sm" />

    <slot v-if="username" :username="username">
      <div>{{ username }}</div>
    </slot>
    <q-skeleton v-else type="text" style="width: 25px" />
  </div>
</template>

<script lang="ts">
import { useUsernameService } from 'src/composables/use-username-service'
import { defineComponent, onBeforeMount, PropType, ref } from 'vue'
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

    avatarSize: {
      type: String,
      default: 'sm',
    },
  },

  setup(props) {
    const usernameSvc = useUsernameService()

    const username = ref<string | undefined>(undefined)

    onBeforeMount(async () => {
      username.value = await usernameSvc.getServerMemberUsername(
        props.user.userId,
        props.user.serverId
      )
    })

    return {
      username,
    }
  },
})
</script>

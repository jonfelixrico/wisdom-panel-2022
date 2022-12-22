<template>
  <div class="row items-center">
    <CServerMemberAvatar :user="user" class="q-ml-sm" />

    <q-skeleton v-if="!username" type="text" style="width: 25px" />
    <div v-else>{{ username }}</div>
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

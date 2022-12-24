<template>
  <q-avatar :size="size">
    <q-skeleton v-if="!avatarUrl" type="QAvatar" size="100%" />
    <q-icon v-else :name="`img:${avatarUrl}`" :size="size" />
  </q-avatar>
</template>

<script lang="ts">
import { useAvatarService } from 'src/composables/use-avatar-service.composable'
import { defineComponent, onMounted, PropType, ref } from 'vue'

interface ServerMember {
  userId: string
  serverId: string
}

export default defineComponent({
  props: {
    user: {
      required: true,
      type: Object as PropType<ServerMember>,
    },

    size: String,
  },

  setup(props) {
    const avatarService = useAvatarService()
    const avatarUrl = ref<string | undefined>(undefined)

    onMounted(async () => {
      avatarUrl.value = await avatarService.getServerMemberAvatarUrl(
        props.user.userId,
        props.user.serverId
      )
    })

    return {
      avatarUrl,
    }
  },
})
</script>

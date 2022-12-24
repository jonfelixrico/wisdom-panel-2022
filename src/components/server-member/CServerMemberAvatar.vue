<template>
  <q-skeleton type="QAvatar" :size="size" v-if="!avatarUrl" />
  <q-avatar v-else :size="size">
    <q-img :src="avatarUrl">
      <template #loading>
        <q-skeleton type="QAvatar" />
      </template>
    </q-img>
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

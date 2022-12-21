<template>
  <q-avatar>
    <q-img v-if="avatarUrl" :src="avatarUrl" />
    <q-spinner v-else />
  </q-avatar>
</template>

<script lang="ts">
import { useServerMemberAvatarService } from 'src/composables/use-server-member-avatar-service.composable'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    userId: {
      type: String,
      required: true,
    },

    serverId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const avatarService = useServerMemberAvatarService()
    const avatarUrl = ref<string | undefined>(undefined)

    onMounted(async () => {
      avatarUrl.value = await avatarService.getAvatarUrl(
        props.userId,
        props.serverId
      )
    })

    return {
      avatarUrl,
    }
  },
})
</script>

<template>
  <q-skeleton type="QAvatar" :size="size" v-if="!avatarUrl" />
  <q-avatar v-else :size="size">
    <q-img :src="avatarUrl" />
  </q-avatar>
</template>

<script lang="ts">
import { useAvatarService } from 'src/composables/use-avatar-service.composable'
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

    size: String,
  },

  setup(props) {
    const avatarService = useAvatarService()
    const avatarUrl = ref<string | undefined>(undefined)

    onMounted(async () => {
      avatarUrl.value = await avatarService.getServerMemberAvatarUrl(
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

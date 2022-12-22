<template>
  <q-avatar :size="size">
    <q-img v-if="avatarUrl" :src="avatarUrl" />
    <q-spinner v-else />
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

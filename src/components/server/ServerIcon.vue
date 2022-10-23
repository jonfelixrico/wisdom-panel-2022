<template>
  <q-img v-if="avatarUrl" :src="avatarUrl" />
  <q-icon name="groups_2" />
</template>

<script lang="ts">
import {
  APIGuild,
  CDNRoutes,
  ImageFormat,
  RouteBases,
} from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'

type ServerData = Pick<APIGuild, 'id' | 'icon' | 'name'>

export default defineComponent({
  props: {
    server: {
      type: Object as PropType<ServerData>,
      required: true,
    },
  },
  computed: {
    avatarUrl() {
      const { server } = this
      if (!server.icon) {
        return null
      }
      const url = new URL(
        CDNRoutes.guildIcon(server.id, server.icon, ImageFormat.PNG),
        RouteBases.cdn
      )
      return url.toString()
    },
  },
})
</script>

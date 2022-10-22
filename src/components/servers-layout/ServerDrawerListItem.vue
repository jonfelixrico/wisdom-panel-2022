<template>
  <q-item clickable @click="redirectToServerPage" :active="isActive">
    <q-item-section avatar>
      <q-avatar>
        <q-img v-if="iconUrl" :src="iconUrl" />
      </q-avatar>
    </q-item-section>
    <q-item-section>{{ server.name }}</q-item-section>
  </q-item>
</template>

<script lang="ts">
import {
  RESTAPIPartialCurrentUserGuild,
  RouteBases,
  CDNRoutes,
  ImageFormat,
} from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    server: {
      type: Object as PropType<RESTAPIPartialCurrentUserGuild>,
      required: true,
    },
  },

  computed: {
    iconUrl() {
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

    isActive() {
      const { $route } = this
      return (
        $route.name === 'server-quotes' &&
        $route.params.serverId === this.server.id
      )
    },
  },

  methods: {
    redirectToServerPage() {
      this.$router.push({
        name: 'server-quotes',
        params: {
          serverId: this.server.id,
        },
      })
    },
  },
})
</script>

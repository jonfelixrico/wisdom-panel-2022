<template>
  <q-item clickable @click="redirectToServerPage" :active="isActive">
    <q-item-section avatar>
      <q-avatar>
        <ServerIcon :server="server" />
      </q-avatar>
    </q-item-section>
    <q-item-section>{{ server.name }}</q-item-section>
  </q-item>
</template>

<script lang="ts">
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'
import ServerIcon from 'components/server/ServerIcon.vue'

export default defineComponent({
  components: { ServerIcon },
  props: {
    server: {
      type: Object as PropType<RESTAPIPartialCurrentUserGuild>,
      required: true,
    },
  },

  computed: {
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

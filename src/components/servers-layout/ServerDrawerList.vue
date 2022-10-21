<template>
  <q-scroll-area>
    <ServerDrawerListItem
      v-for="server of servers"
      :server="server"
      :key="server.id"
    />
  </q-scroll-area>
</template>
<script lang="ts">
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'
import ServerDrawerListItem from './ServerDrawerListItem.vue'

export default defineComponent({
  props: {
    servers: {
      type: Array as PropType<RESTAPIPartialCurrentUserGuild[]>,
    },
  },

  components: { ServerDrawerListItem },
})
</script>

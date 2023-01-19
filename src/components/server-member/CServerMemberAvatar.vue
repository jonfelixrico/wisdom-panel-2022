<template>
  <q-avatar :size="size">
    <q-skeleton v-if="!userData?.avatarUrl" type="QAvatar" size="100%" />
    <q-icon v-else :name="`img:${userData?.avatarUrl}`" :size="size" />
  </q-avatar>
</template>

<script lang="ts">
import { userServerMemberStore } from 'src/stores/server-member-store'
import { computed, defineComponent, PropType, toRef, watch } from 'vue'
import { ServerMember } from './server-member.interface'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<ServerMember>,
      required: true,
    },

    size: String,
  },

  setup(props) {
    const store = userServerMemberStore()

    watch(
      toRef(props, 'user'),
      (user) => {
        store.fetchServerMember(user.serverId, user.userId)
      },
      {
        immediate: true,
      }
    )

    return {
      userData: computed(
        () => store.servers[props.user.serverId]?.[props.user.userId]
      ),
    }
  },
})
</script>

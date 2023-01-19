<!-- Displays a server member's username and avatar -->
<template>
  <div class="row items-center">
    <CServerMemberAvatar
      :avatar-url="userData?.avatarUrl"
      :size="avatarSize"
      class="q-mr-xs"
    />

    <slot v-if="userData" :username="userData.username">
      <div
        v-if="usernameClass"
        :class="usernameClass"
        v-text="userData.username"
      />

      <div
        v-else
        class="text-weight-bold text-primary"
        v-text="userData.username"
      />
    </slot>
    <q-skeleton v-else type="text" style="min-width: 50px" />
  </div>
</template>

<script lang="ts">
import { userServerMemberStore } from 'src/stores/server-member-store'
import { computed, defineComponent, onBeforeMount, PropType } from 'vue'
import CServerMemberAvatar from './CServerMemberAvatar.vue'
import { ServerMember } from './server-member.interface'

export default defineComponent({
  components: { CServerMemberAvatar },

  props: {
    user: {
      type: Object as PropType<ServerMember>,
      required: true,
    },

    avatarSize: {
      type: String,
      default: 'sm',
    },

    usernameClass: String,
  },

  setup(props) {
    const store = userServerMemberStore()

    onBeforeMount(() => {
      store.fetchServerMember(props.user.serverId, props.user.userId)
    })

    return {
      userData: computed(
        () => store.servers[props.user.serverId]?.[props.user.userId]
      ),
    }
  },
})
</script>

<template>
  <div v-if="userData" v-bind="$attrs" v-text="userData.username" />
  <q-skeleton
    v-else
    type="text"
    :width="`${skeletonWidth}px`"
    :height="`${skeletonHeight}px`"
  />
</template>

<script lang="ts">
import { userServerMemberStore } from 'src/stores/server-member-store'
import { computed, defineComponent, watch, PropType, toRef } from 'vue'
import { ServerMember } from './server-member.interface'

export default defineComponent({
  /*
   * We're disabling attr inheritance to make parent-level class or style attributes
   * not apply to the skeleton. We want them to apply in the username div only.
   */
  inheritAttrs: false,

  props: {
    user: {
      type: Object as PropType<ServerMember>,
      required: true,
    },

    skeletonWidth: {
      type: Number,
      default: 50,
    },

    skeletonHeight: {
      type: Number,
      default: 16,
    },
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

import { userServerMemberStore } from 'src/stores/server-member-store'
import { computed, toRef, watch } from 'vue'
import { ServerMember } from './server-member.interface'

export function useServerMember(props: { user: ServerMember }) {
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
}

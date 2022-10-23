<template>
  <q-avatar v-if="memberAvatarUrl">
    <q-img :src="memberAvatarUrl" />
  </q-avatar>

  <UserAvatar v-else :user="userObject" />
</template>

<script lang="ts">
import {
  APIGuildMember,
  APIUser,
  CDNRoutes,
  ImageFormat,
} from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'
import UserAvatar from 'components/user/UserAvatar.vue'

export default defineComponent({
  props: {
    member: {
      required: true,
      type: Object as PropType<APIGuildMember>,
    },

    severId: {
      type: String,
      required: true,
    },
  },

  computed: {
    memberAvatarUrl() {
      const { member } = this
      if (!member.avatar) {
        return null
      }

      const supportsGif = member.avatar.startsWith('a_')
      const url = new URL(
        CDNRoutes.guildMemberAvatar(
          this.severId,
          this.userObject.id,
          member.avatar,
          supportsGif ? ImageFormat.GIF : ImageFormat.WebP
        )
      )

      return url.toString()
    },

    userObject() {
      return this.member.user as APIUser
    },
  },

  components: { UserAvatar },
})
</script>

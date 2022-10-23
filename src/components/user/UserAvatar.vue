<template>
  <q-avatar>
    <q-img :src="avatarUrl" />
  </q-avatar>
</template>

<script lang="ts">
import {
  APIUser,
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
  RouteBases,
} from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'

type AvatarProps = Pick<APIUser, 'id' | 'avatar' | 'discriminator'>

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<AvatarProps>,
      required: true,
    },
  },

  computed: {
    avatarUrl() {
      const { user } = this
      let url: URL

      if (user.avatar) {
        url = new URL(
          CDNRoutes.userAvatar(user.id, user.avatar, ImageFormat.WebP),
          RouteBases.cdn
        )
      } else {
        const avatarCode = (parseInt(user.discriminator) %
          5) as DefaultUserAvatarAssets
        url = new URL(CDNRoutes.defaultUserAvatar(avatarCode), RouteBases.cdn)
      }

      return url.toString()
    },
  },
})
</script>

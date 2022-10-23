<template>
  <q-card flat class="q-pa-sm">
    <div class="q-gutter-y-sm">
      <template v-if="quote">
        <div class="text-h4">
          {{ quote.content }}
        </div>

        <i18n-t
          v-if="authorData"
          class="row white-space-pre items-center text-body1"
          tag="div"
          keypath="quote.authorFormat"
        >
          <template #author>
            <div class="row items-center q-gutter-x-xs">
              <ServerMemberAvatar
                :serverId="quote.serverId"
                :member="authorData"
                size="xs"
              />
              <span class="text-weight-bold">{{
                authorData?.nick ?? authorData?.user?.username
              }}</span>
            </div>
          </template>
          <template #year>
            {{ new Date(quote.submitDt).getFullYear() }}
          </template>
        </i18n-t>
        <q-skeleton v-else style="width: 50%" />
      </template>

      <template v-else>
        <q-skeleton type="rect" />
        <q-skeleton type="text" style="width: 50%" />
      </template>
    </div>

    <q-separator class="q-my-sm" />

    <div>
      <i18n-t
        v-if="quote && submitterData"
        keypath="quote.submitterFormat"
        tag="div"
        class="row items-center white-space-pre"
      >
        <template #submitter>
          <div class="row items-center q-gutter-x-xs">
            <ServerMemberAvatar
              :serverId="quote.serverId"
              :member="submitterData"
              size="xs"
            />
            <div class="text-weight-bold">
              {{ submitterData?.nick ?? submitterData?.user?.username }}
            </div>
          </div>
        </template>

        <template #date>{{ quote.submitDt }}</template>
      </i18n-t>
      <q-skeleton v-else />
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Quote } from 'src/types/quote.interface'
import { APIGuildMember } from 'discord-api-types/v10'
import ServerMemberAvatar from 'components/server/ServerMemberAvatar.vue'

export default defineComponent({
  props: {
    quote: {
      type: Object as PropType<Quote>,
    },
    authorData: {
      type: Object as PropType<APIGuildMember | null>,
    },
    submitterData: {
      type: Object as PropType<APIGuildMember | null>,
    },
  },
  components: { ServerMemberAvatar },
})
</script>

<template>
  <q-card flat class="q-pa-sm">
    <div>
      <template v-if="quote">
        <div class="text-h5">{{ quote.content }}</div>

        <i18n-t
          v-if="authorData"
          class="text-caption"
          tag="div"
          keypath="quote.authorFormat"
        >
          <template #author>
            <span class="text-weight-bold">{{
              authorData?.nick ?? authorData?.user?.username
            }}</span>
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
        class="text-caption"
      >
        <template #submitter>
          <span class="text-weight-bold">{{
            submitterData?.nick ?? submitterData?.user?.username
          }}</span>
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
})
</script>

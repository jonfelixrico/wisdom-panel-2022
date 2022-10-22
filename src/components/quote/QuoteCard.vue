<template>
  <q-card flat class="q-pa-sm q-gutter-y-sm">
    <div>
      <template v-if="quote">
        <div class="text-h5">{{ quote.content }}</div>

        <i18n-t
          v-if="author"
          class="text-caption"
          tag="div"
          keypath="quote.authorFormat"
        >
          <template #author>
            <span class="text-weight-bold">{{ author }}</span>
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

    <q-separator />

    <div>
      <i18n-t
        v-if="quote && submitter"
        keypath="quote.submitterFormat"
        tag="div"
        class="text-caption"
      >
        <template #submitter>
          <span class="text-weight-bold">{{ submitter }}</span>
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

export default defineComponent({
  props: {
    quote: {
      type: Object as PropType<Quote>,
    },

    author: {
      type: String as PropType<string | null>,
    },

    submitter: {
      type: String as PropType<string | null>,
    },
  },
})
</script>

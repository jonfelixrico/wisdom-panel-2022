<template>
  <q-card flat>
    <q-card-section>
      <template v-if="quote">
        <div>{{ quote.content }}</div>
        <i18n-t keypath="quote.authorFormat">
          <template #author>
            <span v-if="author !== undefined">{{ author }}</span>
            <q-skeleton v-else />
          </template>
          <template #year>{{ quote.submitDt.getFullYear() }}</template>
        </i18n-t>
      </template>

      <template v-else>
        <q-skeleton type="rect" />
        <q-skeleton type="text" />
      </template>
    </q-card-section>
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

    author: String,
    submitter: String,
  },
})
</script>

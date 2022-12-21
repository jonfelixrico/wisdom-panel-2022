<template>
  <q-card>
    <q-card-section class="row justify-between">
      <i18n-t keypath="quote.submittedByFormat">
        <template #date>
          {{ quote.submitDt }}
        </template>

        <template #user>
          {{ quote.submitterId }}
        </template>
      </i18n-t>

      <span>{{
        $t('quote.receiveCount', {
          count: quote.receives.length,
        })
      }}</span>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<Quote>,
    },
  },
})
</script>

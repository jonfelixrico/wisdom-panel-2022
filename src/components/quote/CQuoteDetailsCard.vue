<template>
  <q-card>
    <q-card-section>
      <div class="row justify-between q-mb-sm">
        <i18n-t keypath="quote.submittedByFormat">
          <template #date>
            {{ quote.submitDt }}
          </template>

          <template #user>
            {{ quote.submitterId }}
          </template>
        </i18n-t>
      </div>

      <div class="row items-center">
        <div class="q-mr-sm">
          {{
            $t('quote.receiveCount', {
              count: receiveCount,
            })
          }}
        </div>

        <template v-if="receiveCount > 0">
          <div
            class="bg-grey col-auto rounded-borders q-px-xs"
            v-for="{ userId, count } in receivesPerUser"
            :key="userId"
          >
            {{ userId }} x {{ count }}
          </div>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
import { defineComponent, PropType } from 'vue'
import { countBy, sortBy } from 'lodash'

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<Quote>,
    },
  },

  computed: {
    receiveCount() {
      return this.quote.receives.length
    },

    receivesPerUser() {
      const grouped = countBy(
        this.quote.receives,
        ({ receiverId }) => receiverId
      )

      const values: { userId: string; count: number }[] = []
      for (const userId in grouped) {
        values.push({
          userId,
          count: grouped[userId],
        })
      }

      return sortBy(values, ['count'], ['asc'])
    },
  },
})
</script>

<template>
  <q-card flat>
    <q-card-section>
      <div class="row q-mb-sm">
        <i18n-t
          keypath="quote.submittedByFormat"
          tag="div"
          class="pre row text-weight-medium items-center"
        >
          <template #date>
            {{ quote.submitDt.toLocaleDateString() }}
          </template>

          <template #user>
            <div class="relative-position q-py-xs q-px-sm">
              <div
                class="absolute-full bg-primary rounded-borders no-pointer-events"
                style="opacity: 0.3"
              />
              <div class="row items-center q-gutter-x-xs">
                <CServerMemberAvatar :user="submitter" size="sm" />
                <CServerMemberName :user="submitter" />
              </div>
            </div>
          </template>
        </i18n-t>
      </div>

      <div class="row items-center q-gutter-xs">
        <div class="text-weight-medium">
          {{
            $t('quote.receiveCount', {
              count: receiveCount,
            })
          }}
        </div>

        <template v-if="receiveCount > 0">
          <CQuoteReceiverChip
            v-for="{ userId, count } in receivesPerUser"
            :user="{ userId, serverId: quote.serverId }"
            :count="count"
            :key="userId"
          />
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
import { defineComponent, PropType } from 'vue'
import { countBy, orderBy } from 'lodash'
import CServerMemberAvatar from '../server-member/CServerMemberAvatar.vue'
import CServerMemberName from '../server-member/CServerMemberName.vue'
import CQuoteReceiverChip from './CQuoteReceiverChip.vue'

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
    submitter() {
      const { quote } = this
      return {
        userId: quote.submitterId,
        serverId: quote.serverId,
      }
    },
    receivesPerUser() {
      const grouped = countBy(this.quote.receives, ({ userId }) => userId)
      const values: {
        userId: string
        count: number
      }[] = []
      for (const userId in grouped) {
        values.push({
          userId,
          count: grouped[userId],
        })
      }
      return orderBy(values, ['count', 'userId'], ['desc', 'asc'])
    },
  },
  components: {
    CServerMemberAvatar,
    CServerMemberName,
    CQuoteReceiverChip,
  },
})
</script>

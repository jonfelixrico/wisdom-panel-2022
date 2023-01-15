<template>
  <q-card>
    <q-card-section>
      <div class="row q-mb-sm">
        <i18n-t
          keypath="quote.submittedByFormat"
          tag="div"
          class="pre row text-weight-bold"
        >
          <template #date>
            {{ quote.submitDt.toLocaleDateString() }}
          </template>

          <template #user>
            <div>
              <CServerMemberChip
                :user="{
                  userId: quote.submitterId,
                  serverId: quote.serverId,
                }"
              />
            </div>
          </template>
        </i18n-t>
      </div>

      <div class="row items-center q-gutter-xs">
        <div class="text-weight-bold">
          {{
            $t('quote.receiveCount', {
              count: receiveCount,
            })
          }}
        </div>

        <template v-if="receiveCount > 0">
          <div
            class="bordered col-auto rounded-borders q-py-xs q-px-sm row pre items-center"
            v-for="{ userId, count } in receivesPerUser"
            :key="userId"
          >
            <CServerMemberChip :user="{ userId, serverId: quote.serverId }" /> x
            {{ count }}
          </div>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
import { defineComponent, PropType } from 'vue'
import { countBy, orderBy } from 'lodash'
import CServerMemberChip from '../server-member/CServerMemberChip.vue'

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
  components: { CServerMemberChip },
})
</script>

<style lang="scss" scoped>
.bordered {
  border: 1px solid $primary;
}
</style>

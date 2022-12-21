<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h3 text-center text-weight-regular">
        "{{ quote.content }}"
      </div>

      <div class="row items-center q-mt-sm q-col-gutter-x-sm">
        <div class="col row justify-end">
          <CServerMemberAvatar
            :user-id="quote.authorId"
            :server-id="quote.serverId"
            size="sm"
          />
        </div>

        <!-- will be positioned in the center -->
        <div class="text-h6 text-weight-regular text-center">
          {{ quote.authorId }}
        </div>

        <!-- needed to position the author name to the center -->
        <div class="col" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
import { defineComponent, PropType } from 'vue'
import CServerMemberAvatar from './server-member/CServerMemberAvatar.vue'

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<Quote>,
    },
  },
  computed: {
    year() {
      return new Date(this.quote.submitDt).getFullYear()
    },
  },
  components: { CServerMemberAvatar },
})
</script>

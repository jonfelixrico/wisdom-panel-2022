<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h3 text-center text-weight-regular">
        "{{ quote.content }}"
      </div>

      <div class="row justify-center q-mt-md">
        <CServerMemberChip
          :user="{
            userId: quote.authorId,
            serverId: quote.serverId,
          }"
          avatar-size="md"
          class="text-h6"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
import { defineComponent, PropType } from 'vue'
import CServerMemberChip from '../server-member/CServerMemberChip.vue'

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<Quote>,
    },
  },

  components: { CServerMemberChip },
})
</script>

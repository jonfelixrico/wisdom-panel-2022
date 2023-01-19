<template>
  <q-card flat>
    <q-card-section>
      <div
        class="text-center text-weight-regular"
        :class="[$q.screen.lg || $q.screen.gt.lg ? 'text-h3' : 'text-h4']"
      >
        "{{ quote.content }}"
      </div>

      <div class="row justify-center q-mt-md">
        <div class="relative-position q-py-xs q-px-sm">
          <div
            class="absolute-full bg-primary rounded-borders no-pointer-events"
            style="opacity: 0.3"
          />
          <div class="row items-center q-gutter-x-sm">
            <CServerMemberAvatar :user="author" size="md" />
            <CServerMemberName :user="author" class="text-h6" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
import { defineComponent, PropType } from 'vue'
import CServerMemberAvatar from '../server-member/CServerMemberAvatar.vue'
import CServerMemberName from '../server-member/CServerMemberName.vue'

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<Quote>,
    },
  },

  computed: {
    author() {
      const { quote } = this

      return {
        userId: quote.authorId,
        serverId: quote.serverId,
      }
    },
  },

  components: { CServerMemberName, CServerMemberAvatar },
})
</script>

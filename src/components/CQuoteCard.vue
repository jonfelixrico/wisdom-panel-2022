<template>
  <q-card flat>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="text-h4 text-center text-weight-light">
          "{{ quote.content }}"
        </div>

        <q-separator />

        <!-- i18nize the format -->
        <div class="row items-center">
          <div class="col row justify-end">
            <q-avatar>
              <q-icon name="person" />
            </q-avatar>
          </div>
          <div class="row justify-center">
            <span class="text-h6 text-weight-regular">
              {{ quote.authorId }}, {{ year }}
            </span>
          </div>

          <div class="col" />
        </div>
      </div>
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

  computed: {
    year() {
      return new Date(this.quote.submitDt).getFullYear()
    },
  },
})
</script>

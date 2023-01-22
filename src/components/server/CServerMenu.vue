<template>
  <q-scroll-area>
    <q-list>
      <CServerMenuItem
        v-for="item of ITEMS"
        :key="item.labelKey"
        :label="$t(item.labelKey)"
        @click="$router.push(item.location)"
        :active="item.moduleKeys.includes(String($route.meta.moduleKey))"
      />
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import { RouteLocationRaw } from 'vue-router'
import { defineComponent } from 'vue'
import CServerMenuItem from './CServerMenuItem.vue'

interface MenuItem {
  labelKey: string
  location: Partial<RouteLocationRaw>
  moduleKeys: string[]
}

const ITEMS: MenuItem[] = [
  {
    labelKey: 'server.menuItems.quoteList',
    location: {
      name: 'sever-quote-list',
    },
    moduleKeys: ['quote-list'],
  },
]

export default defineComponent({
  components: { CServerMenuItem },

  setup() {
    return {
      ITEMS,
    }
  },
})
</script>

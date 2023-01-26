<template>
  <q-scroll-area>
    <q-list>
      <CServerNavigationItem
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
import CServerNavigationItem from './CServerNavigationItem.vue'

interface MenuItem {
  labelKey: string
  location: Partial<RouteLocationRaw>
  moduleKeys: string[]
}

const ITEMS: MenuItem[] = [
  {
    labelKey: 'server.menuItems.quoteList',
    location: {
      name: 'server-quote-list',
    },
    moduleKeys: ['quote-list'],
  },
]

export default defineComponent({
  components: { CServerNavigationItem },

  setup() {
    return {
      ITEMS,
    }
  },
})
</script>

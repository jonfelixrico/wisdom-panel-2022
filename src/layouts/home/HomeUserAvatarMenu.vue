<template>
  <q-skeleton v-if="!user" type="QAvatar" style="cursor: not-allowed" />

  <q-btn v-else round>
    <UserAvatar :user="user" />
    <q-menu>
      <q-list dense>
        <q-item>
          <q-item-section>
            <i18n-t
              keypath="user.session.greetFormat"
              tag="div"
              class="text-no-wrap"
            >
              <template #name>
                <span class="text-weight-bold">{{ user.username }}</span>
              </template>
            </i18n-t>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable>
          <q-item-section class="text-negative text-weight-bold">
            {{ $t('user.session.logOut') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import UserAvatar from 'src/components/user/UserAvatar.vue'
import { useDiscordStore } from 'src/stores/discord-store'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: { UserAvatar },
  setup() {
    const discord = useDiscordStore()
    const user = computed(() => discord.user)

    return {
      user,
    }
  },
})
</script>

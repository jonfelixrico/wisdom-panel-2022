import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: {
          name: 'auth-discord',
        },
      },
      {
        path: 'auth/discord',
        children: [
          {
            name: 'auth-discord',
            path: '',
            component: () => import('pages/auth/DiscordAuthPage.vue'),
          },
          {
            path: 'redirect',
            component: () => import('pages/auth/DiscordAuthPage.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

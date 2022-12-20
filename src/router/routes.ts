import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        redirect: {
          name: 'login',
        },
        name: 'index',
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        name: 'discord-oauth-callback',
        path: 'auth/oauth/discord/callback',
        component: () => import('pages/DiscordAuthCallbackPage.vue'),
      },
      {
        name: 'receive-preview',
        path: '/preview/server/:serverId/receive/:receiveId',
        component: () =>
          import('pages/preview/receive/ReceiveQuickPreviewPage.vue'),
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

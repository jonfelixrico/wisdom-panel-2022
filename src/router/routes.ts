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
      // TODO remove once we have a proper home page
      {
        path: 'home',
        redirect: {
          name: 'landing-page',
        },
        name: 'home',
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
        path: '/preview/server/:serverId/quote/:quoteId',
        component: () =>
          import('pages/preview/receive/ReceiveQuickPreviewPage.vue'),
      },
    ],
  },

  // TODO remove once we have a proper home page
  {
    path: 'landing',
    name: 'landing-page',
    component: () => import('pages/LandingPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

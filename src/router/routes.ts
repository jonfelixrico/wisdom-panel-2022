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
        name: 'login',
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          isPublicRoute: true,
        },
      },
      {
        name: 'discord-oauth-callback',
        path: 'auth/oauth/discord/callback',
        component: () => import('pages/DiscordAuthCallbackPage.vue'),
        meta: {
          isPublicRoute: true,
        },
      },
      {
        name: 'receive-preview',
        path: '/preview/server/:serverId/quote/:quoteId',
        component: () =>
          import('pages/preview/receive/ReceiveQuickPreviewPage.vue'),
      },
    ],
  },

  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    name: 'home',
    children: [
      {
        path: '',
        name: 'select-server',
        component: () => import('pages/SelectAServerPage.vue'),
      },
    ],
  },

  // TODO remove once we have a proper home page
  {
    path: '/landing',
    name: 'landing-page',
    component: () => import('pages/LandingPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      isPublicRoute: true,
    },
  },
]

export default routes

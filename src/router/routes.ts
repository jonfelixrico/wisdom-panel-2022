import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'home-index',
        redirect: {
          name: 'home-servers',
        },
      },
      {
        path: 'servers',
        name: 'home-servers',
        component: () => import('layouts/ServersLayout.vue'),
        children: [
          {
            path: '',
            name: 'servers-index',
            component: () => import('pages/home/servers/ServersIndexPage.vue'),
          },
        ],
      },
    ],
  },
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

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('layouts/home/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'home-index',
        redirect: {
          name: 'server-index',
        },
      },
      {
        path: 'servers',
        component: () => import('pages/home/servers/ServerSelectionPage.vue'),
        children: [
          {
            path: '',
            name: 'server-index',
            component: () => import('pages/home/servers/ServersIndexPage.vue'),
          },
          {
            path: ':serverId',
            name: 'server-details',
            component: () => import('pages/home/servers/ServerDetailsPage.vue'),
            children: [
              {
                path: '',
                redirect: 'server-quotes',
              },
              {
                path: 'quotes',
                name: 'server-quotes',
                component: () =>
                  import('pages/home/servers/ServerQuotesPage.vue'),
              },
            ],
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
          name: 'home',
        },
        name: 'index',
        meta: {
          publicRoute: true,
        },
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          publicRoute: true,
        },
      },
      {
        name: 'discord-oauth-callback',
        path: 'auth/oauth/discord/callback',
        component: () => import('pages/DiscordAuthCallbackPage.vue'),
        meta: {
          publicRoute: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      publicRoute: true,
    },
  },
]

export default routes

import { RouteRecordRaw } from 'vue-router';
import AuthRouter from '../modules/auth/router';
import MovieRouter from '../modules/movies/router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    ...AuthRouter,
  },
  {
    path: '/movies',
    ...MovieRouter,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

import { RouteRecordRaw } from 'vue-router';
import AuthRouter from '../modules/auth/router';
import MovieRouter from '../modules/movies/router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/auth',
    ...AuthRouter,
  },
  {
    path: '/movies',
    ...MovieRouter,
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;

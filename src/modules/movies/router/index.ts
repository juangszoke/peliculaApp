import { RouteLocationNormalized } from 'vue-router';

export default {
  name: 'movies',
  component: () => import('../../../layouts/MainLayout.vue'),
  children: [
    {
      name: 'index',
      path: '',
      component: () => import('../../movies/views/IndexMovies.vue'),
    },
    {
      name: 'movieDetails',
      path: '/movies/:id',
      component: () => import('../components/MovieDetails.vue'),
      props: (route: RouteLocationNormalized) => ({ id: route.params.id }),
    },
    {
      name: 'favoriteMovies',
      path: '/movies/favorites',
      component: () => import('../components/FavoriteMovies.vue'),
    },
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('../components/ProfileAccount.vue'),
    },
  ],
};

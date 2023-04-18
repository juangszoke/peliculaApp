export default {
  name: 'auth',
  children: [
    {
      path: '',
      meta: {
        notAuth: true,
      },
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: 'register',
      meta: {
        notAuth: true,
      },
      name: 'register',
      component: () => import('../views/RegisterPage.vue'),
    },
  ],
};

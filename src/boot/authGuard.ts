import { boot } from 'quasar/wrappers';

export default boot(async ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/getUser'];
    
    if (to.meta.requiredAuth && !isAuthenticated) {
      next('/movies');
    } else if( to.meta.notAuth && isAuthenticated){
      next('/movies')
    }
      else {
      next();
    }
  });
});

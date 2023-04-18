import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
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

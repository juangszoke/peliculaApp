<template>
  <div class="window-height window-width column justify-center items-center">
    <q-card class="login-card q-pa-md">
      <q-card-section class="column flex items-center q-px-none">
        <h4 class="q-ma-none text-bold">Login</h4>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-none">
        <p class="q-mb-xs q-mt-lg text-bold">Usuario</p>
        <q-input
          class="q-ma-none"
          outlined
          v-model="user"
          dense
          placeholder="Ingresa tu usuario"
          :rules="[(val) => !!val || 'Debes ingresar tu usuario']"
        />
        <p class="q-mb-xs q-mt-md text-bold">Clave</p>
        <q-input
          outlined
          v-model="password"
          placeholder="Ingresa tu contraseña"
          type="password"
          dense
          :rules="[(val) => !!val || 'Debes ingresar tu contraseña']"
        />
      </q-card-section>
      <q-card-section class="q-px-none q-py-md q-pt-none">
        <q-btn
          @click="Onlogin"
          class="full-width"
          color="primary"
          label="Login"
        >
        </q-btn>
      </q-card-section>
    </q-card>
    <div class="row">
      <router-link class="q-pa-md enlace" to="/auth/register">
        <q-btn color="primary">register</q-btn>
      </router-link>
      <router-link class="q-pa-md enlace" to="/movies">
        <q-btn color="primary">inicio</q-btn>
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { useQuasar, QVueGlobals } from 'quasar';

interface MyComponentState {
  user: string;
  password: string;
  error: boolean;
   $q: QVueGlobals  
}

export default defineComponent({
  name: 'LoginPage',

  data(): MyComponentState {
    const $q = useQuasar()
    return {
      user: '',
      password: '',
      error: false,
      $q
    };
  },

  methods: {
    ...mapActions('auth', ['login']),
    async Onlogin() {
      const user = this.user;
      const password = this.password;
      const redirect =
        this.getMovieId !== undefined
          ? `/movies/${this.getMovieId}`
          : '/movies';
      try {
        this.error = await this.login({
          user,
          password,
          redirect: redirect,
        });

        if(this.error){
           this.$q.notify({
              type: 'negative',
              message: 'Usuario o clave incorrecta'
            })
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters('movie', ['getMovieId']),
  },
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 30%;
  min-width: 300px;
}

@media only screen and (max-width: 700px) {
  .login-card {
    width: 58%;
    min-width: none;
  }
}

.enlace {
  text-decoration: none;
}

.enlace:visited {
  color: black;
}
</style>

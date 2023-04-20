<template>
  <div class="q-mt-md flex justify-center items-center">
    <q-card class="login-card q-pa-md">
      <q-card-section class="column flex items-center q-px-none">
        <h4 class="q-ma-none text-bold">Register</h4>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-none">
        <div class="row flex justify-center">
          <div class="column q-px-md inputs-column">
            <p class="q-mb-xs text-bold">Nombre</p>
            <q-input
              class="q-ma-none inputs"
              outlined
              v-model="user.name"
              dense
              placeholder="Ingresa tu nombre"
              :rules="[(val) => !!val || 'Debes ingresar tu nombre']"
            />
            <p class="q-mb-xs text-bold">Usuario</p>
            <q-input
              class="q-ma-none inputs"
              outlined
              v-model="user.user"
              dense
              placeholder="Ingresa un usuario"
              :rules="[(val) => !!val || 'Debes ingresar un usuario']"
            />
            <p class="q-mb-xs text-bold">Email</p>
            <q-input
              class="q-ma-none inputs"
              outlined
              type="email"
              v-model="user.email"
              dense
              placeholder="Ingresa tu correo"
              :rules="[(val) => !!val || 'Debes ingresar correo']"
            />
            <p class="q-mb-xs text-bold">Clave</p>
            <q-input
              class="inputs"
              outlined
              v-model="user.password"
              placeholder="Ingresa una contraseña"
              type="password"
              dense
              :rules="[(val) => !!val || 'Debes ingresar una contraseña']"
            />
          </div>
          <div class="column q-px-md inputs-column">
            <p class="q-mb-xs text-bold">Telefono</p>
            <q-input
              class="q-ma-none inputs"
              outlined
              v-model="user.phone_number"
              type="number"
              dense
              placeholder="Ingresa tu numero"
              :rules="[(val) => !!val || 'Debes ingresar tu numero']"
            />
            <p class="q-mb-xs text-bold">Pais</p>
            <q-select
              class="q-ma-none inputs"
              outlined
              v-model="user.country"
              dense
              placeholder="Selecciona tu pais"
              :rules="[(val) => !!val || 'Debes seleccionar un pais']"
              :options="countries"
            >
            </q-select>

            <p class="q-mb-xs text-bold">Ciudad</p>
            <q-input
              class="q-ma-none inputs"
              outlined
              v-model="user.city"
              dense
              placeholder="Ingresa tu ciudad"
              :rules="[(val) => !!val || 'Debes ingresar la ciudad']"
            />
            <p class="q-mb-xs text-bold">Genero</p>
            <q-input
              class="inputs"
              outlined
              v-model="user.genre"
              placeholder="Ingresa tu genero favorito"
              dense
              :rules="[(val) => !!val || 'Debes un genero favorito']"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-px-none q-py-md q-pt-none flex justify-center">
        <q-btn @click="submitForm" color="primary" label="register"> </q-btn>
      </q-card-section>
      <q-card-section class="row reverse q-py-none">
        <router-link class="q-pa-md enlace" to="/auth">
          <q-btn flat color="primary">Log in</q-btn>
        </router-link>
        <p v-if="error">usuario ya registrado</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { COUNTRIES } from '@/helpers/countries';
export default defineComponent({
  name: 'RegisterPage',

  data() {
    return {
      user: {
        name: null,
        user: null,
        email: null,
        password: null,
        phone_number: null,
        country: null,
        city: null,
        genre: null,
        error: null,
      },
      countries: COUNTRIES,
    };
  },
  methods: {
    ...mapActions('auth', ['register']),
    submitForm() {
      this.error = this.register(this.user);
    },
  },
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 50%;
}

.enlace {
  text-decoration: none;
}

.enlace:visited {
  color: black;
}

.inputs {
  width: 225px;
}

.inputs-column {
  margin-top: 16px;
}

.register {
  height: 100%;
}

@media only screen and (max-width: 1150px) {
  .login-card {
    width: 50%;
    min-width: none;
  }
  .inputs {
    width: 100%;
  }
  .inputs-column {
    width: 100%;
    margin-top: 0px;
  }
}
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Filtros
          <filter-movies />
        </q-toolbar-title>
        <template v-if="nombre">
          <q-toolbar-title> Bienvenido {{ nombre }} </q-toolbar-title>

          <q-toggle
            class="q-mr-md"
            v-model="mode"
            color="white"
            label="Dark mode"
          />
          <q-btn flat @click="OnLogOut">Cerrar sesion</q-btn>
        </template>

        <template v-else>
          <q-toolbar-title> Bienvenido </q-toolbar-title>
          <q-toggle
            class="q-mr-md"
            v-model="mode"
            color="white"
            label="Dark mode"
          />
          <q-btn flat @click="login">Login</q-btn>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Peliculas app </q-item-label>
        <q-item @click="resetMovieActual" to="/movies" clickable v-ripple exact>
          <q-item-section> Home </q-item-section>
        </q-item>
        <q-item
          @click="resetMovieActual"
          to="/movies/favorites"
          clickable
          v-ripple
          v-if="getUser"
        >
          <q-item-section> Favoritas </q-item-section>
        </q-item>
        <q-item
          @click="resetMovieActual"
          to="/profile"
          clickable
          v-ripple
          v-if="getUser"
        >
          <q-item-section> Perfil </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import FilterMovies from '@/modules/movies/components/FilterMovies.vue';

interface MyComponentState {
  linksList: items[];
  nombre: string;
  leftDrawerOpen: boolean;
  mode: boolean;
}

interface items {
  title: string;
  link: string;
}

export default defineComponent({
  name: 'MainLayout',
  components: {
    FilterMovies,
  },
  data(): MyComponentState {
    return {
      leftDrawerOpen: false,
      linksList: [],
      nombre: '',
      mode: false,
    };
  },
  methods: {
    ...mapMutations('auth', ['logout']),
    ...mapMutations('movie', ['setDefaultValue']),
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    OnLogOut() {
      this.logout();
      this.$router.push('/auth');
    },
    login() {
      this.$router.push('/auth');
    },
    resetMovieActual() {
      this.setDefaultValue();
    },
    toggleDarkMode() {
      this.mode = !this.mode;
     
    },
  },
  computed: {
    ...mapGetters('auth', ['getName']),
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('movie', ['getMovieId']),
  },
  watch: {
    getName(newVal) {
      this.nombre = newVal;
    },
    mode(newVal) {
      this.$q.dark.set(newVal);
    },
  },
  created() {
    this.nombre = this.getName;
  },
});
</script>

<style scoped></style>

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

        <template v-if="nombre">
          <q-toolbar-title> Bienvenido {{ nombre }} </q-toolbar-title>
          <q-btn flat @click="OnLogOut">Cerrar sesion</q-btn>
        </template>
        <template v-else>
          <q-toolbar-title> Bienvenido </q-toolbar-title>
          <q-btn flat @click="login">Login</q-btn>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Peliculas app </q-item-label>
        <q-item
          @click="resetMovieActual"
          v-for="link in linksList"
          :key="link.title"
          :to="link.link"
          clickable
          v-ripple
        >
          <q-item-section>
            {{ link.title }}
          </q-item-section>
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

interface MyComponentState {
  linksList: items[];
  nombre: string;
  leftDrawerOpen: boolean;
}

interface items {
  title: string;
  link: string;
}

export default defineComponent({
  name: 'MainLayout',

  data(): MyComponentState {
    return {
      leftDrawerOpen: false,
      linksList: [],
      nombre: '',
    };
  },

  mounted() {
    this.linksList = [
      {
        title: 'Home',
        link: '/movies',
      },
      {
        title: 'Favoritas',
        link: '/movies/favorites',
      },
      {
        title: 'Perfil',
        link: '/profile',
      },
    ];
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
  },
  created() {
    this.nombre = this.getName;
  },
});
</script>

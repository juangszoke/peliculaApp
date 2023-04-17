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
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
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
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksList,
      nombre: '',
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
  },
  computed: {
    ...mapGetters('auth', ['getName']),
    ...mapGetters('movie', ['getMovieId']),
  },
  created() {
    this.nombre = this.getName;
  },
});
</script>

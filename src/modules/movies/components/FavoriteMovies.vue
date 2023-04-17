<template>
  <h3 class="q-my-none q-ml-md q-mt-md">
    Peliculas favoritas de {{ getName }}
  </h3>

  <div class="row wrap">
    <q-card
      class="cards q-ma-md"
      v-for="(movie, index) in moviesinfo"
      :key="index"
    >
      <q-card-section class="flex justify-center">
        <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }">
          <q-img
            width="120px"
            height="180px"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          />
        </router-link>
      </q-card-section>
      <q-card-section class="q-ma-none"
        ><h6 class="q-my-none q-pb-md">{{ movie.title }}</h6>
        <p class="q-mb-none">Calificación: {{ movie.vote_average }}</p>
        <p>Fecha de estreno: {{ movie.release_date }}</p>
      </q-card-section>
      <q-icon
        @click="deleteMovie(index)"
        class="q-pa-md items-center icon"
        name="delete"
        color="red"
        size="md"
      />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import authService from '@/services/auth.services';
import movieServices from '@/services/movies.services';
import Movies from '@/interfaces/movies';
import moviesFav from '@/interfaces/moviesFav';

interface MyComponentState {
  moviesinfo: Movies[];
  user: string;
  movies: moviesFav[];
}

export default defineComponent({
  name: 'FavoriteMovies',

  data(): MyComponentState {
    return {
      user: '',
      movies: [],
      moviesinfo: [],
    };
  },

  computed: {
    ...mapGetters('auth', ['getName']),
    ...mapGetters('auth', ['getUser']),
  },
  methods: {
    async deleteMovie(id: number) {
      await authService.removeMovie(this.movies[id].id.toString());
      console.log(id);
      console.log(this.movies);
      if (id === 0) {
        this.movies.shift();
      } else {
        this.movies.splice(id, 1);
      }
      console.log(this.movies);
      this.moviesinfo = await movieServices.getMoviesFavorites(this.movies);
    },
  },

  async created() {
    this.movies = await authService.movieByUser(this.getUser);
    this.moviesinfo = await movieServices.getMoviesFavorites(this.movies);
  },
});
</script>

<style scoped>
.cards {
  width: 220px;
  height: auto;
}
.icon:hover {
  cursor: pointer;
}
</style>

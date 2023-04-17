<template>
  <h3 class="q-my-none">Popular movies</h3>
  <div class="row justify-center">
    <div class="col-md-2">
      <q-chip
        v-for="(genre, index) in genres"
        :key="genre.id"
        :color="isSelected(index) ? 'primary' : 'grey-5'"
        @click="toggleChip(index)"
        clickable
      >
        {{ genre.name }}
      </q-chip>

      <q-btn @click="filter">buscar</q-btn>
    </div>
    <div class="col-md-10">
      <div class="row justify-center">
        <q-card
          class="cards q-ma-md"
          v-for="(movie, index) in populares"
          :key="index"
        >
          <q-card-section class="flex justify-center">
            <router-link
              :to="{ name: 'movieDetails', params: { id: movie.id } }"
            >
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
        </q-card>
      </div>
    </div>
  </div>
  <q-btn color="primary" @click="newPage"> ver mas </q-btn>
</template>

<script lang="ts">
import moviesService from '../../../services/movies.services';
import Movies from '../../../interfaces/movies';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

interface MyComponentState {
  populares: Movies[];
  page: number;
  genres: Genre[];
  selectedGenres: number[];
}

interface Genre {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'PopularMovies',
  data(): MyComponentState {
    return {
      populares: [],
      page: 1,
      genres: [
        {
          id: 28,
          name: 'Acción',
        },
        {
          id: 12,
          name: 'Aventura',
        },
        {
          id: 16,
          name: 'Animación',
        },
        {
          id: 35,
          name: 'Comedia',
        },
        {
          id: 80,
          name: 'Crimen',
        },
        {
          id: 99,
          name: 'Documental',
        },
        {
          id: 18,
          name: 'Drama',
        },
        {
          id: 10751,
          name: 'Familia',
        },
        {
          id: 14,
          name: 'Fantasía',
        },
        {
          id: 36,
          name: 'Historia',
        },
        {
          id: 27,
          name: 'Terror',
        },
        {
          id: 10402,
          name: 'Música',
        },
        {
          id: 9648,
          name: 'Misterio',
        },
        {
          id: 10749,
          name: 'Romance',
        },
        {
          id: 878,
          name: 'Ciencia ficción',
        },
        {
          id: 10770,
          name: 'Película de TV',
        },
        {
          id: 53,
          name: 'Suspenso',
        },
        {
          id: 10752,
          name: 'Bélica',
        },
        {
          id: 37,
          name: 'Western',
        },
      ],
      selectedGenres: [],
    };
  },
  methods: {
    ...mapMutations('movie', ['setDefaultValue']),
    async newPage() {
      this.page += 1;
      if (this.selectedGenres.length === 0) {
        const respuesta: Movies[] = await moviesService.getPopular(this.page);
        this.populares = [...this.populares, ...respuesta];
      } else {
        const respuesta: Movies[] = await moviesService.getPopularByGenres(
          this.selectedGenres,
          this.page
        );
        this.populares = [...this.populares, ...respuesta];
      }
    },
    toggleChip(index: number) {
      const chipIndex = this.selectedGenres.indexOf(this.genres[index].id);
      if (chipIndex === -1) {
        this.selectedGenres.push(this.genres[index].id);
      } else {
        this.selectedGenres.splice(chipIndex, 1);
      }
    },
    isSelected(index: number) {
      return this.selectedGenres.includes(this.genres[index].id);
    },
    async filter() {
      this.page = 1;
      if (this.selectedGenres.length === 0) {
        this.populares = await moviesService.getPopular(this.page);
      } else {
        this.populares = await moviesService.getPopularByGenres(
          this.selectedGenres,
          this.page
        );
      }
    },
  },

  async mounted() {
    this.populares = await moviesService.getPopular(this.page);
  },
});
</script>

<style scoped>
.cards {
  width: 220px;
  height: auto;
}
</style>

<template>
  <q-card class="movie-details">
    <div class="movie-details__wrapper">
      <div class="movie-details__image-container">
        <q-img
          :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`"
          alt="Poster"
          class="movie-details__image"
        />
      </div>
      <div class="movie-details__info-container">
        <div class="movie-details__text-h6">
          {{ movieDetails.original_title }}
        </div>
        <div class="movie-details__label">director:</div>
        <div v-if="director?.name" class="movie-details__text-subtitle1">
          {{ director.name }}
        </div>
        <div class="movie-details__label">Fecha de estreno:</div>
        <div class="movie-details__text-subtitle1">
          {{ movieDetails.release_date }}
        </div>
        <div class="movie-details__label">Géneros:</div>
        <div class="movie-details__text-body1">
          <span v-for="(genre, index) in movieDetails.genres" :key="index">
            {{ genre.name }}
            <span v-if="index < movieDetails.genres.length - 1">, </span>
          </span>
        </div>
        <div class="movie-details__label">Sinopsis:</div>
        <div class="movie-details__text-body1">{{ movieDetails.overview }}</div>

        <div class="row">
          <div class="column">
            <div class="movie-details__label">Clasificación:</div>
            <div class="movie-details__text-body1">
              {{
                movieDetails.adult
                  ? 'Solo para adultos'
                  : 'Apto para todo público'
              }}
            </div>
          </div>
          <div class="column q-pl-lg">
            <div class="movie-details__label">Calificacion:</div>
            <div class="movie-details__text-body1">
              {{ movieDetails.vote_average }}
            </div>
          </div>
          <div class="column q-pl-lg">
            <div class="movie-details__label">Calificacion de usuarios:</div>
            <div class="movie-details__text-body1">
              {{ movieDetails.vote_average }}
            </div>
          </div>
        </div>

        <div class="justify-end">
          <q-btn v-if="!loadButton" @click="addfavorites" color="secondary"
            >añadir a favoritos</q-btn
          ><q-btn v-else @click="addfavorites" color="secondary"
            >quitar de favoritos</q-btn
          >
          <q-btn class="q-ml-md" color="secondary"
            >califica esta pelicula</q-btn
          >
        </div>
      </div>
    </div>
  </q-card>
  <h3 class="q-mb-md q-mt-xl q-ml-lg">Actors</h3>
  <div class="actor-list q-pa-md">
    <div class="actor-row" v-for="(actor, index) in actors.cast" :key="index">
      <q-img
        class="actor-image"
        :src="`${
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : require('@/assets/no-image.png')
        }`"
      />
      <div class="actor-info">
        <div class="actor-name">{{ actor.name }}</div>
        <div class="actor-character">{{ actor.character }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moviesService from '../../../services/movies.services';
import Movies from '@/interfaces/movies';
import { mapGetters, mapMutations } from 'vuex';
import authService from '@/services/auth.services';

interface Actors {
  id: number;
  cast: [];
  crew: crewmate[];
}
interface crewmate {
  job: string;
  name: string;
}

interface MyComponentState {
  movieDetails: Movies;
  actors: Actors;
  director: crewmate | undefined;
  loadButton: boolean;
  idForRemove: number;
  trailers: any[];
}

export default defineComponent({
  name: 'MovieDetails',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data():MyComponentState {
    return {
      movieDetails: {} as Movies,
      actors: {} as Actors,
      director: undefined,
      trailers: [],
      loadButton: false,
      idForRemove: -1,
    };
  },
  methods: {
    ...mapMutations('movie', ['setMovieId']),
    ...mapMutations('movie', ['setDefaultValue']),

    backToIndex() {
      this.setDefaultValue();
      this.$router.push('/movies');
    },

    async addfavorites() {
      
      if (this.getId.toString() && !this.loadButton) {
        await authService.addMovie(this.id, this.getId.toString());
        this.loadButton = !this.loadButton;
      } else if (this.getId.toString() && this.loadButton) {
        this.idForRemove = await authService.reviewMovie(this.id, this.getId.toString());
        await authService.removeMovie(this.idForRemove.toString());
        this.loadButton = !this.loadButton;
      } else {
        console.log('no está loggeado');
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('auth', ['getId']),
  },
  async mounted() {
    this.movieDetails = await moviesService.getByidMovie(this.id);
    this.actors = await moviesService.getActorsByMovie(this.id);
    this.trailers = await moviesService.getTrailersByMovie(this.id);
    
    this.director = this.actors.crew.find(
      (member) => member.job === 'Director'
    );

    this.idForRemove = await authService.reviewMovie(this.id, this.getId.toString());
    console.log(this.idForRemove);
    this.loadButton = this.idForRemove !== -1;

    this.setMovieId(this.id);
  },
});
</script>
<style scoped>
.movie-details {
  background-color: #9e2a2b;
  color: white;
}

.movie-details__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.movie-details__image-container {
  width: 40%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.movie-details__image {
  max-width: 60%;
  max-height: 100%;
}

.movie-details__info-container {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.movie-details__label {
  font-weight: bold;
  margin-top: 20px;
}

.movie-details__text-h6 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.movie-details__text-subtitle1 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.movie-details__text-body1 {
  font-size: 1rem;
  margin-bottom: 20px;
}

.movie-details__button {
  margin-top: 20px;
}

.actor-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.actor-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  flex: 0 0 auto;
}
.actor-image {
  height: 200px;
  width: 150px;
  object-fit: cover;
  margin-right: 10px;
}

.actor-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  text-align: center;
}

.actor-name {
  font-size: 14px;
  font-weight: bold;
}

.actor-character {
  font-size: 12px;
  color: #666;
}
</style>

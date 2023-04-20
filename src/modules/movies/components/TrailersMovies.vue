<template>
  <h3>Trailers</h3>
  <q-carousel
    v-model="slide"
    transition-prev="scale"
    transition-next="scale"
    swipeable
    animated
    control-color="white"
    navigation
    padding
    arrows
    class="slider text-white shadow-1 rounded-borders q-mt-md"
    v-if="trailers"
  >
    <q-carousel-slide
      v-for="trailer in trailers"
      :key="trailer.id"
      :name="trailer.name"
      class="column no-wrap flex-center"
    >
      <div class="q-pb-md text-h6">{{ trailer.name }}</div>
      <div class="column q-mt-md text-center ron">
        <qrcode
          :value="`https://www.youtube.com/watch?v=${trailer.key}`"
        ></qrcode>

        <q-btn
          class="q-mt-md"
          color="secondary"
          tag="a"
          :href="`https://www.youtube.com/watch?v=${trailer.key}`"
          target="_blank"
          >Abrir Trailer</q-btn
        >
      </div>
    </q-carousel-slide>
  </q-carousel>
  <p v-if="error">No hay trailers para esta pelicula</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moviesService from '../../../services/movies.services';
import VueQrcode from 'vue-qrcode';

interface MyComponentState {
  trailers: Trailer[];
  slide: string;
  error: boolean;
}

interface Trailer {
  name: string;
}
export default defineComponent({
  name: 'TrailersMovies',
  components: {
    qrcode: VueQrcode,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data(): MyComponentState {
    return {
      trailers: [],
      slide: '',
      error: false,
    };
  },
  async mounted() {
    this.trailers = await moviesService.getTrailersByMovie(this.id);

    if (this.trailers.length > 5) {
      this.trailers = this.trailers.slice(0, 5);
    } else if (this.trailers) {
      this.trailers = this.trailers.slice(0, this.trailers.length);
    }
    if (this.trailers[0]) this.slide = this.trailers[0].name;
    else this.error = true;
  },
});
</script>

<style scoped>
.slider {
  background-color: #9e2a2b;
  height: auto;
}
.ron {
  width: 150px;
}
h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem;
}
h6 {
  font-weight: bold;
}
</style>

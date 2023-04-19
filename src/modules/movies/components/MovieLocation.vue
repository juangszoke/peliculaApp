<template>
  <h3>Ubicacion</h3>
  <q-toggle class="q-mr-md" v-model="mode" color="white" label="users" />

  <div v-if="!mode" class="mapita">
    <l-map ref="map" v-model:zoom="zoom" :center="[50, 10]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      >
      </l-tile-layer>
      <l-marker
        v-for="(coordinate, index) in coordinates"
        :key="index"
        :lat-lng="coordinate"
        draggable
      >
        <l-tooltip> Productor </l-tooltip>
      </l-marker>
    </l-map>
  </div>

  <div v-else class="mapita">
    <l-map ref="map" v-model:zoom="zoom" :center="[50, 10]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      >
      </l-tile-layer>
      <l-marker
        v-for="(vote, index) in votes"
        :key="index"
        :lat-lng="coordinates_users[index]"
        draggable
      >
        <l-tooltip> {{ names[index] }} {{ vote.value }} </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import Movies from '@/interfaces/movies';
import { defineComponent } from 'vue';
import moviesService from '@/services/movies.services';
import mapCoordinatesService from '@/services/mapCoordinates.services';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png'; // Ruta correcta al archivo de imagen del ícono de marcador
import 'leaflet/dist/images/marker-shadow.png';
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import votes from '@/interfaces/votes';
import { mapMutations, mapGetters } from 'vuex';

interface MyComponentState {
  movieDetails: Movies;
  zoom: number;
  coordinates: L.LatLngExpression[];
  votes: votes[];
  users: string[] | undefined;
  mode: boolean;
  info: information[];
  names: string[];
  coordinates_users: L.LatLngExpression[];
}

interface information {
  value: number;
  name: string;
  coordinates: L.LatLngExpression[];
}

export default defineComponent({
  name: 'MovieLocation',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data(): MyComponentState {
    return {
      movieDetails: {} as Movies,
      zoom: 2,
      coordinates: [],
      votes: [],
      users: [],
      mode: false,
      info: [],
      names: [],
      coordinates_users: [],
    };
  },
  methods: {
    ...mapMutations('movie', ['setShouldUpdate']),
    async loadCountryProductor() {
      this.movieDetails = await moviesService.getByidMovie(this.id);

      const productionCountryNames = this.movieDetails.production_countries.map(
        (country) => country.name
      );

      for (const country of productionCountryNames) {
        const localizacion_aux = await mapCoordinatesService.getCoordinates(
          country
        );

        if (localizacion_aux)
          this.coordinates.push(
            L.latLng(localizacion_aux[0], localizacion_aux[1])
          );
      }
    },

    async loadUsers() {
      this.votes = await mapCoordinatesService.userVotes(this.id);
      if (this.votes) {
        for (const vote of this.votes) {
          this.users = await mapCoordinatesService.getUsers(vote.userId);
          if (this.users) {
            this.names.push(this.users[0]);
            const localizacion_aux = await mapCoordinatesService.getCoordinates(
              this.users[1]
            );

            if (localizacion_aux)
              this.coordinates_users.push(
                L.latLng(localizacion_aux[0], localizacion_aux[1])
              );
          }
        }
      }
    },
  },
  async mounted() {
    this.loadCountryProductor();
    this.loadUsers();
  },
  computed: {
    ...mapGetters('movie', ['getShouldUpdate']),
  },
  watch: {
    getShouldUpdate() {
      this.loadUsers();
    },
  },
});
</script>

<style scoped>
.mapita {
  height: 550px;
  width: 800px;
}
</style>

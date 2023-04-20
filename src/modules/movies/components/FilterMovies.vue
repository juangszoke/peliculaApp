<template>
  <q-menu v-model="showMenu" class="ron" align="center">
    <q-list class="ron">
      <q-item>
        <div class="row full-width">
          <div class="column">Año de lanzamiento</div>
          <div class="column full-width">
            <q-input
              outlined
              type="number"
              v-model="year"
              label="Año de estreno"
            />
          </div>
        </div>
      </q-item>

      <q-item>
        <div class="row full-width">
          <div class="column">Generos</div>
          <div class="column full-width">
            <q-option-group
              name="genres"
              v-model="accepted"
              :options="options"
              type="checkbox"
              color="primary"
              inline
              dense
              size="sm"
            />
          </div>
        </div>
      </q-item>

      <q-item>
        <div class="row full-width">
          <div class="column">
            Calificación: {{ calificacion.min }} a {{ calificacion.max }}
          </div>
          <div class="column full-width">
            <q-range v-model="calificacion" :min="0" :max="10" />
          </div>
        </div>
      </q-item>
      <q-item>
        <div class="row full-width">
          <div class="column">
            Duracion: {{ duration.min }} a {{ duration.max }}
          </div>
          <div class="column full-width">
            <q-range v-model="duration" :min="0" :max="400" />
          </div>
        </div>
      </q-item>
      <q-item>
        <div class="row full-width">
          <div class="column full-width">
            <q-checkbox v-model="adult" label="Apto para todo publico" />
          </div>
        </div>
      </q-item>

      <q-btn @click="FilterMovies" class="q-mb-md" color="primary">
        filtrar
      </q-btn>
      <q-btn @click="reset" class="q-mb-md q-ml-md" color="primary">
        reiniciar
      </q-btn>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

interface MyComponentState {
  calificacion: { min: number; max: number };
  duration: { min: number; max: number };
  year: number | undefined;
  adult: boolean;
  options: genres[];
  accepted: number[];
  showMenu: boolean;
}
interface genres {
  label: string;
  value: number;
}
export default defineComponent({
  name: 'FilterMovies',
  data(): MyComponentState {
    return {
      calificacion: {
        min: 0,
        max: 10,
      },
      duration: {
        min: 0,
        max: 400,
      },
      year: undefined,
      adult: false,
      accepted: [],
      showMenu: false,
      options: [
        {
          value: 28,
          label: 'Acción',
        },
        {
          value: 12,
          label: 'Aventura',
        },
        {
          value: 16,
          label: 'Animación',
        },
        {
          value: 35,
          label: 'Comedia',
        },
        {
          value: 80,
          label: 'Crimen',
        },
        {
          value: 99,
          label: 'Documental',
        },
        {
          value: 18,
          label: 'Drama',
        },
        {
          value: 10751,
          label: 'Familia',
        },
        {
          value: 14,
          label: 'Fantasía',
        },
        {
          value: 36,
          label: 'Historia',
        },
        {
          value: 27,
          label: 'Terror',
        },
        {
          value: 10402,
          label: 'Música',
        },
        {
          value: 9648,
          label: 'Misterio',
        },
        {
          value: 10749,
          label: 'Romance',
        },
        {
          value: 878,
          label: 'Ciencia ficción',
        },
        {
          value: 10770,
          label: 'Película de TV',
        },
        {
          value: 53,
          label: 'Suspenso',
        },
        {
          value: 10752,
          label: 'Bélica',
        },
        {
          value: 37,
          label: 'Western',
        },
      ],
    };
  },
  methods: {
    ...mapMutations('movie', ['setFilterRequirements']),
    FilterMovies() {
      this.setFilterRequirements({
        year: this.year,
        genres: this.accepted,
        rate: this.calificacion,
        duration: this.duration,
        adult: this.adult,
      });
      this.$router.push('/movies');
      this.showMenu = false;
    },
    reset() {
      (this.calificacion = {
        min: 0,
        max: 10,
      }),
        (this.duration = {
          min: 0,
          max: 400,
        }),
        (this.year = undefined);
      this.adult = false;
      this.accepted = [];
    },
  },
});
</script>

<style scoped>
.ron {
  width: 500px;
}
</style>

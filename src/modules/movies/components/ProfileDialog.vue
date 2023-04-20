<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="dialog q-pa-md q-mb-md" flat bordered>
      <q-card-section>
        <h4 class="q-ma-none text-center">Editando perfil</h4>
      </q-card-section>
      <q-card-section>
        <q-form>
          <q-input
            v-model="localUser.name"
            label="Nombre"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-input
            v-model="localUser.user"
            label="User"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-input
            v-model="localUser.email"
            label="Email"
            type="email"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-input
            v-model="localUser.password"
            label="Clave"
            type="password"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-input
            v-model="localUser.phone_number"
            label="Telefono"
            type="number"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-select
            class="q-ma-none inputs"
            v-model="localUser.country"
            dense
            placeholder="Selecciona tu pais"
            :rules="[(val) => !!val || 'Debes seleccionar un pais']"
            :options="countries"
            label="pais"
          >
          </q-select>
          <q-input
            v-model="localUser.city"
            label="Ciudad"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-input
            v-model="localUser.genre"
            label="Genero"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <div align="right">
            <q-btn type="submit" push color="primary" @click="uploadProfile">
              guardar cambios</q-btn
            >
            <q-btn
              class="q-ml-md"
              color="negative"
              push
              v-close-popup
              @click="$emit('close')"
              >Cancelar</q-btn
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { COUNTRIES } from '@/helpers/countries';
import User from '@/interfaces/user';

interface MyComponentState {
  localUser: User;
  dialog: boolean;
  countries: string[];
}

export default defineComponent({
  name: 'ProfileDialog',
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  data(): MyComponentState {
    return {
      dialog: true,
      localUser: { ...this.user },
      countries: COUNTRIES,
    };
  },
  methods: {
    uploadProfile() {
      this.$emit('submit', this.localUser);
    },
  },
});
</script>

<style lang="scss" scoped>
.dialog {
  width: 100%;
}
</style>

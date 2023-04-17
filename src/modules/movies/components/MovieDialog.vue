<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="dialog q-pa-md q-mb-md" flat bordered>
      <q-card-section>
        <h4 class="q-ma-none text-center">Califica la pelicula
        </h4>
      </q-card-section>
      <q-card-section class="q-pb-none">
        
            <q-select
                v-model="value"
                :options="options"
                label="Selecciona un número del 1 al 10"
                emit-value
                map-options
            />
            <div class="q-pt-lg" align="right">
            <q-btn type="submit" push color="primary" @click="vote">
              calificar</q-btn>
            <q-btn
              class="q-ml-md"
              color="negative"
              push
              v-close-popup
              @click="$emit('close')"
              >Cancelar</q-btn
            >
          </div>
        
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name:'ProfileDialog',

  data() {
    return {
      dialog: true,
      value: undefined,
      options: [1,2,3,4,5,6,7,8,9,10]
    };
  },
  methods:{

    vote(){
        this.$emit("submit", this.value);
    }
  }
  
});
</script>

<style lang="scss" scoped>
.dialog{
width: 100%;
}
</style>

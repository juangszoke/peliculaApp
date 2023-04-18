<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'App',
  created(){
    if(localStorage.getItem('userId')){
      this.$store.dispatch('auth/getUser', localStorage.getItem('userId')?.toString())
    }
  }
})
</script>

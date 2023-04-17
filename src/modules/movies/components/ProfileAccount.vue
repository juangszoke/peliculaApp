<template>
  
  <div class="q-pa-md">
    <q-card class="q-mt-md profile-card">
      <q-card-section class="q-py-md profile-section profile-section-1">
        <h4 class="text-h4 q-mb-lg q-mt-sm text-center">Informacion personal</h4>
        <div class="q-gutter-md">
            <div class="row">
                <div class="text-subtitle2 q-mr-md profile-label">Nombre:</div>
                <div class="profile-value">{{ information.name }}</div>
            </div>
        </div>
        <div class="q-gutter-md">
            <div class="row">
                <div class="text-subtitle2 q-mr-md profile-label">Username:</div>
                <div class="profile-value ">{{ information.user }}</div>
            </div>
        </div>
        <div class="q-gutter-md">
            <div class="row">
                <div class="text-subtitle2 q-mr-md profile-label">Email:</div>
                <div class="profile-value">{{ information.email }}</div>
            </div>
        </div>
        <div class="q-gutter-md">
            <div class="row">
                <div class="text-subtitle2 q-mr-md profile-label">Phone Number:</div>
                <div class="profile-value">{{ information.phone_number }}</div>
            </div>
        </div>
      </q-card-section>

      <q-card-section class="q-py-md profile-section profile-section-2">
        <h5 class="text-h5 q-mb-lg q-mt-sm text-center">Location</h5>
        <div class="q-gutter-md">
            <div class="row">
                <div class="text-subtitle2 q-mr-md profile-label">Country:</div>
                <div class="profile-value">{{ information.country }}</div>
            </div>    
        </div>
        <div class="q-gutter-md">
            <div class="row">
                <div class="text-subtitle2 q-mr-md profile-label">City:</div>
                <div class="profile-value">{{ information.city }}</div>
            </div>    
        </div>
      </q-card-section>

      <q-card-section class="q-py-md profile-section ">
        <h5 class="text-h5 q-mb-lg q-mt-sm text-center">Información adicional</h5>
                
                <div class="q-gutter-md">
            <div class="row">
                <div class="text-subtitle2 q-mr-md profile-label">Favorite genre:</div>
                <div class="profile-value">{{ information.genre }}</div>
            </div>    
        </div>
      </q-card-section>
    </q-card>
    <q-btn @click="activeDialog" color="secondary">editar perfil</q-btn>
  </div>

  <profile-dialog 
    v-if="showDialog"
    :user="information"
    @close="closeDialog"
    @submit="(data) => uploadProfile(data)"
  />
</template>

<script lang="ts">
import User from '@/interfaces/user';
import { defineComponent } from 'vue';
import profileServices from '@/services/profile.services'
import { mapGetters, mapMutations } from 'vuex';
import profileDialog from '@/modules/movies/components/ProfileDialog.vue'


interface MyComponentState {
  information: User[];
  showDialog: boolean;
 
}
export default defineComponent({
  name: 'ProfileAccount',
  components:{
    profileDialog
  },
  data():MyComponentState{

    return{
        information: [],
        showDialog: false
    }
  },
   computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('auth', ['getId']),
  },
  methods: {
    ...mapMutations('auth', ['login']),
    activeDialog(){
        this.showDialog = true
    },
    closeDialog(){
        this.showDialog = false
    },
    async uploadProfile(user: User){
        this.showDialog = false
        await profileServices.UpdateInformation(user)
        this.information = await profileServices.profileInformation(this.getId);
        this.login({ user: user.user, name: user.name, id: user.id });
    }
  },
  async mounted() {
     this.information = await profileServices.profileInformation(this.getId);
     console.log(this.information)
  },
});
</script>

<style scoped>
.profile-card {
  max-width: 400px;
  margin: auto;
}

.profile-section {
  background-color: #DDEBF7;
}

.profile-section-2 {
  background-color: #F9F9F9;
}

.profile-label {
  color: #5c5c5c;
}

.profile-value {
  color: #373737;
}

.text-center {
    text-align: center;
  }
  .text-h4, .text-h5 {
    font-size: 24px;
  }
</style>

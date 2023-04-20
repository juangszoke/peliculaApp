import { ActionTree } from 'vuex';
import { StateInterface } from '../../../store/index';
import { AuthState } from './state';

import User from '../../../interfaces/user';
import axios from 'axios';

const actions: ActionTree<AuthState, StateInterface> = {
  //someAction(/* context */) {
  // your code
  //},

  login(
    { commit },
    {
      user,
      password,
      redirect,
    }: { user: string; password: string; redirect: string }
  ): Promise<boolean> {
    return axios
      .get(`http://localhost:3000/users?user=${user}&password=${password}`)
      .then((response) => {
        if (response.data[0]) {
          this.$router.push(redirect);
          commit('login', { user: user, name: response.data[0].name, id: response.data[0].id});
          return false;
        } else {
          
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
        return true;
      });
  },

  register(
    {
      /*commit */
    },
    user: User
  ) {
  
   return axios
      .get(`http://localhost:3000/users?user=${user.user}`)
      .then((response) => {
        if (response.data[0]) {
          console.log('usuario registrado')
          return true;
        } else {
          axios
            .post('http://localhost:3000/users', {
              user: user.user,
              name: user.name,
              email: user.email,
              password: user.password,
              phone_number: user.phone_number,
              country: user.country,
              city: user.city,
              genre: user.genre,
            })
            .then(() => {
              this.$router.push('/auth')
              return false
            })
            .catch((error) => {
              console.log(error);
            });

          return false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getUser( { commit }, userId: string){
    
      axios.get(`http://localhost:3000/users/${userId}`)
      .then((response) => {
        commit('login', { user: response.data.user , name: response.data.name, id: response.data.id});
      })

    }
  
};

export default actions;

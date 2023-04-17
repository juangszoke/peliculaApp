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
          commit('login', { user: user, name: response.data[0].nombre });
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
    axios
      .get(`http://localhost:3000/users?user=${user.user}`)
      .then((response) => {
        if (response.data[0]) {
          return true;
        } else {
          axios
            .post('http://localhost:3000/users', {
              user: user.user,
              nombre: user.name,
              email: user.email,
              password: user.password,
              telefono: user.phone_number,
              pais: user.country,
              ciudad: user.city,
              genero: user.genre,
            })
            .then(() => {
              this.$router.push('/auth');
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
};

export default actions;

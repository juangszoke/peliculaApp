import { GetterTree } from 'vuex';
import { StateInterface } from '../../../store/index';
import { AuthState } from './state';


const getters: GetterTree<AuthState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },

  getName(state) {
    return state.name;
  },
  getUser(state) {
    return state.user;
  },
  getId( state ){
    return state.id
  }
};

export default getters;

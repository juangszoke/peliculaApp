import { MutationTree } from 'vuex';
import { AuthState } from './state';

const mutation: MutationTree<AuthState> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },

  login(state, { user, name, id }) {
   
    state.IsLogin = true;
    state.user = user;
    state.name = name;
    state.id = id
    localStorage.setItem('userId', id);
  },

  logout(state) {
    state.IsLogin = false;
    state.user = '';
    state.name = '';
    state.id = '';
    localStorage.removeItem('userId')
  },
};

export default mutation;

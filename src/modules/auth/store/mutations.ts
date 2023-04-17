import { MutationTree } from 'vuex';
import { AuthState } from './state';

const mutation: MutationTree<AuthState> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },

  login(state, { user, name }) {
    state.IsLogin = true;
    state.user = user;
    state.name = name;
  },

  logout(state) {
    state.IsLogin = false;
    state.user = '';
    state.name = '';
  },
};

export default mutation;

import { ActionTree } from 'vuex';
import { StateInterface } from '@/store';
import { movieState } from './state';

const actions: ActionTree<movieState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;

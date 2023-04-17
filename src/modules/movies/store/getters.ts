import { GetterTree } from 'vuex';
import { StateInterface } from '@/store';
import { movieState } from './state';

const getters: GetterTree<movieState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
  getMovieId(state) {
    return state.selectedMovie;
  },
};

export default getters;

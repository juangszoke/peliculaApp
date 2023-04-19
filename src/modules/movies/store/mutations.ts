import { MutationTree } from 'vuex';
import { movieState } from './state';

const mutation: MutationTree<movieState> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },
  setMovieId(state, id) {
    state.selectedMovie = id;
  },
  setDefaultValue(state) {
    state.selectedMovie = undefined;
  },
  setShouldUpdate(state) {
    state.shouldUpdate = !state.shouldUpdate;
  },
};

export default mutation;

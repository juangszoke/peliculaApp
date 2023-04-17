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
};

export default mutation;

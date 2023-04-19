import { MutationTree } from 'vuex';
import { movieState } from './state';
import range from '@/interfaces/range'

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
  setFilterRequirements(state, {name, genres, rate, duration, adult}){
    state.nameMovie = name;
    state.genresMovies = genres;
    state.rateMovie = rate;
    state.durationMovie = duration;
    state.adult = adult;
    state.filterMovie = true;
  },
  setFilterdefault(state){
    state.nameMovie = '';
    state.genresMovies = [];
    state.rateMovie = {} as range;
    state.durationMovie = {} as range;
    state.adult = false;
    state.filterMovie = false;
  }

};

export default mutation;

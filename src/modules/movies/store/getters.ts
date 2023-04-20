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
  getShouldUpdate(state) {
    return state.shouldUpdate;
  },
  getFilterMovie(state) {
    return state.filterMovie;
  },
  getYearMovie(state) {
    return state.yearMovie;
  },
  getRateMovie(state) {
    return state.rateMovie;
  },
  getDurationMovie(state) {
    return state.durationMovie;
  },
  getGenresMovie(state) {
    return state.genresMovies;
  },
  getAdultMovie(state) {
    return state.adult;
  },
};

export default getters;

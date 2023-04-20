import range from '@/interfaces/range';

export interface movieState {
  selectedMovie: number | undefined;
  shouldUpdate: boolean;
  filterMovie: boolean;
  yearMovie: number | undefined;
  genresMovies: number[];
  rateMovie: range;
  durationMovie: range;
  adult: boolean;
  isLoading: boolean;
}

function state(): movieState {
  return {
    selectedMovie: undefined,
    shouldUpdate: false,
    yearMovie: undefined,
    genresMovies: [],
    rateMovie: {} as range,
    durationMovie: {} as range,
    adult: false,
    filterMovie: false,
    isLoading: false
  };
}

export default state;

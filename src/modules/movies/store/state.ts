import range from '@/interfaces/range'

export interface movieState {
  selectedMovie: number | undefined;
  shouldUpdate: boolean;
  filterMovie: boolean;
  nameMovie: string;
  genresMovies: number[];
  rateMovie: range;
  durationMovie: range;
  adult: boolean;
}


function state(): movieState {
  return {
    selectedMovie: undefined,
    shouldUpdate: false,
    nameMovie: '',
    genresMovies: [],
    rateMovie: {} as range,
    durationMovie: {} as range,
    adult: false,
    filterMovie: false
  };
}

export default state;

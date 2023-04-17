export interface movieState {
  selectedMovie: number | undefined;
}

function state(): movieState {
  return {
    selectedMovie: undefined,
  };
}

export default state;

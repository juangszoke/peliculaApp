export interface movieState {
  selectedMovie: number | undefined;
  shouldUpdate: boolean;
}

function state(): movieState {
  return {
    selectedMovie: undefined,
    shouldUpdate: false,
  };
}

export default state;

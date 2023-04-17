export interface AuthState {
  IsLogin: boolean;
  user: string;
  name: string;
}

function state(): AuthState {
  return {
    IsLogin: false,
    user: '',
    name: '',
  };
}

export default state;

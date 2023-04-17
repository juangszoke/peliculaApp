export interface AuthState {
  IsLogin: boolean;
  user: string;
  name: string;
  id: string;
}

function state(): AuthState {
  return {
    IsLogin: false,
    user: '',
    name: '',
    id: ''
  };
}

export default state;

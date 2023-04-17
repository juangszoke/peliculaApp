import { Module } from 'vuex';
import { StateInterface } from '../../../store/index';
import state, { AuthState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const authModule: Module<AuthState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default authModule;

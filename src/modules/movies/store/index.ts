import { Module } from 'vuex';
import { StateInterface } from '@/store';
import state, { movieState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const moviesModule: Module<movieState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default moviesModule;

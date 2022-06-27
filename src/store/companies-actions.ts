import { ActionTree, ActionContext } from 'vuex';
import { CompanyMutationTypes } from './companies-mutation-types';
import { CompanyMutations } from './companies-mutations';
import { CompaniesState, Company } from './companies-types';
import { ActionTypes } from './companies-action-types';
import { BaseState } from './types';

type AugementedActionContext = {
  commit<K extends keyof CompanyMutations>(
    key: K,
    payload: Parameters<CompanyMutations[K]>[1],
  ): ReturnType<CompanyMutations[K]>;
} & Omit<ActionContext<CompaniesState, BaseState>, 'commit'>;

export interface Actions {
  [ActionTypes.CREATE_COMPANY]({ commit }: AugementedActionContext, payload: Company): void;
  [ActionTypes.UPDATE_COMPANY]({ commit }: AugementedActionContext, payload: Company): void;
  [ActionTypes.DELETE_COMPANY]({ commit }: AugementedActionContext, payload: string): void;
}

const companiesActions: ActionTree<CompaniesState, BaseState> & Actions = {
  async [ActionTypes.CREATE_COMPANY]({ commit }, company) {
    commit(CompanyMutationTypes.ADD_COMPANY, company);
  },
  async [ActionTypes.UPDATE_COMPANY]({ commit }, company) {
    commit(CompanyMutationTypes.CHANGE_COMPANY, company);
  },
  async [ActionTypes.DELETE_COMPANY]({ commit }, companyId) {
    commit(CompanyMutationTypes.REMOVE_COMPANY, companyId);
  },
};

export default companiesActions;

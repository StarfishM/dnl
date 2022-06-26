import { MutationTree } from 'vuex';
import { CompaniesState, Company } from './companies-types';
import { CompanyMutationTypes } from './companies-mutation-types';

export type CompanyMutations<CS = CompaniesState> = {
  [CompanyMutationTypes.ADD_COMPANY](CompaniesState: CS, payload: Company): void;
  [CompanyMutationTypes.CHANGE_COMPANY](CompaniesState: CS, payload: Company): void;
  [CompanyMutationTypes.REMOVE_COMPANY](CompaniesState: CS, payload: string): void;
};

const companiesMutations: MutationTree<CompaniesState> & CompanyMutations = {
  [CompanyMutationTypes.ADD_COMPANY]: (state, payload) => {
    if (!state.companies) return;
    let tempId: number | null =
      state.companies && state.companies.length > 0
        ? Number.parseInt(state.companies[state.companies.length - 1].companyId.slice(-1))
        : 0;
    tempId != null && tempId++;
    payload.companyId = `id${tempId}`;
    payload.createdAt = 'string';
    payload.updatedAt = 'string';
    payload.className = 'company-item';
    return state.companies && state.companies.push(payload);
  },
  [CompanyMutationTypes.CHANGE_COMPANY]: (state, company) =>
    (state.companies =
      state.companies &&
      state.companies.map(comp =>
        comp.companyId === company.companyId ? (comp = company) : comp,
      )),
  [CompanyMutationTypes.REMOVE_COMPANY]: (state, id) => {
    state.companies = state.companies && state.companies.filter(each => each.companyId != id);
  },
};

export default companiesMutations;

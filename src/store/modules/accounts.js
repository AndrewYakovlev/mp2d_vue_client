import api from "@/api/accounts";

const state = {
  loading: false,
  saving: false,
  deleting: false,
  accounts: [],
  errors: null,
};

export const mutationTypes = {
  getAccountsStart: `startGetAccounts`,
  getAccountsSuccess: `getAccountsSuccess`,
  getAccountsFailure: `getAccountsFailure`,

  saveAccountStart: `saveAccountStart`,
  saveAccountSuccess: `saveAccountSuccess`,
  saveAccountFailure: `saveAccountFailure`,

  removeAccountStart: `removeAccountStart`,
  removeAccountSuccess: `removeAccountSuccess`,
  removeAccountFailure: `removeAccountFailure`,
};
export const actionTypes = {
  getAccounts: `getAccounts`,
  saveAccount: `saveAccount`,
  removeAccount: `removeAccount`,
};

const mutations = {
  [mutationTypes.getAccountsStart](state) {
    state.loading = true;
  },
  [mutationTypes.getAccountsSuccess](state, data) {
    state.loading = false;
    state.accounts = data;
  },
  [mutationTypes.getAccountsFailure](state, errors) {
    state.loading = false;
    state.errors = errors;
  },

  [mutationTypes.saveAccountStart](state) {
    state.saving = true;
  },
  [mutationTypes.saveAccountSuccess](state) {
    state.saving = false;
  },
  [mutationTypes.saveAccountFailure](state, errors) {
    state.saving = false;
    state.errors = errors;
  },

  [mutationTypes.removeAccountStart](state) {
    state.deleting = true;
  },
  [mutationTypes.removeAccountSuccess](state) {
    state.deleting = false;
  },
  [mutationTypes.removeAccountFailure](state, errors) {
    state.deleting = false;
    state.errors = errors;
  },
};
const actions = {
  async [actionTypes.getAccounts](context) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.getAccountsStart);
      api
        .get()
        .then((response) => {
          context.commit(mutationTypes.getAccountsSuccess, response.data);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(mutationTypes.getAccountsFailure, err.data);
          reject(err);
        });
    });
  },

  async [actionTypes.saveAccount](context, data) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.saveAccountStart);
      api
        .save(data)
        .then((response) => {
          context.commit(mutationTypes.saveAccountSuccess);
          context.dispatch(actionTypes.getAccounts);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(mutationTypes.saveAccountFailure, err.data);
          reject(err);
        });
    });
  },

  async [actionTypes.removeAccount](context, id) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.removeAccountStart);
      api
        .remove(id)
        .then((response) => {
          context.commit(mutationTypes.removeAccountSuccess);
          context.dispatch(actionTypes.getAccounts);
          resolve(response.data);
        })
        .catch((err) => {
          context.commit(mutationTypes.removeAccountFailure, err.data);
          reject(err);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};

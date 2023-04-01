import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    donors: null,
    isAsyncActionRunning: false,
    originLink: "https://interview.ribbon.giving/api",
  },
  mutations: {
    setDonors(state, value) {
      state.donors = value;
    },
    setIsActionRunningStatus(state, value) {
      state.isAsyncActionRunning = value;
    },
  },
  actions: {
    fetchDonors({ commit, state }) {
      axios
        .get(state.originLink + "/donors")
        .then((response) => {
          commit("setDonors", response.data);
        })
        .catch((error) => {});
    },
    sendMessageToDonors({ commit, state }, { params, data }) {
      axios
        .post(
          state.originLink + `/donors/${params.donorId}/send-message`,
          data,
          {
            "Content-Type": "application/json",
          }
        )
        .then(() => {
          alert('Success')
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  getters: {
    donors: (state) => {
      return state.donors;
    },
    isAsyncActionRunning: (state) => {
      return state.isAsyncActionRunning;
    },
  },
});

export default store;

import { listenNotesApi } from '../../api'

const state = {
  isFetching: false,
  page: 1,
  lastFetchedPage: null,
  podcasts: [],
  error: null,
  has_next: true
}

const getters = {
  podcasts (state) {
    return state.podcasts
  },
  loading (state) {
    return state.isFetching
  }
}

const actions = {
  async fetchPodcasts ({ state, commit }) {
    try {
      let { page, lastFetchedPage } = state

      if (page > lastFetchedPage) {
        commit('setLoading')

        const { data } = await listenNotesApi.get(
          `/best_podcasts?page=${page}`,
        )

        commit('setNewPodcasts', data)
      }

    } catch (error) {
      commit('setError', error)
    }
  }
}

const mutations = {
  setLoading (state) {
    state.isFetching = true
  },
  setError (state, error) {
    state.error = error
    state.isFetching = false
  },
  setNewPodcasts (state, data) {
    const { has_next, page_number, podcasts } = data

    state.isFetching = false
    state.has_next = has_next
    state.lastFetchedPage = page_number
    state.podcasts = [...state.podcasts, ...podcasts]
    state.error = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
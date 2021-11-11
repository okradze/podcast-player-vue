import { listenNotesApi } from '../api'

const state = {
  loading: false,
  page: 0,
  podcasts: [],
  error: null,
  hasNext: true
}

const getters = {
  podcasts (state) {
    return state.podcasts
  },
  loading (state) {
    return state.loading
  },
  hasNextPage (state) {
    return state.hasNext
  }
}

const actions = {
  async fetchPodcasts ({ state, commit }) {
    try {
      commit('setNextPage')
      commit('setLoading')

      const { data } = await listenNotesApi.get(`/best_podcasts?page=${state.page}`)

      commit('setNewPodcasts', data)
    } catch (error) {
      commit('setError', error)
    }
  },
}

const mutations = {
  setLoading (state) {
    state.loading = true
  },
  setError (state, error) {
    state.error = error
    state.loading = false
  },
  setNewPodcasts (state, data) {
    const { has_next, podcasts } = data

    state.loading = false
    state.hasNext = has_next
    state.podcasts = [...state.podcasts, ...podcasts]
    state.error = null
  },
  setNextPage (state) {
    state.page++
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
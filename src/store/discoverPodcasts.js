import { listenNotesApi } from '../api'

const state = {
  loading: false,
  page: 0,
  podcastLists: [],
  error: null,
  hasNext: true
}

const getters = {
  podcastLists (state) {
    return state.podcastLists
  },
  loading (state) {
    return state.loading
  },
  hasNextPage (state) {
    return state.hasNext
  }
}

const actions = {
  async fetchPodcastLists ({ state, commit }) {
    try {
      console.log('fetchPodcastLists')
      commit('setNextPage')
      commit('setLoading')

      const { data } = await listenNotesApi.get(`/curated_podcasts?page=${state.page}`)

      commit('setNewPodcastLists', data)
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
  setNewPodcastLists (state, data) {
    const { has_next, curated_lists } = data

    state.loading = false
    state.hasNext = has_next
    state.podcastLists = [...state.podcastLists, ...curated_lists]
    state.error = null
  },
  setNextPage (state) {
    state.page++
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
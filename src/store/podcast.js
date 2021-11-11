import { listenNotesApi } from "../api"

const state = {
  podcast: null,
  recommendations: null,
  podcastLoading: false,
  recommendationsLoading: false,
  episodesLoading: false,
  error: null,
}

const getters = {
  podcast (state) {
    return state.podcast
  },
  podcastLoading (state) {
    return state.podcastLoading
  },
  episodesLoading (state) {
    return state.episodesLoading
  },
  recommendationsLoading (state) {
    return state.recommendationsLoading
  },
  recommendations (state) {
    return state.recommendations
  }
}

const actions = {
  async fetchPodcast ({ commit }, podcastId) {
    try {
      commit('setPodcastLoading')

      const { data } = await listenNotesApi.get(`/podcasts/${podcastId}`)

      commit('setPodcast', data)
    } catch (error) {
      commit('setError', error)
    }
  },
  async fetchRecommendations ({ commit }, podcastId) {
    try {
      commit('setRecommendationsLoading')

      const { data } = await listenNotesApi.get(
        `/podcasts/${podcastId}/recommendations`,
      )

      commit('setRecommendations', data)
    } catch (error) {
      commit('setError', error)
    }
  },
  async fetchMoreEpisodes ({ state, commit }, podcastId) {
    try {
      commit('setEpisodesLoading')

      const { data } = await listenNotesApi.get(
        `/podcasts/${podcastId}?next_episode_pub_date=${state.podcast.next_episode_pub_date}`,
      )

      commit('setMoreEpisodes', data)
    } catch (error) {
      commit('setError', error)
    }
  }
}

const mutations = {
  setPodcastLoading (state) {
    state.podcastLoading = true
  },
  setRecommendationsLoading (state) {
    state.recommendationsLoading = true
  },
  setEpisodesLoading (state) {
    state.episodesLoading = true
  },
  setError (state, error) {
    state.error = error
    state.loading = false
  },
  setPodcast (state, data) {
    state.podcastLoading = false
    state.podcast = data
    state.error = null
  },
  setRecommendations (state, data) {
    state.recommendationsLoading = false
    state.recommendations = data.recommendations
    state.error = null
  },
  setMoreEpisodes (state, data) {
    state.episodesLoading = false
    state.episodes = data
    state.error = null
    state.podcast.episodes.concat(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
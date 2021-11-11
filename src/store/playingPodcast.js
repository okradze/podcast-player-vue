const state = {
  podcastId: null,
  episode: null,
  playing: false,
  volume: 1.0,
  currentTime: 0,
}

const getters = {
  podcastId (state) {
    return state.podcastId
  },
  episode (state) {
    return state.episode
  },
}

const actions = {}

const mutations = {
  playEpisode (state, { podcastId, episode }) {
    state.currentTime = 0
    state.podcastId = podcastId
    state.episode = episode
    state.playing = true
  },
  play (state) {
    state.playing = true
  },
  pause (state) {
    state.pause = false
  },
  setCurrentTime (state, currentTime) {
    state.currentTime = currentTime
  },
  setVolume (state, volume) {
    state.volume = volume
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
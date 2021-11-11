import { createStore } from "vuex";
import podcasts from './podcasts'
import discoverPodcasts from './discoverPodcasts'
import podcast from './podcast'
import playingPodcast from './playingPodcast'

export default createStore({
  modules: {
    podcasts,
    discoverPodcasts,
    podcast,
    playingPodcast
  },
});

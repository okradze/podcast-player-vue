import { createStore } from "vuex";
import podcasts from './podcasts'
import discoverPodcasts from './discoverPodcasts'
import podcast from './podcast'

export default createStore({
  modules: {
    podcasts,
    discoverPodcasts,
    podcast
  },
});

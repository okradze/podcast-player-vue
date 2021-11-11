import { createStore } from "vuex";
import podcasts from './podcasts'
import discoverPodcasts from './discoverPodcasts'

export default createStore({
  modules: {
    podcasts,
    discoverPodcasts
  },
});

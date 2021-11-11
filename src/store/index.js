import { createStore } from "vuex";
import podcasts from './podcasts'

export default createStore({
  modules: {
    podcasts,
  },
});

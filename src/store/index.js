import { createStore } from "vuex";
import podcasts from './modules/podcasts'

export default createStore({
  modules: {
    podcasts,
  },
});

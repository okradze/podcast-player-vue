<template>
  <PodcastList :podcasts="podcasts" />
  <Spinner v-if="loading" />
</template>

<script>
import PodcastList from "../components/PodcastList.vue";
import { mapActions, mapGetters } from "vuex";
import Spinner from "../components/Spinner.vue";

export default {
  name: "Podcasts",
  components: { PodcastList, Spinner },
  methods: {
    ...mapActions(["fetchPodcasts"]),
  },
  computed: {
    ...mapGetters(["podcasts", "loading"]),
  },
  mounted() {
    this.fetchPodcasts();
  },
};
</script>
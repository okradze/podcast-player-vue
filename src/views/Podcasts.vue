<template>
  <PodcastList :podcasts="podcasts" />
  <Spinner v-if="loading" />
  <IntersectionObserver
    v-if="podcasts.length && !loading && hasNextPage"
    @on-intersect="fetchPodcasts"
  >
    <Button>Load More</Button>
  </IntersectionObserver>
</template>

<script>
import PodcastList from "../components/PodcastList.vue";
import { mapActions, mapGetters } from "vuex";
import Spinner from "../components/Spinner.vue";
import Button from "../components/Button.vue";
import IntersectionObserver from "../components/IntersectionObserver.vue";

export default {
  name: "Podcasts",
  components: { PodcastList, Spinner, Button, IntersectionObserver },
  methods: {
    ...mapActions(["fetchPodcasts"]),
  },
  computed: {
    ...mapGetters(["podcasts", "loading", "hasNextPage"]),
  },
  mounted() {
    if (!this.podcasts.length) {
      this.fetchPodcasts();
    }
  },
};
</script>
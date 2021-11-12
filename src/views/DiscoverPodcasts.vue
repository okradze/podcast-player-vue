<template>
  <PodcastList
    v-for="list in podcastLists"
    :key="list.id"
    :title="list.title"
    :podcasts="list.podcasts"
  />
  <Spinner v-if="loading" />
  <IntersectionObserver
    v-if="podcastLists.length && !loading && hasNextPage"
    @on-intersect="fetchPodcastLists"
  >
    <Button>Load More</Button>
  </IntersectionObserver>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PodcastList from "../components/PodcastList.vue";
import Spinner from "../components/Spinner.vue";
import Button from "../components/Button.vue";
import IntersectionObserver from "../components/IntersectionObserver.vue";

export default {
  name: "DiscoverPodcasts",
  components: { PodcastList, Spinner, Button, IntersectionObserver },
  methods: {
    ...mapActions("discoverPodcasts", ["fetchPodcastLists"]),
  },
  computed: {
    ...mapGetters("discoverPodcasts", [
      "podcastLists",
      "loading",
      "hasNextPage",
    ]),
  },
  created() {
    if (!this.podcastLists.length) {
      this.fetchPodcastLists();
    }
  },
};
</script>
<template>
  <div>
    <Spinner v-if="podcastLoading" />
    <div v-if="!podcastLoading && podcast">
      <h2 class="title">{{ podcast.title }}</h2>
      <div class="content">
        <div class="thumbnail-wrapper">
          <img :src="podcast.thumbnail" alt="" class="thumbnail" />
        </div>

        <div>
          <h3 class="publisher">{{ podcast.publisher }}</h3>
          <div class="text">{{ podcast.description }}</div>
        </div>
      </div>

      <div class="episode-list">
        <EpisodeList />
      </div>

      <Spinner v-if="recommendationsLoading" />
      <PodcastList
        v-if="recommendations"
        :podcasts="recommendations"
        title="Recommendations"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "../components/Spinner.vue";
import PodcastList from "../components/PodcastList.vue";
import EpisodeList from "../components/EpisodeList.vue";

export default {
  components: { Spinner, PodcastList, EpisodeList },
  name: "PodcastDetails",
  methods: {
    ...mapActions("podcast", [
      "fetchPodcast",
      "fetchMoreEpisodes",
      "fetchRecommendations",
    ]),
  },
  computed: {
    ...mapGetters("podcast", [
      "podcast",
      "podcastLoading",
      "episodesLoading",
      "recommendationsLoading",
      "recommendations",
    ]),
  },
  created() {
    const podcastId = this.$route.params.id;
    this.fetchPodcast(podcastId);
    this.fetchRecommendations(podcastId);
  },
};
</script>

<style lang="scss" scoped>
@import "../utils";

.thumbnail-wrapper {
  position: relative;
  width: 20rem;
  height: 20rem;
  border-radius: 3rem;
  margin-right: 3rem;
  overflow: hidden;
  background: $bg;
  flex-shrink: 0;

  @media only screen and (max-width: 576px) {
    margin-bottom: 2rem;
  }
}

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.content {
  display: flex;
  margin-bottom: 4rem;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
  }
}

.episode-list {
  margin-bottom: 6rem;
}

.title {
  margin-bottom: 3rem;
}

.publisher {
  margin-bottom: 2rem;
}

.text {
  font-size: 1.4rem;
}
</style>
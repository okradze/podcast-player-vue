<template>
  <div>
    <div v-if="episodes" class="list">
      <EpisodeItem
        v-for="episode in episodes"
        :key="episode.id"
        :episode="episode"
      />
    </div>

    <Spinner v-if="episodesLoading" />
    <Button
      v-if="!episodesLoading && areMoreEpisodes"
      @click="fetchMoreEpisodes"
      >Load More</Button
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "../components/Spinner.vue";
import Button from "../components/Button.vue";
import EpisodeItem from "./EpisodeItem.vue";

export default {
  name: "EpisodeList",
  components: { Spinner, Button, EpisodeItem },
  methods: {
    ...mapActions("podcast", ["fetchMoreEpisodes"]),
  },
  computed: {
    ...mapGetters("podcast", [
      "episodes",
      "episodesLoading",
      "areMoreEpisodes",
    ]),
  },
};
</script>

<style lang='scss' scoped>
.list {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
</style>
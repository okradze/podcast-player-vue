<template>
  <div class="wrapper">
    <h2 class="title" :class="{ 'small-title': title }">
      {{ title || "Popular Podcasts" }}
    </h2>
    <div class="list">
      <PodcastItem
        v-for="podcast in podcasts"
        :key="podcast.id"
        :id="podcast.id"
        :title="podcast.title"
        :publisher="podcast.publisher"
        :thumbnail="podcast.thumbnail"
      />
    </div>
  </div>
</template>

<script>
import PodcastItem from "./PodcastItem.vue";
export default {
  name: "PodcastList",
  components: { PodcastItem },
  props: {
    title: {
      type: String,
      required: false,
    },
    podcasts: Array,
  },
};
</script>

<style lang='scss' scoped>
.list {
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));

  @media only screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.small-title {
  font-size: 2rem;
}

.title {
  margin-bottom: 3rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;
}
</style>
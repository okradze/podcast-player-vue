<template>
  <li>
    <router-link
      class="link"
      :to="{ name: 'PodcastDetails', params: { id: podcast.id } }"
    >
      <img class="image" :src="podcast.thumbnail" alt="" />
      <div>
        <h4 class="ellipsis title">{{ podcast.title_original }}</h4>
        <p class="ellipsis title">{{ podcast.title_original }}</p>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "SearchBarItem",
  props: {
    podcast: Object,
  },
};
</script>

<style lang='scss' scoped>
@import "../utils";

li {
  list-style: none;
}

.link {
  padding: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: $text;
  transition: background-color 0.15s ease-in-out;

  &:focus,
  &:hover {
    outline: 0;
    background-color: $bg;
  }
}

.image {
  width: 4rem;
  height: 4rem;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.title {
  color: $text;
  font-size: 1.5rem;
}

.publisher {
  color: $light-text;
  font-size: 1.4rem;
}
</style>
<template>
  <div class="item" :key="id">
    <div class="image-wrapper">
      <img class="image" :src="thumbnail" alt="" />
    </div>
    <div className="content">
      <p class="ellipsis publisher">{{ publisher }}</p>
      <h4 class="ellipsis title">{{ title }}</h4>

      <router-link
        :to="{ name: 'PodcastDetails', params: { id } }"
        class="button"
        >View More</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PodcastItem",
  props: {
    id: String,
    thumbnail: String,
    publisher: String,
    title: String,
  },
};
</script>

<style lang='scss' scoped>
@import "../utils";

.item {
  display: flex;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.image-wrapper {
  height: 15rem;
  width: 15rem;
  background-color: $bg;
  border-radius: 3rem;
  overflow: hidden;
  margin-right: 3rem;
  flex-shrink: 0;
  align-self: center;

  @media only screen and (max-width: 576px) {
    width: 12rem;
    height: 12rem;
  }
}

.image {
  width: 100%;
}

.title {
  @media only screen and (max-width: 340px) {
    font-size: 1.5rem;
  }
}

.publisher {
  color: $light-text;
  font-weight: 600;
  font-size: 1.4rem;
}

.button {
  padding: 0.5rem 1.5rem;
  text-align: center;
  border: 1px solid $primary;
  border-radius: 100px;
  color: $primary;
  text-decoration: none;
  align-self: flex-start;
  font-size: 1.5rem;
  font-weight: 600;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

  &:focus,
  &:hover {
    outline: 0;
    color: $offset;
    background-color: $primary;
  }
}
</style>
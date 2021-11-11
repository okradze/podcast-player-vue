<template>
  <div class="episode">
    <div class="image-wrapper">
      <img class="image" :src="episode.thumbnail" alt="" />
    </div>
    <div class="content">
      <div>
        <h4 class="ellipsis title">{{ episode.title }}</h4>
        <span class="duration">
          {{
            new Date(episode.audio_length_sec * 1000)
              .toISOString()
              .substr(11, 8)
          }}
        </span>
      </div>

      <!-- <PlayButton role='button' tabIndex='0' class="play" onClick={()
      => playEpisode(match.params.podcastId, episode)} /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "EpisodeItem",
  props: {
    episode: Object,
  },
};
</script>

<style lang='scss' scoped>
@import "../utils";

.episode {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  background-color: $bg;
  transition: transform 0.25s ease-in-out;
}

.content {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}

.image-wrapper {
  width: 4rem;
  height: 4rem;
  position: relative;
  margin-right: 2rem;
  overflow: hidden;
  flex-shrink: 0;
  background: $offset;
  border-radius: 5px;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: $text;
}

.duration {
  font-size: 1.4rem;
  color: $light-text;
}

.play {
  flex-shrink: 0;
  width: 3.5rem;
  height: 3.5rem;
  margin-left: 2rem;
  fill: $primary;
  cursor: pointer;
  border-radius: 50%;
  transition: box-shadow 0.15s ease-in-out;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px $offset, 0 0 0 4px $primary;
  }
}
</style>
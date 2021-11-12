<template>
  <div class="player" :class="{ 'player-minimized': minimized }">
    <div class="minimize-wrapper">
      <span tabindex="0" role="button" class="minimize" @click="togglePlayer" />
    </div>

    <div class="episode-wrapper">
      <div class="thumbnail-wrapper">
        <img :src="episode.thumbnail" alt="" class="thumbnail" />
      </div>

      <router-link
        class="ellipsis title"
        :to="{ name: 'PodcastDetails', params: { id: podcastId } }"
        >{{ episode.title }}
      </router-link>
    </div>

    <div class="controls-wrapper">
      <!-- <PauseSvg tabindex="0" class="pause" />
      <PlaySvg tabindex="0" class="play" /> -->
    </div>

    <div v-if="!minimized" class="duration-wrapper">
      <span class="time">{{ currentTimeFormatted }}</span>

      <div class="duration">
        <!-- Slider -->
      </div>

      <span class="time">{{ remainingTimeFormatted }}</span>
    </div>

    <div v-if="!minimized" class="volume-wrapper">
      <div class="volume-slider"></div>
      <VolumeSvg class="volume-icon" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import PlaySvg from "./PlaySvg.vue";
// import PauseSvg from "./PauseSvg.vue";
import VolumeSvg from "./VolumeSvg.vue";

export default {
  name: "AudioPlayer",
  components: { VolumeSvg },
  data() {
    return {
      minimized: false,
      audio: new Audio(),
    };
  },
  created() {
    this.audio.src = this.episode.audio;
    this.audio.currentTime = this.currentTime;

    this.audio.addEventListener("pause", () => {
      this.pause();
    });

    this.audio.addEventListener("play", () => {
      this.play();
    });

    this.audio.addEventListener("timeupdate", () => {
      this.setCurrentTime(this.audio.currenTime);
    });

    // window.addEventListener("keydown", (e) => {
    //   if (e.code === "Space" && e.target === document.body) {
    //     e.preventDefault();
    //   }
    //   if (e.code === "Space") {
    //     this.audio.current.paused
    //       ? this.audio.current.play()
    //       : this.audio.current.pause();
    //   } else if (e.code === "ArrowLeft") {
    //     this.audio.current.currentTime -= 10;
    //   } else if (e.code === "ArrowRight") {
    //     this.audio.current.currentTime += 10;
    //   }
    // });

    this.audio.play();
  },
  methods: {
    ...mapActions("playingPodcast", [
      "play",
      "pause",
      "setCurrentTime",
      "setVolume",
    ]),
    togglePlayer() {
      this.minimized = !this.minimized;
    },
    formatTime(time) {
      if (time) {
        const SECONDS_IN_HOUR = 3600;
        const date = new Date(Math.floor(time * 1000)).toISOString();

        if (time < SECONDS_IN_HOUR) {
          return date.substr(14, 5);
        }
        return date.substr(11, 8);
      }
    },
  },
  computed: {
    ...mapGetters("playingPodcast", [
      "episode",
      "podcastId",
      "currentTime",
      "volume",
      "playing",
    ]),
    currentTimeFormatted() {
      return this.formatTime(this.currentTime);
    },
    remainingTimeFormatted() {
      return this.formatTime(this.audio.duration - this.audio.currentTime);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../utils";

.player {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $bg;
  z-index: 20;
  padding: 1rem 3rem;
  box-shadow: 0px -2px 6px 0px rgba($text, 0.15);
}

.player-minimized {
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr min-content;
  grid-template-areas: "minimize minimize" "episode play";

  .minimize-wrapper {
    grid-area: minimize;
  }
  .episode-wrapper {
    grid-area: episode;
    margin-right: 1rem;
  }
  .play,
  .pause {
    grid-area: play;
  }
  .controls-wrapper {
    margin-top: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

.episode-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail-wrapper {
  margin-right: 2rem;
  position: relative;
  overflow: hidden;
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: $offset;
  flex-shrink: 0;
}

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
  color: $text;
  text-decoration: none;

  &:focus {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}

.controls-wrapper {
  margin-top: 1rem;
  display: grid;
  align-content: center;
  grid-template-columns: min-content 1fr min-content;
  grid-column-gap: 3rem;
  grid-template-areas: "play track volume";

  @media only screen and (max-width: 576px) {
    grid-template-rows: repeat(2, min-content);
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "volume play" "track track";
  }
}

.duration-wrapper {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-gap: 2rem;
  grid-area: track;
}

.duration {
  display: flex;
  align-items: center;
  width: 100%;
}

.play,
.pause {
  grid-area: play;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: box-shadow 0.15s ease-in-out;
  border-radius: 50%;
  fill: $primary;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px $offset, 0 0 0 4px $primary;
  }
}

.volume-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  grid-area: volume;
  justify-self: end;

  &:hover .volume-slider,
  &:focus .volume-slider {
    outline: 0;
    visibility: visible;
    opacity: 1;
  }
}

.volume-slider {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  height: 10rem;
  visibility: hidden;
  opacity: 0;
  background-color: $offset;
  padding: 1.5rem 0.5rem;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgba($text, 0.15);
}

.volume-icon {
  width: 2rem;
  height: 2rem;
  fill: $primary;
}

.slider {
  :global(.rc-slider-track) {
    background-color: $secondary;
  }
  :global(.rc-slider-handle) {
    background-color: $offset;
    border: 2px solid $primary;

    &:hover {
      border-color: $primary;
    }
    &:focus {
      border-color: $primary;
    }
  }
}

.time {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}

.minimize-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.minimize {
  margin: 4px;
  width: 4rem;
  height: 0.4rem;
  border-radius: 5px;
  background-color: $primary;
  cursor: pointer;
}
</style>
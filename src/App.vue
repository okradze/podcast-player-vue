<template>
  <div class="container">
    <div class="app">
      <Sidebar />
      <AudioPlayer v-if="podcastId" />
      <div class="main-page">
        <Header />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AudioPlayer from "./components/AudioPlayer.vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Header,
    AudioPlayer,
  },
  computed: {
    ...mapGetters("playingPodcast", ["podcastId"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap");
@import "./utils";

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: grayscale;

  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  ::-webkit-scrollbar-track {
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: $primary;
  }
}

body {
  font-family: "Open Sans", Helvetica, sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  color: $text;
  overflow-y: scroll;
}

h1 {
  margin: 0;
}

.app {
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-column-gap: 4rem;
  padding: 4rem 2rem;

  @media only screen and (max-width: 850px) {
    grid-column-gap: 0;
    grid-template-columns: 1fr;
  }
}

.main-page {
  grid-column-start: 2;
  padding-bottom: 10rem;

  @media only screen and (max-width: 850px) {
    grid-column-start: 1;
  }
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
  }
}

.ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
}
</style>

<template>
  <span
    tabindex="0"
    role="button"
    aria-label="Toggle menu"
    @click="toggle"
    id="toggle"
  >
    <span
      class="toggle-icon"
      :class="{ 'toggle-icon-when-visible': visible }"
    ></span>
  </span>

  <div class="sidebar" :class="{ 'sidebar-mobile-visible': visible }">
    <h1 id="logo">
      <router-link to="/" id="logo-link">Podcast</router-link>
    </h1>

    <nav id="nav">
      <h4 id="title">PODCAST</h4>
      <ul>
        <li class="list-item">
          <router-link to="/" class="link" exact-active-class="active-link">
            <home-svg class="link-icon" />
            Home
          </router-link>
        </li>

        <li class="list-item">
          <router-link
            to="/discover"
            class="link"
            exact-active-class="active-link"
          >
            <search-svg class="link-icon" />
            Discover
          </router-link>
        </li>

        <li class="list-item">
          <!-- <router-link
            to="/podcast"
            class="link"
            exact-active-class="active-link"
          >
            <podcast-svg class="link-icon" />
            Now Playing
          </router-link> -->
          <!-- <NavLink
                                to={`/podcast/${playingPodcastId}`}
                                className={styles.Link}
                                activeClassName={
                                    playingPodcastId ? styles.ActiveLink : ''
                                }
                            >
                                <PodcastIcon className={styles.LinkIcon} />
                                Now Playing
                            </NavLink> -->
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import HomeSvg from "../components/HomeSvg.vue";
// import PodcastSvg from "../components/PodcastSvg.vue";
import SearchSvg from "./SearchSvg.vue";

export default {
  name: "Sidebar",
  components: {
    HomeSvg,
    // PodcastSvg,
    SearchSvg,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../utils";

.sidebar {
  position: fixed;
  width: 20rem;

  @media only screen and (max-width: 850px) {
    padding: 8rem 2rem 4rem 2rem;
    background-color: $offset;
    box-shadow: 2px 0 4px rgba($text, 0.15);
    z-index: 20;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    box-sizing: content-box;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    box-sizing: border-box;
  }
}

#toggle {
  display: none;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: $primary;
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 30;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2rem 1px rgba($text, 0.2);
  cursor: pointer;

  @media only screen and (max-width: 850px) {
    display: flex;
  }
}

.toggle-icon,
.toggle-icon::before,
.toggle-icon::after {
  display: inline-block;
  width: 2.5rem;
  height: 2px;
  background-color: $offset;
  border-radius: 1rem;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out,
    top 0.3s ease-in-out;
}

.toggle-icon {
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    top: -0.8rem;
  }
  &::after {
    top: 0.8rem;
  }
}

.toggle-icon-when-visible {
  background-color: transparent;

  &::before {
    transform: rotate(135deg);
    top: 0;
  }
  &::after {
    top: 0;
    transform: rotate(-135deg);
  }
}

.sidebar-mobile-visible {
  transform: translateX(0);
}

#nav {
  height: 100%;
}

#logo {
  font-size: 2.8rem;
  padding-left: 2rem;
  margin-bottom: 10rem;

  @media only screen and (max-width: 576px) {
    margin-bottom: 6rem;
  }
  @media only screen and (max-width: 400px) {
    margin-bottom: 4rem;
  }
}

#logo-link {
  color: $primary;
  text-decoration: none;

  &:focus {
    outline: 2px solid $primary;
    outline-offset: 5px;
  }
}

#title {
  color: $light-text;
  padding: 0 2rem;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.list-item {
  list-style: none;
  display: flex;
  margin: 1rem 0;
}

.link {
  display: inline-flex;
  align-items: center;
  width: 100%;
  color: $text;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.4rem;
  padding: 1rem 2rem;
  border: 2px solid transparent;
  border-radius: 100px;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: $secondary;
  }
}

.link-icon {
  fill: $text;
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 1rem;
}

.active-link {
  background-color: $secondary;
  color: $offset;

  .link-icon {
    fill: $offset;
  }
}
</style>
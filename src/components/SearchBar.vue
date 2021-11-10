<template>
  <div class="search-bar">
    <input
      class="input"
      v-model="searchTerm"
      :class="{ 'input-when-searching': searchTerm }"
      type="search"
      placeholder="Search shows and podcasts"
    />

    <div v-if="searchTerm" class="results">
      <ul>
        <div v-if="loading" class="spinner">
          <Spinner />
        </div>
        <SearchBarItem
          v-for="podcast in results"
          :podcast="podcast"
          :key="podcast.id"
        />
        <!-- {searchResults &&
                            searchResults.map(podcast => (
                                <SearchBarItem
                                    clearSearch={() => setSearchTerm('')}
                                    key={podcast.id}
                                    {...podcast}
                                />
                            ))} -->
      </ul>
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner.vue";
import { listenNotesApi } from "../api";
import SearchBarItem from "./SearchBarItem.vue";

export default {
  components: { Spinner, SearchBarItem },
  name: "SearchBar",
  data() {
    return {
      searchTerm: "",
      loading: false,
      results: null,
    };
  },
  methods: {
    async fetchResults(searchTerm) {
      this.loading = true;

      const {
        data: { podcasts },
      } = await listenNotesApi.get(
        `/typeahead?q=${searchTerm}&show_podcasts=1`
      );

      if (podcasts.length) this.results = podcasts;
      this.loading = false;
    },
  },
  watch: {
    searchTerm(newSearchTerm) {
      if (newSearchTerm) {
        this.fetchResults(newSearchTerm);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../utils";

.search-bar {
  position: relative;
}

.input {
  padding: 1.5rem 4rem;
  font-size: 1.5rem;
  border-radius: 100px;
  width: 100%;
  border: 1px solid $light-border;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.input-when-searching {
  border-radius: 25px 25px 0 0;
}

.results {
  background-color: $offset;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-shadow: 0 0 2px 1px rgba($text, 0.15);
  z-index: 15;
  border: 1px solid $bg;
}

.spinner {
  padding: 1rem 0;
}
</style>
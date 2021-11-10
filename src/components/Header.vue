<template>
  <header>
    <SearchBar />
  </header>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  name: "Header",
  components: {
    SearchBar,
  },
};
</script>

<style lang='scss' scoped>
@import "../utils";

header {
  margin-bottom: 6rem;
}
</style>
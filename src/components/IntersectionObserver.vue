<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "IntersectionObserver",
  data() {
    return {
      observer: null,
    };
  },
  props: {
    root: {
      type: [Object],
      default: null,
    },
    rootMargin: {
      type: [String, Number],
      default: "0px",
    },
    threshold: {
      type: [Array, Number],
      default: 0,
    },
  },
  methods: {
    unobserve() {
      this.observer.unobserve(this.$el);
    },
  },
  mounted() {
    const options = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.$emit("on-intersect", this.unobserve);
      }
    }, options);
    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    if (this.observer) {
      this.unobserve();
      this.observer = null;
    }
  },
};
</script>
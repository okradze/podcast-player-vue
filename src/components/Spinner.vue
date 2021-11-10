<template>
  <div>
    <span id="spinner">
      <span class="spin-item" />
      <span class="spin-item" />
      <span class="spin-item" />
      <span class="spin-item" />
    </span>
  </div>
</template>

<style lang='scss' scoped>
@import "../../utils";

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinItem {
  to {
    opacity: 1;
  }
}

div {
  display: flex;
  align-items: center;
  justify-content: center;
}

#spinner {
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  animation: spin 1s infinite linear;
}

.spin-item {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  background-color: $primary;
  border-radius: 100%;
  opacity: 0.3;
  animation: spinItem 1s infinite linear alternate;
}

.spin-item:nth-child(1) {
  top: 0;
  left: 0;
}

.spin-item:nth-child(2) {
  top: 0;
  right: 0;
  animation-delay: 0.4s;
}

.spin-item:nth-child(3) {
  bottom: 0;
  right: 0;
  animation-delay: 0.8s;
}

.spin-item:nth-child(4) {
  bottom: 0;
  left: 0;
  animation-delay: 1.2s;
}
</style>
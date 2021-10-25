<template>
  <div
    class="card"
    :class="[`bg-${color}`, flat ? 'flat' : '']"
    :style="{ width, height }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "cornie-card",
  props: {
    flat: Boolean,
    width: { type: String, default: "auto" },
    height: { type: String, default: "auto" },
    color: { type: String, default: "white" },
  },
};
</script>

<style>
.card {
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 5px, rgba(0, 0, 0, 0.1) -1px 2px 5px;
  position: relative;
  width: auto;
  border-radius: 5px;
}
.card.flat {
  box-shadow: none !important;
}
</style>

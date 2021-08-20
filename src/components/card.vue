<template>
  <div class="card bg-white" :class="{flat}">
      <slot />
  </div>
</template>

<script>
export default {
  props: {
    flat: Boolean
  }
}
</script>

<style scoped>
.card {
    box-shadow: rgba(0,0,0,0.1) 1px 2px 5px, rgba(0,0,0,0.1) -1px 2px 5px;
    position: relative;
    width: auto;
    border-radius: 5px;
    overflow: hidden
}
.card.flat {
  box-shadow: none !important
}
</style>
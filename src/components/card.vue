<template>
  <div class="card bg-white">
      <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card {
    box-shadow: rgba(0,0,0,0.1) 1px 2px 5px, rgba(0,0,0,0.1) -1px 2px 5px;
    position: relative;
    width: auto;
    border-radius: 4px;
}
.card.flat {
  box-shadow: none !important
}
</style>
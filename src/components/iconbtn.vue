<template>
  <div
    class="
      inline-block
        icon-btn
      rounded-full
      overflow-hidden
      border-0 
      outline-none
      flex
      justify-center
      items-center
      cursor-pointer
    "
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: "icon-btn",
};
</script>

<style scoped>
.icon-btn {
    height: 30px;
    width: 30px;
}
</style>

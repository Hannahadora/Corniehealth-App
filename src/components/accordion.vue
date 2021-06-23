<template>
  <div class="w-full mx-4 flex flex-col">
    <slot :name="`item-${i}`" v-for="i in count" :key="i"></slot>
  </div>
</template>
<script>
export default {
  name: "Accordion",
  props: {
    count: Number,
  },
};
</script>

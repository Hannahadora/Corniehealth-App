<template>
  <span class="w-8 h-8 relative">
    <div
      class="
        w-full
        h-full
        rounded-full
        overflow-hidden
        shadow-inner
        text-center
        cursor-pointer
      "
    >
      <img
        :src="src"
        class="
          object-cover object-center
          w-full
          h-full
          visible
          group-hover:hidden
        "
      />
    </div>
  </span>
</template>
<script>
export default {
  name: "Avatar",
  props: {
    src: String,
  },
};
</script>

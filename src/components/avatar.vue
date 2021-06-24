<template>
  <span class="w-10 h-10 relative">
    <div
      class="
        group
        w-full
        h-full
        rounded-full
        overflow-hidden
        shadow-inner
        text-center
        table
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

<template>
  <router-link
    active-class="bg-gray-100 font-semibold"
    :to="to"
    class=" text-sm
          cursor-pointer
          text-gray-400
          hover:bg-gray-400
          py-4
          px-4
          rounded-lg
          hover:bg-opacity-10
          block"
  >
    <span class="mr-2 flex">
      <slot name="default" :active="active" />
    </span>
    <span class="capitalize">{{ name }}</span>
  </router-link>
</template>
<script>
export default {
  name: "sidebarLink",
  props: {
    to: String,
    name: String,
  },
  computed: {
    active() {
      const currentRoute = this.$route.fullPath;
      return currentRoute == this.$router.resolve(this.to).path;
    },
  },
};
</script>

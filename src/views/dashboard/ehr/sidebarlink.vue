<template>
  <router-link
    active-class="p-3 bg-primary rounded-full text-white"
    :to="to"
    class="text-sm p-2 mb-1 font-semibold flex items-center text-semibold"
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

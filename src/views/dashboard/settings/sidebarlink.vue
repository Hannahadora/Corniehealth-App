<template>
  <router-link
    active-class="p-3 bg-blue-50 rounded-full text-black"
    :to="to"
    class="text-xs p-3 mb-1  font-medium flex items-center"
  >
    <span class="mr-2 flex">
      <slot name="default" :active="active" />
    </span>
    <span class="capitalize">{{ name }}</span>
  </router-link>
</template>
<script>
export default {
  name: "SettingsSideBarLink",
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

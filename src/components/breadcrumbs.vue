<template>
  <div class="flex flex-row items-center text-primary h-5 italic">
    <router-link :to="pages.base" class="mr-4">
      <three-dot-icon />
    </router-link>
    <span class="flex items-center">
      <span v-for="(page, i) in pages.all" :key="i" class="flex items-center ml-2">
        <chevrons-right-icon class="" />
        <router-link
          :to="page.path"
          :class="{ 'text-black': isActive(page) }"
          class="ml-2 capitalize text-sm text-blue-yonder"
        >
          {{ page.name }}
        </router-link>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import ChevronsRightIcon from "@/components/icons/chevrons-right.vue";
import { RouteLocation } from "vue-router";

@Options({
  components: {
    ThreeDotIcon,
    ChevronsRightIcon,
  },
})
export default class BreadCrumbs extends Vue {
  get pages() {
    const all = this.$route.matched.map((route) => this.$router.resolve(route));
    return {
      base: "/",
      all,
    };
  }

  isActive(page: RouteLocation) {
    return page.path == this.$router.currentRoute.value.fullPath;
  }
}
</script>

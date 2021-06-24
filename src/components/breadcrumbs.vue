<template>
  <div class="flex flex-row items-center text-primary h-5 italic">
    <router-link :to="pages.base" class="mr-4">
      <three-dot-icon />
    </router-link>
    <span class="mr-2" v-if="pages.parent">
      <chevron-right-icon />
    </span>
    <span class="flex items-center mr-2" v-if="pages.parent">
      <page-icon />
      <router-link :to="pages.parent" class="ml-2 capitalize">{{
        pages.parentName
      }}</router-link>
    </span>
    <span class="mr-2">
      <chevron-right-icon />
    </span>
    <span class="flex items-center">
      <page-icon active />
      <router-link to="" class="ml-2 capitalize">{{
        pages.active
      }}</router-link>
    </span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import PageIcon from "@/components/icons/page.vue";

@Options({
  components: {
    ThreeDotIcon,
    ChevronRightIcon,
    PageIcon,
  },
})
export default class BreadCrumbs extends Vue {
  get pages() {
    let fullPath = this.$router.currentRoute.value.fullPath;
    if (fullPath.endsWith("/")) {
      fullPath = fullPath.slice(0, fullPath.length - 1);
    }
    let lastSep = fullPath.lastIndexOf("/");
    let parent = fullPath.substring(0, lastSep);

    lastSep = parent.lastIndexOf("/");
    let base = parent.substring(0, lastSep);
    if (!base.startsWith("/")) base = `/${base}`;
    const parentName = this.$route.matched.find((match) => {
      return match.path == parent;
    })?.name;
    return {
      base,
      parent,
      parentName,
      active: this.$router.currentRoute.value.name,
    };
  }
}
</script>

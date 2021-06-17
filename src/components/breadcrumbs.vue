<template>
  <div class="flex flex-row items-center text-primary h-5 italic">
    <span class="mr-4">
      <three-dot-icon />
    </span>
    <span class="mr-2">
      <chevron-right-icon />
    </span>
    <span class="flex items-center mr-2">
      <page-icon />
      <span class="ml-2 capitalize">Dashboard</span>
    </span>
    <span class="mr-2">
      <chevron-right-icon />
    </span>
    <span class="flex items-center">
      <page-icon active />
      <span class="ml-2 capitalize">Settings</span>
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
export default class BreadCrumbs extends Vue {}
</script>

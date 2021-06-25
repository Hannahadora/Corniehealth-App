<template>
  <main
    class="h-screen grid overflow-hidden"
    :class="{ 'main-app': hovered, 'mini-app': !hovered }"
  >
    <div
      class="w-full"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
    >
      <cornie-side-bar />
    </div>
    <div class="h-full ml-2">
      <nav-bar class="ml" />
      <div class="pr-4 pl-6 pt-2 flex flex-col body-content bg-gray-100">
        <bread-crumbs class="" />
        <router-view class="" />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSideBar from "@/components/corniesidebar.vue";
import NavBar from "@/components/navbar.vue";
import BreadCrumbs from "@/components/breadcrumbs.vue";

@Options({
  components: {
    CornieSideBar,
    NavBar,
    BreadCrumbs,
  },
})
export default class Dashboard extends Vue {
  hovered = false;
}
</script>
<style>
.mini-app {
  grid-template-columns: 5% 95%;
}
.main-app {
  grid-template-columns: 17% 82%;
}
.body-content {
  min-height: 91%;
  height: 91%;
}
</style>

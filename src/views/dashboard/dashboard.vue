<template>
  <main
    class="h-screen grid overflow-hidden"
    :class="{ 'main-app': hovered, 'mini-app': !hovered }"
  >
    <div
      class="block"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
    >
      <cornie-side-bar />
    </div>
    <div class="h-full flex flex-col w-auto">
      <nav-bar class="" />
      <div class="pr-6 pl-6 pt-2 flex flex-col body-content bg-gray-100">
        <!-- <bread-crumbs class="" /> -->
        <router-view class="flex-grow" />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
  import BreadCrumbs from "@/components/breadcrumbs.vue";
  import CornieSideBar from "@/components/corniesidebar.vue";
  import NavBar from "@/components/navbar.vue";
  import { Options, Vue } from "vue-class-component";

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
  .app {
    transition: 0.4s grid-template-columns ease-out;
  }
  .mini-app {
    grid-template-columns: 3% 97%;
  }
  .main-app {
    grid-template-columns: 202px calc(100% - 202px);
  }
  .body-content {
    height: 94vh;
  }
</style>

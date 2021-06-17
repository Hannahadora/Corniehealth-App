<template>
  <main class="main-app h-screen">
    <div class="w-full">
      <cornie-side-bar />
    </div>
    <div class="h-full">
      <nav-bar class="" />
      <div class="px-4 pt-2 flex flex-col body-content bg-gray-100">
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
export default class Dashboard extends Vue {}
</script>
<style>
.main-app {
  display: grid;
  grid-template-columns: 5.5% 94.5%;
}
.body-content {
  min-height: 91%;
  height: 91%;
}
</style>

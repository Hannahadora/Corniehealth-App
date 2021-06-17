<template>
  <main class="main-app h-screen">
    <div class="w-full">
      <cornie-side-bar />
    </div>
    <div class="w-full h-full">
      <nav-bar />
      <router-view class="w-full body-content bg-gray-100" />
    </div>
  </main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSideBar from "@/components/corniesidebar.vue";
import NavBar from "@/components/navbar.vue";
@Options({
  components: {
    CornieSideBar,
    NavBar,
  },
})
export default class SignUp extends Vue {}
</script>
<style>
.main-app {
  display: grid;
  grid-template-columns: 5.5% 94.5%;
}
.body-content {
  min-height: 91%;
}
</style>

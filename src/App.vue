<template>
  <main class="main-app h-screen w-full block">
    <router-view />
    <v-confirm />
  </main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSideBar from "@/components/corniesidebar.vue";
import NavBar from "@/components/navbar.vue";
import VConfirm from "@/components/confirm.vue";

@Options({
  components: {
    CornieSideBar,
    NavBar,
    VConfirm,
  },
})
export default class App extends Vue {}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
</style>

<template>
  <main class="main-app h-screen w-full block">
    <router-view />
    <v-confirm />
    <notify />
  </main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSideBar from "@/components/corniesidebar.vue";
import NavBar from "@/components/navbar.vue";
import VConfirm from "@/components/confirm.vue";
import Notify from "@/components/notify.vue";

@Options({
  components: {
    CornieSideBar,
    NavBar,
    VConfirm,
    Notify,
  },
})
export default class App extends Vue {}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap");
* {
  font-family: "Inter", sans-serif;
}
</style>

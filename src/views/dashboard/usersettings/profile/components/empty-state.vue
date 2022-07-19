<template>
  <div class="w-full bg-white p-4 bg-red">
    <div class="container-fluid">
      <div class="w-full border-b-2 curved flex py-2">
        <h2 class="text-primary text-lg font-bold">Pracitioner Profile</h2>
      </div>
    </div>
    <div class="container-fluid mt-5 flex items-center justify-center">
      <div class="w-full flex flex-col justify-center items-center h-96">
        <img src="@/assets/img/practitioners.svg" />
        <h3 class="text-center mt-5">You are yet to set up your profile</h3>
        <button
          class="bg-danger rounded text-white mt-5 py-2 px-6 focus:outline-none hover:opacity-90"
          @click="setup"
        >
          Set Up Profile
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Button from "@/components/globals/corniebtn.vue";

@Options({
  name: "Empty State",
  components: {
    Button,
  },
})
export default class EmptySetup extends Vue {
  setup() {
    console.log("Setting up");
    this.$router.push("edit-profile");
  }
}
</script>
<style></style>

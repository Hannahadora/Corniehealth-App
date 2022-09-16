<template>
  <div
    class="flex flex-col justify-center text-center w-full h-full pt-40 items-center"
  >
    <div class="self-center">
      <!-- <empty-icon /> -->
      <img src="@/assets/img/nolabTests.svg" />
    </div>
    <div class="font-bold text-xl mt-3">No Lab data to Display</div>
    <div class="text-gray-600 text-sm pt-2 px-40">
      We will maintain a record of your medication orders here. Book and save
      upto 40% on your tests.
    </div>
    <div></div>
    <div class="flex flex-col pt-5 space-y-4">
      <div class="">
        <div
          @click="newLabTests"
          class="bg-danger p-2 rounded-xl text-white font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          Book Lab Tests
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  // import EmptyIcon from "./empty-icon.vue";

  @Options({
    components: {
      // EmptyIcon,
    },
    emits: ["newLabTests"],
  })
  export default class EmptyState extends Vue {
    newLabTests() {
      // this.$emit("newLabTests");
      this.$router.push("/patient/appointments/");
    }
  }
</script>

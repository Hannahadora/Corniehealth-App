<template>
  <div class="w-full flex flex-col justify-center">
    <div
      class="w-full p-4 flex items-center justify-start border-b-2 font-bold text-xl text-primary"
    >
      Procedure
    </div>
    <div
      class="flex flex-col justify-center text-center w-full h-96 pt-40 items-center"
    >
      <div class="self-center">
        <!-- <empty-icon /> -->
        <img src="@/assets/img/no-impression.svg" />
      </div>
      <div class="font-bold text-xl mt-3">
        Patient currently have no procedure on record
      </div>
      <div class="flex flex-col pt-5">
        <div></div>
        <div class="">
          <div
            @click="newProcedure"
            class="bg-danger p-2 rounded-xl text-white font-bold px-8 py-3 mx-2 cursor-pointer"
          >
            Add New Procedure
          </div>
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
    emits: ["procedure"],
  })
  export default class EmptyState extends Vue {
    newProcedure() {
      console.log("jhere");
      this.$emit("procedure");
    }
  }
</script>

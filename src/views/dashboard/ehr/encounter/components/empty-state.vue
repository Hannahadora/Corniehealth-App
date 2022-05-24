<template>
  <div class="w-full flex flex-col justify-center">
    <div
      class="w-full p-4 flex items-center justify-start border-b-2 font-bold text-xl text-primary"
    >
      Encounter
    </div>
    <div class="flex flex-col justify-center text-center w-full h-96 pt-40 items-center">
      <div class="self-center">
        <empty-icon />
      </div>
      <div class="font-bold text-3xl">No Encounter on Record</div>
      <div class="flex flex-col pt-5">
        <div></div>
        <div class="">
          <div
            @click="newEncounter"
            class="bg-danger p-2 rounded-xl text-white-cotton-ball font-bold px-8 py-3 mx-2 cursor-pointer"
          >
            New Encounter
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyIcon from "./empty-icon.vue";

@Options({
  components: {
    EmptyIcon,
  },
  emits: ["new_encounter"],
})
export default class EmptyState extends Vue {
  newEncounter() {
    this.$emit("new_encounter");
  }
}
</script>

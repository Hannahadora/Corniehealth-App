<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span
        class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
      >
        Specialties
      </span>
      <span class="w-full">
        <special-empty-state v-if="empty" />
        <special-existing-state v-else @special-added="specialadded"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ISpecial from "@/types/ISpecial";
import { namespace } from "vuex-class";
import SpecialEmptyState from "./emptyState.vue";
import SpecialExistingState from "./existingState.vue";
import IPractitioner from "@/types/IPractitioner";

const special = namespace("special");

@Options({
  name: "SpecialIndex",
  components: {
    SpecialExistingState,
    SpecialEmptyState,
  },
})
export default class SpecialIndex extends Vue {

  practitionerToUpdate = {} as ISpecial;

  get empty() {
    return this.specials.length < 1;
  }

  @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

   async specialadded(){
     await this.fetchSpecials();
  }

   created() {
     this.fetchSpecials();
  }
}
</script>

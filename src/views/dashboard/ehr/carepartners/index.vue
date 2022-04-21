<template>
  <div class="flex justify-center bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Care Partners
      </span>
      <span class="w-full h-screen">
        <carepartner-empty-state v-if="empty" />
        <carepartner-existing-state v-else />
      </span>
    </div>
  </div>

</template>
<script lang="ts">
import ICarePartner from "@/types/ICarePartner";
import { Options, Vue } from "vue-class-component";
import CarepartnerEmptyState from "./emptyState.vue";
import CarepartnerExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const CarePartnersStore = namespace("CarePartnersStore");


@Options({
  name: "CareteamIndex",
  components: {
    CarepartnerEmptyState,
    CarepartnerExistingState,
  },
})
export default class CareteamIndex extends Vue {
  addCareteam = false;

  get empty() {
    return this.carePartners.length < 1;
  }

 
  @CarePartnersStore.State
  carePartners!: ICarePartner[];

  @CarePartnersStore.Action
  get!: () => Promise<void>;

  async created() {
    await this.get();
  }
}
</script>

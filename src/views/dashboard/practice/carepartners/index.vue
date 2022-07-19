<template>
  <div
    class="flex justify-center pb-76 bg-white shadow-md p-3 mt-2 mb-2 rounded w-full"
  >
    <div class="w-full p-2 pb-96">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Care Partners
      </span>
      <span class="w-full">
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
  name: "CarePartnerIndex",
  components: {
    CarepartnerEmptyState,
    CarepartnerExistingState,
  },
})
export default class CarePartnerIndex extends Vue {

  get empty() {
    return this.carePartners.length < 1;
  }

 
  @CarePartnersStore.State
  carePartners!: ICarePartner[];

  @CarePartnersStore.Action
  fetchCarePartners!: () => Promise<void>;

  async created() {
    await this.fetchCarePartners();
  }
}
</script>

<template>
  <div class="flex justify-center  bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
            py-2
        "
      >
      Clinical Impression
      </span>
      <span class="w-full h-screen">
          <impressions-empty-state
                v-if="empty"
          />
          <impressions-existing-state
          v-else

          />
                  
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IImpression from "@/types/IImpression";
import { Options, Vue } from "vue-class-component";
import ImpressionsEmptyState from "./emptyState.vue";
import ImpressionsExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const impression = namespace("impression");

@Options({
  name: "ImpressionsIndex",
  components: {
    ImpressionsEmptyState,
    ImpressionsExistingState,
  },
})
export default class ImpressionsIndex extends Vue {
  addImpression = false;
  show=false;


  get empty() {
    return this.impressions.length < 1;
  }
 get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }

 @impression.State
  impressions!: IImpression[];

  @impression.Action
  fetchImpressions!: (patientId: string) => Promise<void>;


  impressionAdded() {
    this.show = false;
 this.impressions;
  this.fetchImpressions(this.activePatientId);
  }


created() {
    if (this.impressions.length < 1) this.fetchImpressions(this.activePatientId);
  }
}
</script>

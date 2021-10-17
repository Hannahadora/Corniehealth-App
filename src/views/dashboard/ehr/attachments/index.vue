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
       Attachments
      </span>
      <span class="w-full h-screen">
          <attachment-empty-state
                v-if="empty"
          />
          <attachment-existing-state
          v-else

          />
                  
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IImpression from "@/types/IImpression";
import { Options, Vue } from "vue-class-component";
import AttachmentEmptyState from "./emptyState.vue";
import AttachmentExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const impression = namespace("impression");

@Options({
  name: "AttachmentIndex",
  components: {
    AttachmentEmptyState,
    AttachmentExistingState,
  },
})
export default class AttachmentIndex extends Vue {
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

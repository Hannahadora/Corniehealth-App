<template>
  <div class="flex justify-center bg-white shadow-md p-3 mb-2 rounded w-full">
    <div class="w-full">
      <span
        class="
          flex flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
        Attachment
      </span>
      <span class="w-full h-screen">
        <allergys-empty-state v-if="empty" />
        <allergys-existing-state
          @attachment-added="attachmentAdded"
          :attachments="attachments"
          v-else
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IAttachment from "@/types/IAttachment";
import { Options, Vue } from "vue-class-component";
import AttachmentEmptyState from "./emptyState.vue";
import AttachmentExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const attachments = namespace("attachments");

@Options({
  name: "AttachmentIndex",
  components: {
    AttachmentEmptyState,
    AttachmentExistingState,
  },
})
export default class AttachmentIndex extends Vue {
  addAllergy = false;
  show = false;
  // TaskToUpdate = {} as IAllergy;
  //  @attachments.Action
  // fetchAttachment!: (patientId: string) => Promise<void>;

  get empty() {
    return this.attachments.length < 1;
  }
 get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }


  @attachments.State
  attachments!: IAttachment[];

  @attachments.Action
  fetchAttachment!: (patientId: string) => Promise<void>;

  attachmentAdded() {
    this.show = false;
    this.attachments;
    this.fetchAttachment(this.activePatientId);
  }

  mounted() {
    this.fetchAttachment(this.activePatientId);
  }

  created() {
    if (this.attachments.length < 1) this.fetchAttachment(this.activePatientId);
  }
}
</script>

<template>
  <main class="p-6">
    <empty-state
      heading="No designation recorded"
      subheading="Add new designation"
      class="mt-6"
      v-if="isEmpty"
    >
      <template #icon>
        <img src="@/assets/img/office.svg" class="inline-block mr-2" />
      </template>
      <template #actions>
        <button
          class="bg-danger rounded-full text-white py-2 px-6 mt-5 focus:outline-none hover:opacity-90"
          @click="registerNew = true"
        >
          <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
          New Appointment
        </button>
        <side-modal
          :visible="registerNew"
          @closesidemodal="closeModal"
          :header="'New Appointment'"
        >
          <AppointmentModal @closesidemodal="closeModal" />
        </side-modal>
      </template>
    </empty-state>

    <existing-state v-else :designations="designations" />
  </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EmptyState from "@/components/CornieEmptyState.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Card from "@/components/cornie-card/CornieCard.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import AppointmentModal from "./Appointmentdialog.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import { string as yupString } from "yup";
import ExistingState from "./ExistingState.vue";
import { namespace } from "vuex-class";
import { IDesignation } from "@/types/IDesignation";

const designation = namespace("designation");

@Options({
  name: "Designations",
  components: {
    EmptyState,
    CornieDialog,
    Card,
    CardText,
    CardTitle,
    ArrowLeft,
    CornieInput,
    IconBtn,
    CornieSelect,
    CustomCheckbox,
    ExistingState,
    AppointmentModal,
    SideModal,
  },
})
export default class Designations extends Vue {
  @designation.State
  designations!: IDesignation[];

  registerNew = false;
  @designation.Action
  fetchDesignations!: () => Promise<void>;

  get isEmpty() {
    return false;
  }
  closeModal() {
    this.registerNew = false;
    // this.selectedTeamId = "";
  }
  create() {
    if (!this.designations.length) this.fetchDesignations();
  }
}
</script>

<style></style>

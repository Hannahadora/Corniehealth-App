<template>
  <cornie-card class="flex flex-col" height="100%">
    <cornie-card-text>
      <h1
        class="
          font-extrabold
          text-lg text-primary
          border-b-2 border-gray
          py-3
          mx-3
        "
      >
        Patients
      </h1>
    </cornie-card-text>
    <cornie-card-text class="flex-grow flex items-center justify-center">
      <cornie-empty-state
        heading="There is currently no patient record!"
        subheading="Register new patients by clicking on the 'Register New' button"
      >
        <template #icon>
          <img src="@/assets/img/patients-and-doctors.svg" />
        </template>
        <template #actions>
          <div class="flex justify-center">
            <cornie-btn class="text-primary border-2 border-primary m-5">
              Export Register
            </cornie-btn>
            <cornie-btn
              class="bg-danger text-white m-5"
              @click="toggleRegisterPatientDialog"
            >
              Register New
            </cornie-btn>
          </div>
        </template>
      </cornie-empty-state>
    </cornie-card-text>

    <!-- Register Patient Dialog -->
    <cornie-dialog v-model="registerPatientDialogVisible" center>
      <cornie-card width="400px">
        <cornie-card-title>
          <span class="font-extrabold text-primary">
            Patient Registration
          </span>
          <cornie-spacer />
          <cornie-icon-btn @click="toggleRegisterPatientDialog">
            <close-icon />
          </cornie-icon-btn>
        </cornie-card-title>
        <cornie-card-text>
          <span class="text-sm">
            Is this patient already registered on CornieHealth?
          </span>
        </cornie-card-text>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            class="text-primary border-2 border-primary mr-3 px-4"
            @click="registerNewPatient"
          >
            No
          </cornie-btn>
          <cornie-btn
            class="bg-danger text-white px-4"
            @click="toggleGetPatient, toggleRegisterPatientDialog"
          >
            Yes
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-dialog>
    <register-existing v-model:visible="getPatientDialogVisible" />
  </cornie-card>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import CornieEmptyState from "@/components/CornieEmptyState.vue";
import CornieCard from "@/components/cornie-card/CornieCard.vue";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CornieSpacer from "@/components/CornieSpacer.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTooltip from "@/components/CornieTooltip.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import InformationIcon from "@/components/icons/InformationIcon.vue";
import RegisterExisting from "./register-existing.vue";

@Options({
  name: "PatientEmptyState",
  components: {
    CornieEmptyState,
    CornieCard,
    CornieCardText,
    CornieCardTitle,
    CornieBtn,
    CornieDialog,
    CornieIconBtn,
    CloseIcon,
    CornieSpacer,
    ArrowLeftIcon,
    CornieInput,
    CornieTooltip,
    InformationIcon,
    RegisterExisting,
  },
})
export default class EmptyState extends Vue {
  registerPatientDialogVisible = false;
  getPatientDialogVisible = false;

  toggleRegisterPatientDialog() {
    this.registerPatientDialogVisible = !this.registerPatientDialogVisible;
  }

  toggleGetPatient() {
    this.getPatientDialogVisible = !this.getPatientDialogVisible;
  }

  registerNewPatient() {
    this.$router.push({ name: "New Patient" });
  }
}
</script>

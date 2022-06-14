<template>
  <cornie-dialog v-model="show" center>
    <cornie-card width="400px">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false" class="mr-2">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span class="font-extrabold text-primary">
          Patient Registrationss
        </span>
      </cornie-card-title>
      <cornie-card-text>
        <span class="text-sm mb-3 flex">
          Enter Patient’s MRN/Email/Unique ID
          <cornie-tooltip class="ml-3" right>
            <template #activator="{ on }">
              <span v-on="on">
                <information-icon />
              </span>
            </template>
            <div>hello</div>
          </cornie-tooltip>
        </span>
        <cornie-input placeholder="Enter" v-model="patientQuery" />
      </cornie-card-text>
      <cornie-card-text class="flex justify-end">
        <cornie-btn
          class="text-primary border-2 border-primary mr-3 px-4"
          @click="show = false"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          class="bg-danger text-white px-4"
          @click="findPatient"
        >
          Next
        </cornie-btn>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card/CornieCard.vue";
  import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
  import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieTooltip from "@/components/CornieTooltip.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import InformationIcon from "@/components/icons/InformationIcon.vue";
  import { cornieClient } from "@/plugins/http";
  import { IPatient } from "@/types/IPatient";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const patient = namespace("patients");

  @Options({
    name: "RegisterExistingPatient",
    components: {
      CornieCard,
      CornieCardTitle,
      CornieCardText,
      CornieTooltip,
      ArrowLeftIcon,
      InformationIcon,
      CornieDialog,
      CornieBtn,
      CornieInput,
      CornieIconBtn,
    },
  })
  export default class RegisterExisting extends Vue {
    @Prop({ type: Boolean, default: false })
    visible!: boolean;

    @PropSync("visible")
    show!: boolean;

    patientQuery = "";

    loading = false;

    @patient.Mutation
    addPatients!: (patients: IPatient[]) => void;

    async findPatient() {
      if (!this.patientQuery) return;
      this.loading = true;
      try {
        const response = await cornieClient().get("/api/v1/patient/search", {
          query: this.patientQuery,
        });
        const patients = response.data as IPatient[];
        if (!patients.length)
          window.notify({ msg: "Patient not found", status: "error" });
        this.show = false;
        const [patient, ..._] = patients;
        if (patient.belongsToPractice) return;
        await this.addToPractice(patient);
        this.addPatients([patient]);
      } catch (error) {
        window.notify({ msg: "Patient not found", status: "error" });
      }
      this.loading = false;
    }

    async addToPractice(patient: IPatient) {
      const confirmed = await window.confirmAction({
        message: `You are only authorized to access 
                patients data for the purpose of providing care. 
                Please note that this activity is monitored and 
                logged for data security purposes`,
        title: "Confirmation",
      });
      if (!confirmed) return;
      const added = this.execAdd(patient.id!!);
      if (!added)
        return window.notify({
          msg: "Patient not added to your organization",
          status: "error",
        });
      window.notify({
        msg: "Patient added to your organization",
        status: "success",
      });
    }
    async execAdd(patientId: string): Promise<boolean> {
      try {
        await cornieClient().post(`/api/v1/patient/associate/${patientId}`, {});
        return true;
      } catch (error) {
        return false;
      }
    }
  }
</script>

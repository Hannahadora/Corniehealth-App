<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="
            text-primary
            font-extrabold
            text-lg
            border-l-2 border-gray-100
            pl-2
          "
        >
          Demographics Data
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">
          Fill the form below to add demographics information.
        </p>
        <v-form @submit="save" ref="form">
          <cornie-select
            label="Language"
            class="mb-5"
            placeholder="Select One"
            :items="['English', 'Igbo', 'Yoruba', 'Hausa', 'French', 'Edo']"
            v-model="primaryLanguage"
          />

          <cornie-select
            label="Secondary Language"
            class="mb-5"
            placeholder="Select One"
            :items="['English', 'Igbo', 'Yoruba', 'Hausa', 'French', 'Edo']"
            v-model="secondaryLanguage"
          />
          <cornie-select
            label="Race"
            class="mb-5"
            placeholder="Select One"
            :items="['Black', 'White', 'Latino', 'Asian']"
            v-model="race"
          />

          <cornie-select
            label="Select Preferred Contact Channel"
            class="mb-5"
            placeholder="Select One"
            :items="['Text', 'Call', 'Email', 'Post']"
            v-model="preferredContactChannel"
          />
          <cornie-select
            label="Ethnicity"
            class="mb-5"
            placeholder="Select One"
            :items="['European', 'African']"
            v-model="primaryEthnicity"
          />
          <cornie-select
            label="Secondary Ethnicity"
            class="mb-5"
            placeholder="Select One"
            :items="['European', 'African']"
            v-model="secondaryEthnicity"
          />
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            @click="save"
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PeriodPicker from "@/components/daterangepicker.vue";

import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { Demographics, IPatient } from "@/types/IPatient";

const patients = namespace("patients");

@Options({
  name: "DemographicsDialog",
  components: {
    ...CornieCard,
    PeriodPicker,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
  },
})
export default class DemographicsDialog extends Vue {
  loading = false;
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object })
  patient!: IPatient;

  @Prop({ type: Object })
  demographics!: Demographics;

  @PropSync("demographics")
  demographicsSync!: Demographics;

  currentId = "";
  primaryLanguage = "";
  secondaryLanguage = "";
  race = "";
  patientId = "";
  preferredContactChannel = "";
  primaryEthnicity = "";
  secondaryEthnicity = "";

  @patients.Mutation
  updatePatient!: (patient: IPatient) => void;

  get payload() {
    const payload = {
      primaryLanguage: this.primaryLanguage,
      secondaryLanguage: this.secondaryLanguage,
      preferredContactChannel: this.preferredContactChannel,
      primaryEthnicity: this.primaryEthnicity,
      secondaryEthnicity: this.secondaryEthnicity,
      race: this.race,
    } as Demographics;
    if (this.patient?.id) payload.patientId = this.patient.id;
    if (this.currentId) payload.id = this.currentId;
    return payload;
  }

  async save() {
    const report = await (this.$refs.form as any).validate();
    if (!report.valid) return;
    this.loading = true;
    if (this.patient) await this.submit();
    else this.demographicsSync = this.payload;
    this.loading = false;
  }

  async submit() {
    const action = this.currentId ? "Updated" : "Created";
    let result: any;
    try {
      if (this.currentId) result = await this.update();
      else result = await this.createNew();
      window.notify({
        msg: `Demographics ${action} successfully`,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Demographics not ${action}`, status: "error" });
    }
    if (result) this.updatePatient(result);
  }

  updatePatientData(data: Demographics) {
    const patient = this.patient;
    patient.demographicsData = data;
    this.updatePatient(patient);
  }

  async createNew() {
    const response = await cornieClient().post(
      "/api/v1/patient/demographics",
      this.payload
    );
    return response.data;
  }
  async update() {
    const response = await cornieClient().put(
      `/api/v1/patient/demographics/${this.currentId}`,
      this.payload
    );
    return response.data;
  }
  hydrate() {
    const data = this.patient.demographicsData;
    if (!data) return;
    this.primaryLanguage = data.primaryLanguage;
    this.secondaryLanguage = data.secondaryLanguage || "";
    this.race = data.race || "";
    this.preferredContactChannel = data.preferredContactChannel || "";
    this.primaryEthnicity = data.primaryEthnicity || "";
    this.secondaryEthnicity = data.secondaryEthnicity || "";
    this.currentId = data.id!!;
  }

  @Watch("patient")
  patientChanged() {
    if (this.patient?.id) this.hydrate();
  }

  created() {
    if (this.patient?.id) this.hydrate();
  }
}
</script>

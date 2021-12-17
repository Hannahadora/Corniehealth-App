<template>
  <div class="container-fluid p-3">
    <div class="text-gray-400">
      Fields with <span class="text-danger">*</span> are required
    </div>
    <div class="w-full" style="overflow-y: scroll; height: 650px">
      <div class="w-full mb-2 flex items-center">
        <div class="w-6/12 -mb-">
          <form @submit="(e) => e.preventDefault()">
            <origin :value="testValue" @inpu="selectOrigin" :label="'Origin'" />
          </form>
        </div>
        <div class="w-6/12 mt-4">
          <auto-complete
            :label="'Ward'"
            v-model="reqBody.ward"
            :items="['Ward 1', 'Ward 2']"
          />
        </div>
      </div>

      <div class="w-full my-2 flex items-center">
        <div class="w-6/12">
          <auto-complete
            :label="'Room'"
            v-model="reqBody.room"
            :items="['11', '12', '13', '14', '15']"
          />
        </div>
        <div class="w-6/12">
          <auto-complete
            :label="'Bed'"
            v-model="reqBody.bed"
            :items="['20', '21', '22', '23', '24', '25']"
          />
        </div>
      </div>

      <div class="w-full my-2 flex items-center">
        <div class="w-6/12">
          <fhir-input
            v-model="reqBody.admitSource"
            label="Admit Source"
            reference="http://hl7.org/fhir/ValueSet/encounter-admit-source"
          />
          <!-- <fhir-input
                        v-model="clinicalStatus"
                        label="Clinical Status"
                        reference="http://hl7.org/fhir/ValueSet/condition-clinical"
                        :rules="required"
                    /> -->
          <!-- <auto-complete :label="'Admit Source'" :items="[ 'Source 1', 'Source 2' ]" /> -->
        </div>
        <div class="w-6/12">
          <auto-complete
            v-model="reqBody.reAdmission"
            :label="'Re-admission'"
            :items="['Yes', 'No']"
          />
        </div>
      </div>

      <div class="w-full my-2 flex items-center">
        <div class="w-6/12">
          <fhir-input
            v-model="reqBody.dietPreference"
            label="Diet Preference"
            reference="http://hl7.org/fhir/ValueSet/encounter-diet"
          />
        </div>
        <div class="w-6/12">
          <fhir-input
            v-model="reqBody.specialCourtesy"
            label="Reference Special Courtsey"
            reference="http://hl7.org/fhir/ValueSet/encounter-special-courtesy"
          />
        </div>
      </div>

      <div class="w-full my-2 flex items-center">
        <div class="w-6/12">
          <fhir-input
            v-model="reqBody.specialArrangement"
            label="Special Arrangement"
            reference="http://hl7.org/fhir/ValueSet/encounter-special-arrangements"
          />
        </div>
        <div class="w-6/12 -mt-5">
          <!-- <cornie-input :label="'Destination'" /> -->
          <origin
            :value="testValue"
            @inpu="selectDestination"
            :label="'Destination'"
          />
        </div>
      </div>

      <div class="w-full my-2 flex items-center">
        <div class="w-6/12">
          <fhir-input
            v-model="reqBody.dischargeDisposition"
            label="Discharge Disposition"
            reference="http://hl7.org/fhir/ValueSet/encounter-discharge-disposition"
          />
        </div>
        <div class="w-6/12"></div>
      </div>

      <div
        class="w-full py-4 flex items-center"
        v-if="origin?.id || destination?.id"
        style="border-top: 1px dashed #c2c7d6"
      >
        <div class="w-4/12" v-if="origin?.id">
          <p class="font-bold text-danger">Origin</p>
          <div class="w-full styled-box p-4">
            <p class="flex flex-col items-start justify-start">
              <span style="color: #14171f" class="font-semibold">{{
                origin?.name
              }}</span>
              <span class="subtext" style="color: #667499">{{
                origin?.address
              }}</span>
            </p>
          </div>
        </div>
        <div class="w-4/12 ml-5" v-if="destination?.id">
          <p class="font-bold text-danger">Destination</p>
          <div class="w-full styled-box p-4">
            <p class="flex flex-col items-start justify-start">
              <span style="color: #14171f" class="font-semibold">{{
                destination?.name
              }}</span>
              <span class="subtext" style="color: #667499">{{
                destination?.address
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="flex justify-end">
        <corniebtn
          class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center"
          style="border: 1px solid #080056"
        >
          <span
            class="font-semibold text-primary-500"
            @click="() => $emit('closesidemodal')"
            >Cancel</span
          >
        </corniebtn>

        <CornieBtn
          v-if="hospitalisationId"
          :loading="loading"
          @click="onUpdate"
          class="bg-red-500 p-2 rounded-full px-8 mx-4"
        >
          <span class="text-white font-semibold">Update</span>
        </CornieBtn>

        <CornieBtn
          v-else
          :loading="loading"
          @click="admitPatient"
          class="bg-red-500 p-2 rounded-full px-8 mx-4"
        >
          <span class="text-white font-semibold">Admit</span>
        </CornieBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue";
import AutoComplete from "@/components/autocomplete.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import CollapseSection from "@/views/dashboard/ehr/procedures/components/collapse-section.vue";
import helper from "../helper/helper";
import TextArea from "@/components/textarea.vue";
import { IHospitalisation } from "@/types/IHospitalisation";
import { namespace } from "vuex-class";
import FhirInput from "@/components/fhir-input.vue";
import Origin from "./location-org.vue";
import User from "@/types/user";
import { Prop, Watch } from "vue-property-decorator";

const hospitalisation = namespace("hospitalisation");
const user = namespace("user");

@Options({
  components: {
    CornieBtn,
    AutoComplete,
    CornieInput,
    CornieSelect,
    DateTimePicker,
    CollapseSection,
    TextArea,
    FhirInput,
    Origin,
  },
})
export default class AdmitPatient extends Vue {
  @hospitalisation.Action
  createHospitalisation!: (body: IHospitalisation) => Promise<boolean>;

  @hospitalisation.Action
  updateHospitalisation!: (body: IHospitalisation) => Promise<boolean>;

  @user.Getter
  authPractitioner!: any;

  @user.State
  user!: User;

  @Prop({ type: String, default: "" })
  hospitalisationId!: string;

  @Prop({ type: Array, default: [] })
  items!: IHospitalisation[];

  origin: any = {};
  destination: any = {};

  reqBody = {
    // "origin": "d25cc910-0830-40cf-a0c8-7c303f381b29",
    // "ward": "string",
    // "room": "string",
    // "bed": "string",
    // "admitSource": "string",
    // "reAdmission": "string",
    // "dietPreference": "string",
    // "specialCourtesy": "string",
    // "specialArrangement": "string",
    // "destination": "25bc0c8e-bec8-401d-a1a3-bb74fee9dc4a",
    // "dischargeDisposition": "string",
    // "patientId": "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757"
  } as IHospitalisation;
  loading = false;
  testValue = "testing 12";

  get codes() {
    return helper.carePlanCodes;
  }

  get reeasonReferences() {
    return helper.carePlanReasonReferences;
  }

  get detailStatus() {
    return helper.carePlanDetailStatus;
  }

  selectOrigin(data: any) {
    this.origin = data;
  }

  selectDestination(data: any) {
    this.destination = data;
  }

  async admitPatient() {
    try {
      // this.reqBody.origin = 'd25cc910-0830-40cf-a0c8-7c303f381b29'
      this.reqBody.origin = this.authPractitioner.user?.organizationId;
      this.reqBody.destination = this.authPractitioner.user?.organizationId;
      this.reqBody.patientId = this.$route.params.id.toString();

      this.loading = true;
      const response = await this.createHospitalisation(this.reqBody);
      if (response) {
        this.$emit("closesidemodal");
        notify({
          msg: "Patient admitted successfully",
          status: "success",
        });
      } else {
        notify({
          msg: "Patient admission failed",
          status: "error",
        });
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      notify({
        msg: "Patient admission failed",
        status: "error",
      });
    }
  }

  async onUpdate() {
    try {
      this.loading = true;
      this.reqBody.id = this.hospitalisationId;
      this.reqBody.origin = this.authPractitioner.user?.organizationId;
      this.reqBody.destination = this.authPractitioner.user?.organizationId;

      const response = await this.updateHospitalisation(this.reqBody);
      this.loading = false;
      if (response) {
        this.$emit("closesidemodal");
        notify({
          msg: "Updated successfully",
          status: "success",
        });
      } else {
        notify({
          msg: "Update failed",
          status: "error",
        });
      }
    } catch (error) {
      this.loading = false;
    }
  }

  @Watch("hospitalisationId")
  updateReqBody() {
    if (this.hospitalisationId) {
      const hospitalisation = this.items?.find(
        (hospitalisation) => hospitalisation.id === this.hospitalisationId
      );
      if (hospitalisation) this.reqBody = { ...hospitalisation };
    } else {
      this.reqBody = {} as IHospitalisation;
    }
  }

  created() {}
}
</script>

<style scoped>
.styled-box {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
  border-radius: 8px;
}
</style>

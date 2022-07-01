<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ newaction }} Observation
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="save">
          <accordion-component
            class="text-primary"
            title="Basic Info"
            :opened="false"
          >
            <basic-info
              :basicInfo="basicInfo"
              @get-customers="setCustomers"
              @openReferenceModal="openReferenceModal"
            />
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Effective"
            :opened="false"
          >
            <div class="grid grid-cols-3 gap-3 mt-6 w-1/2">
              <cornie-radio
                name="effective"
                v-model="effectiveType"
                label="Date/Time"
                value="date-time"
                @change="effectiveType = 'date-time'"
              />
              <cornie-radio
                name="effective"
                v-model="effectiveType"
                value="period"
                label="Period"
                @change="effectiveType = 'period'"
              />
              <cornie-radio
                name="effective"
                v-model="effectiveType"
                value="instant"
                label="Instant"
                @change="effectiveType = 'instant'"
              />
            </div>
            <div class="grid grid-cols-2 gap-6 py-6">
              <date-picker
                class="w-full"
                label="Start Date/Time"
                v-model:date="effective.period.start"
                v-if="effectiveType == 'period'"
              />
              <date-picker
                class="w-full"
                label="End Date/Time"
                v-model:date="effective.period.end"
                v-if="effectiveType == 'period'"
              />
              <date-picker
                class="w-full"
                label="Date/Time"
                v-model:date="effective.instant.dateTime"
                v-if="effectiveType == 'instant'"
              />
              <date-picker
                class="w-full"
                label="Date/Time"
                v-model:date="effective.dateTime"
                v-if="effectiveType == 'date-time'"
              />
              <cornie-select
                class="w-full"
                label="Timezone"
                placeholder="Select"
                v-model="effective.instant.timeZone"
                :items="['a', 'b']"
                v-if="effectiveType == 'instant'"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Issue Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <date-picker
                class="w-full"
                label="Date/Time"
                v-model:date="issueInfo.dateTime"
                v-model:time="issueInfo.time"
              />
              <practitioner-select
                :rules="required"
                class="w-full"
                label="Performer"
                placeholder="Select"
                v-model="issueInfo.performer"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Value"
            :opened="false"
          >
            <div>
              <value-form @get-value="setValue" />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Reason Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <fhir-input
                reference="http://terminology.hl7.org/CodeSystem/data-absent-reason"
                class="w-full"
                label="Date Absent Reason"
                placeholder="Select"
                v-model="reasonInfo.dateAbsentReason"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-interpretation"
                class="w-full"
                label="Interpretion"
                placeholder="Interpretion"
                v-model="reasonInfo.interpretation"
              />

              <cornie-input
                class="w-full"
                label="Note"
                placeholder="Note"
                v-model="reasonInfo.note"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/body-site"
                class="w-full"
                label="Body Site"
                placeholder="Select"
                v-model="reasonInfo.bodysite"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/-observation-methods"
                class="w-full"
                label="Body Site"
                placeholder="Select"
                v-model="reasonInfo.bodysite"
              />
              <cornie-input
                class="w-full"
                label="Specimen"
                placeholder="Autoloaded"
                v-model="reasonInfo.specimen"
              />
              <cornie-select
                class="w-full"
                label="Device"
                placeholder="Device"
                v-model="reasonInfo.device"
                :items="['a', 'b']"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Reference Range"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-input
                class="w-full"
                label="Low"
                placeholder="Select"
                v-model="referenceRange.low"
              />
              <cornie-input
                class="w-full"
                label="high"
                placeholder="High"
                v-model="referenceRange.high"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-methods"
                class="w-full"
                label="Type"
                placeholder="Select"
                v-model="referenceRange.type"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/referencerange-appliesto"
                class="w-full"
                label="Applies To"
                placeholder="Select"
                v-model="referenceRange.appliesTo"
              />
              <cornie-input
                class="w-full"
                label="Age"
                placeholder="Enter"
                v-model="referenceRange.age"
              />
              <cornie-input
                class="w-full"
                label="Text"
                placeholder="Enter"
                v-model="referenceRange.text"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Member"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div
                class="w-full cursor-pointer"
                @click="
                  openReferenceModal('hasMember', [
                    'Observation',
                    'QuestionnaireResponse',
                    'MolecularSequence',
                  ])
                "
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Has Member"
                  placeholder="Select"
                  v-model="member.hasMemer"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
              <div
                class="w-full cursor-pointer"
                @click="
                  openReferenceModal('derivedFrom', [
                    'DocumentReference',
                    'ImagingStudy',
                    'Media',
                    'QuestionnaireResponse',
                    'Observation',
                    'MolecularSequence',
                  ])
                "
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Derived From"
                  placeholder="Select"
                  v-model="member.derivedFrom"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="text-primary"
            title="Component"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-codes"
                class="w-full"
                label="Code"
                placeholder="Select"
                v-model="component.code"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Value"
            :opened="false"
          >
            <div>
              <value-form :value="value" />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Reason Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <fhir-input
                reference="http://terminology.hl7.org/CodeSystem/data-absent-reason"
                class="w-full"
                label="Date Absent Reason"
                placeholder="Select"
                v-model="reasonInfo.dateAbsentReason"
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/observation-interpretation"
                class="w-full"
                label="Interpretion"
                placeholder="Interpretion"
                v-model="reasonInfo.interpretation"
              />
              <cornie-input
                class="w-full"
                label="Range(min)"
                placeholder="0"
                v-model="rangeMin"
                :rules="required"
              />
              <cornie-input
                class="w-full"
                label="Range(max)"
                placeholder="0"
                v-model="rangeMax"
                :rules="required"
              />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-between mt-24">
        <div
          class="text-red-500 py-1 px-2 text-sm cursor-pointer"
          @click="show = false"
        >
          Cancel
        </div>
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="save('draft')"
            class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
          >
            Save As Draft
          </cornie-btn>
          <cornie-btn
            @click="save('')"
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>

  <reference-modal
    v-model="showReferenceModal"
    :referenceOptions="referenceOptions"
    @update="setReferences"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import { IObservation } from "@/types/IObservation";
import { IPatient } from "@/types/IPatient";
import PractitionerSelect from "./components/practitioner-select.vue";
import ReferenceModal from "./components/reference-modal.vue";

import FhirInput from "@/components/fhir-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

// import AccordionComponent from "@/components/dialog-accordion.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import ValueForm from "./components/ValueForm.vue";
import BasicInfo from "./components/BasicInfo.vue";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const patients = namespace("patients");

@Options({
  name: "ObservationDialog",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DateTimePicker,
    CancelRedBg,
    AccordionComponent,
    PlusIcon,
    DatePicker,
    ValueForm,
    BasicInfo,
    FhirInput,
    PractitionerSelect,
    ReferenceModal,
  },
})
export default class ObservationDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: <any>{} })
  observation!: IObservation;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  required = string().required();

  customers = <any>[];

  loading = false;
  activeTab = "Full Payment";
  opened = true;
  effectiveType = "date-time";
  showReferenceModal = false;
  referenceOptions = <any>[];
  refSubject = '';

  statusHistory = [
    {
      value: "",
      start: "",
      end: "",
      practitionerId: "",
      practitionerName: "",
      current: true,
      priorPrescription: "",
      detectedIssue: "",
      eventHistory: "",
    },
  ];

  basicInfo = {
    basedOn: "",
    category: "",
    subject: "",
    encounter: "",
    partOf: "",
    code: "",
    focus: "",
  };
  effective = {
    dateTime: "",
    period: {
      start: "",
      end: "",
    },
    instant: {
      timeZone: "",
      dateTime: "",
    },
  };
  issueInfo = <any>{};
  value = <any>{};
  reasonInfo = <any>{};
  referenceRange = <any>{};
  member = {
    hasMemer: undefined,
    derivedFrom: undefined,
  };
  component = {
    code: "",
  };
  rangeMin = "";
  rangeMax = "";

  @Watch("id")
  idChanged() {
    this.setObservation();
  }

  @Watch("effectiveType")
  typeChanged() {
    this.validateEffective();
  }

  get organizationId() {
    return "";
  }

  get patientId() {
    return this.basicInfo.subject;
  }

  get practitionerId() {
    return "";
  }

  get encounterId() {
    return "";
  }

  get locationId() {
    return "";
  }

  get newaction() {
    return this.id ? "Update" : "Create New";
  }

  setCustomers(data: any) {
    this.customers = data;
  }

  setValue(data: any) {
    this.value = data;
  }

  openReferenceModal(subject: string, options: any) {
    this.showReferenceModal = true;
    this.referenceOptions = options;
    this.refSubject = subject;
  }

  setReferences(value: any) {
    if(this.refSubject === 'hasMember') {
      this.member.hasMemer = value
    }else if(this.refSubject === 'derivedFrom') {
      this.member.derivedFrom = value
    }
    // this.refSubject = ''
  }

  async setObservation() {
    const xObservation = this.observation;
    if (!xObservation) return;
    (this.basicInfo = xObservation?.basicInfo),
      (this.effective = xObservation?.effective),
      (this.issueInfo = xObservation?.issueInfo),
      (this.value = xObservation?.value),
      (this.reasonInfo = xObservation?.reasonInfo),
      (this.referenceRange = xObservation?.referenceRange),
      ((this.member as any) = xObservation?.member);
  }

  async save(s?: any) {
    this.loading = true;
    if (this.id) await this.updateObservation();
    else await this.createObservation(s);
    this.loading = false;
  }

  validateEffective() {
    if (this.effectiveType === "date-time") {
      (this.effective.period.start as any) = undefined;
      (this.effective.period.end as any) = undefined;
      (this.effective.instant.timeZone as any) = undefined;
      (this.effective.instant.dateTime as any) = undefined;
    } else if (this.effectiveType === "period") {
      (this.effective.instant.timeZone as any) = undefined;
      (this.effective.instant.dateTime as any) = undefined;
      (this.effective.dateTime as any) = undefined;
    } else if (this.effectiveType === "instant") {
      (this.effective.period.start as any) = undefined;
      (this.effective.period.end as any) = undefined;
      (this.effective.dateTime as any) = undefined;
    }
  }

  get payload() {
    return {
      patientId: this.patientId,
      basicInfo: {
        ...this.basicInfo,
        subject: this.getPatientName(this.basicInfo.subject),
      },
      effective: this.effective,
      issueInfo: this.issueInfo,
      value: this.value,
      reasonInfo: this.reasonInfo,
      referenceRange: this.referenceRange,
      member: (this.member as any),
      status: undefined,
    };
  }

  async getObservationById() {
    const url = `/api/v1/observations/${this.id}`;
    const payload = {};
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }

  async createObservation(s?: any) {
    try {
      if (s === "draft") {
        (this.payload.status as any) = "draft";
      }
      const { data } = await cornieClient().post(`/api/v1/observations`, {
        ...this.payload,
      });
      if (data.success) {
        window.notify({
          msg: "Observations created",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }

  done() {
    this.$emit("observation-added");
    this.show = false;
  }

  getPatientName(id: string) {
    const pt = this.customers.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }

  async updateObservation() {
    const url = `/api/v1/observations/${this.id}`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "Observations updated",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Observations not updated",
        status: "error",
      });
    }
  }

  async created() {
    if (this.id) {
      await this.setObservation();
    }
    await this.fetchPatients();
    this.payload;
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>

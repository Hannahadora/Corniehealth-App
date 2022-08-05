<template>
  <cornie-dialog v-model="show" right class="w-6/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ newaction }} Care Plan
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component :title="'Basic Info'" :opened="true">
              <template v-slot:default>
                <div class="grid grid-cols-2 gap-4 w-full mt-5">
                  <cornie-select
                    class="required"
                    :items="allCarePlans"
                    label="Based on"
                    v-model="basedOn"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                  v-if="id"
                    class="required"
                    :items="[
                      'Draft',
                      'Active',
                      'On Hold',
                      'Revoked',
                      'Completed',
                      'Entered in error',
                    ]"
                    label="status"
                    v-model="status"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <div class="w-full mt-2">
                    <span class="text-sm font-semibold mb-4">Intent</span>
                    <div class="flex space-x-4 w-full mt-5">
                      <cornie-radio
                        :label="'Proposal'"
                        :value="'proposal'"
                        v-model="intent"
                        name="intent"
                      />
                      <cornie-radio
                        :label="'Plan'"
                        :value="'plan'"
                        v-model="intent"
                        name="intent"
                      />
                      <cornie-radio
                        :label="'Order'"
                        :value="'order'"
                        v-model="intent"
                        name="intent"
                      />
                      <cornie-radio
                        :label="'Option'"
                        :value="'Option'"
                        v-model="intent"
                        name="intent"
                      />
                    </div>
                  </div>

                   <!-- <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/allergy-intolerance-type"
                    class="required w-full"
                    v-model="category"
                    label="Category"
                    placeholder="--Select--"
                    required
                  /> -->


                  <cornie-select
                    class="required"
                    :items="[
                      'Category',
                    ]"
                    label="Category"
                    v-model="category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input
                    v-model="title"
                    :label="'Title'"
                    placeholder="Enter"
                  />
                  <cornie-select
                    class="required"
                    :items="allPractitioner"
                    label="Author"
                    v-model="author"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-time-picker
                    v-model:date="startDate"
                    v-model:time="startTime"
                    label="Start Date/Time"
                    width="w-full"
                  />
                  <date-time-picker
                    v-model:date="endDate"
                    v-model:time="endTime"
                    label="End Date/Time"
                    width="w-full"
                  />
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component :title="'Activity'" :opened="false">
              <template v-slot:default>
                <div class="grid grid-cols-2 gap-4 w-full mt-5">
                    <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/care-plan-activity-outcome"
                    class="w-full"
                    v-model="outcome"
                    label="Outcome"
                    placeholder="Select"
                  />
               
                  <cornie-select
                    class="required"
                    :items="[
                      'Appoiontment',
                      'Encounter',
                      'Procedure',
                    ]"
                    label="Outcome Reference"
                    v-model="outcomeReference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input
                    v-model="progress"
                    :label="'Progress'"
                    placeholder="Enter"
                  />
                  <cornie-select
                    class="required"
                    :items="[
                      'Reference',
                    ]"
                    label="Reference"
                    v-model="reference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component :title="'Detail'" :opened="false">
              <template v-slot:default>
                <div class="grid grid-cols-2 gap-4 w-full mt-5">
                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/clinical-findings"
                    class="w-full"
                     label="Reason Code"
                    v-model="detail.reasonCode"
                    placeholder="Select"
                  />
                  <cornie-select
                    class="required"
                    :items="[
                      'Condition',
                      'Observation',
                    ]"
                    label="Reason Reference"
                    v-model="detail.reasonReference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :items="[
                      'goal',
                    ]"
                    label="Goal"
                    v-model="detail.goal"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :items="[
                      'Draft',
                      'Active',
                      'On Hold',
                      'Revoked',
                      'Completed',
                      'Entered in error',
                    ]"
                    label="status"
                    v-model="detail.status"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input
                    v-model="detail.statusReason"
                    :label="'Status Reason'"
                    placeholder="Enter"
                  />
                  <div class="w-full mt-2">
                    <span class="text-sm font-semibold mb-4"
                      >Do not perform</span
                    >
                    <div class="flex space-x-4 w-full mt-5">
                      <cornie-radio
                        :label="'True'"
                        :value="true"
                        v-model="detail.doNotPerform"
                        name="doNotPerform"
                      />
                      <cornie-radio
                        :label="'False'"
                        :value="false"
                        v-model="detail.doNotPerform"
                        name="doNotPerform"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component :title="'Schedule'" :opened="false">
              <template v-slot:default>
                <div class="grid grid-cols-2 gap-4 w-full mt-5">
                  <div class="w-full mt-2">
                    <span class="text-sm font-semibold mb-4"
                      >Schedule TIming</span
                    >
                    <div class="flex space-x-4 w-full mt-5">
                      <cornie-radio
                        :label="'Day'"
                        :value="'day'"
                        v-model="scheduleTimingType"
                        name="scheduleTiming"
                      />
                      <cornie-radio
                        :label="'Period'"
                        :value="'period'"
                        v-model="scheduleTimingType"
                        name="scheduleTiming"
                      />
                    </div>
                  </div>
                  <div></div>
                  <date-picker
                    v-if="scheduleTimingType === 'day'"
                    v-model="scheduleTiming.date"
                    label="Day"
                    width="w-full"
                  />
                  <d-range-picker
                    v-if="scheduleTimingType === 'period'"
                    v-model="scheduleTiming.period"
                    label="Period"
                    width="w-full"
                  />
                  <cornie-select
                    class="required"
                    :items="allLocations"
                    label="Location"
                    v-model="scheduleTiming.location"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :items="allPractitioner"
                    label="Performer"
                    v-model="scheduleTiming.performer"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component :title="'Product'" :opened="false">
              <template v-slot:default>
                <div class="grid grid-cols-2 gap-4 w-full mt-5">
                   <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/medication-codes"
                    class="w-full"
                    label="Product Code"
                    v-model="product.productCode"
                    placeholder="Select"
                  />
                  <cornie-select
                    class="required"
                    :items="[
                      'Medication',
                      'Substance',
                    ]"
                    label="Product Reference"
                    v-model="product.productReference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input
                    v-model="product.dailyAmount"
                    :label="'Daily Amount'"
                    placeholder="Enter"
                  />
                  <cornie-input
                    v-model="product.quantity"
                    :label="'Quantity'"
                    placeholder="Enter"
                  />
                  <cornie-input
                    v-model="product.description"
                    :label="'Description'"
                    placeholder="Enter"
                  />
                </div>
                <div>
                  <text-area
                    :label="'Note'"
                    v-model="product.note"
                    placeholder="'Start typing'"
                    class="w-full"
                  />
                </div>
              </template>
            </accordion-component>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";
import { string as yupString } from "yup";

import ICarePlan from "@/types/ICarePlan";
import IPractitioner from "@/types/IPractitioner";
import ILocation from "@/types/ILocation";
import { IPatient } from "@/types/IPatient";

import AccordionComponent from "@/components/form-accordion.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import TextArea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";
import DRangePicker from "@/components/daterangecalendar.vue";
import DatePicker from "@/components/datepicker.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import Multiselect from "@vueform/multiselect";
import FhirInput from "@/components/fhir-input.vue";
import AutoComplete from "@/components/autocomplete.vue";
import InfoBlueBg from "@/components/icons/info-blue-bg.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import SearchInput from "@/components/search-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";

const careplan = namespace("careplan");
const dropdown = namespace("dropdown");
const practitioner = namespace("practitioner");
const patients = namespace("patients");
const location = namespace("location");

@Options({
  name: "carePlanModal",
  components: {
    ...CornieCard,
    AccordionComponent,
    CornieIconBtn,
    ArrowLeftIcon,
    InfoBlueBg,
    DRangePicker,
    PhoneInput,
    SearchInput,
    FhirInput,
    CancelIcon,
    AutoComplete,
    CornieDialog,
    DateTimePicker,
    CornieRadio,
    Avatar,
    CornieMenu,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    DatePicker,
    Multiselect,
    IconInput,
    CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    DeleteorangeIcon,
  },
})
export default class carePlanModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @careplan.Action
  getCareplanById!: (id: string) => ICarePlan;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @careplan.Action
  getPatientCarePlans!: (patientId: string) => Promise<void>;

  @careplan.State
  patientCarePlans!: ICarePlan[];

  loading = false;

  patientId = "";
  practitionerId = "";
  instantiatesUri = "";
  basedOn = "";
  replaces = "";
  partOf = "";
  intent = "";
  status = "active";
  author = "";
  scheduleTimingType = "day";
  contributor = "";
  careTeam = "";
  category = "";
  addresses = "";
  referenceEncounter = "";
  title = "";
  startDate = "";
  startTime = "";
  endDate = "";
  endTime = "";
  reference = "";
  outcomeReference = "";
  progress = "";
  outcome = "";
  detail = {
    reasonCode: "",
    goal: "",
    status: "",
    statusReason: "",
    doNotPerform: true,
    reasonReference: "",
  };
  scheduleTiming = {
    period: !Object.values({
      start: "",
      end: "",
    }).every((o) => o === null)
      ? null
      :  {
          start: "",
          end: "",
        },
    date: null,
    location: "",
    performer: "",
  };
  product = {
    productCode: "",
    productReference: "",
    dailyAmount: "",
    quantity: "",
    description: "",
    note: "",
  };

  dropdowns = {} as IIndexableObject;

  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  get newaction() {
    return this.id ? "Update" : "New";
  }

  get allPractitioner() {
    if (!this.practitioners || this.practitioners.length === 0) return [];
    return this.practitioners.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName + " " + i.lastName,
      };
    });
  }
  get allLocations() {
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }

  get allCarePlans() {
    return this.patientCarePlans.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }

  @Watch("id")
  idChanged() {
    this.setCareteam();
  }

  async setCareteam() {
    const careplan = await this.getCareplanById(this.id);
    if (!careplan) return;
    this.patientId = careplan.patientId;
    this.practitionerId = careplan.practitionerId;
    this.intent = careplan.intent;
    this.status = careplan.status;
    this.author = careplan.author;
    this.category = careplan.category;
    this.title = careplan.title;
    this.startDate = careplan.startDate;
    // this.startTime = careplan.startTime;
    this.endDate = careplan.endDate;
    // this.endTime = careplan.endTime;
    this.reference = careplan.reference;
    this.outcomeReference = careplan.outcomeReference;
    this.outcome = careplan.outcome;
    this.detail = careplan.detail as any;
    this.scheduleTiming = careplan.scheduleTiming as any;
    this.product = careplan.product;
    this.progress = careplan.progress;
    this.basedOn  = careplan.basedOn;

  }

  get payload() {
    return {
      patientId: this.activePatientId,
      basedOn: this.basedOn,
      intent: this.intent,
      status: this.status,
      author: this.author,

      category: this.category,
      title: this.title,

      startDate: this.startDate,

      endDate: this.endDate,

      reference: this.reference,
      outcomeReference: this.outcomeReference,

      outcome: this.outcome,
      detail: this.detail,
      scheduleTiming: this.scheduleTiming,
      product: this.product,

      progress: this.progress,
    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateCareplan();
    else await this.createCareplan();
    this.loading = false;
  }

  async createCareplan() {
    try {
      const response = await cornieClient().post(
        "/api/v1/care-plan",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Care plan added", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({
        msg: error.response.data.message,
        status: "error",
      });
    }
  }

  async updateCareplan() {
    const url = `/api/v1/care-plan/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Care plan updated", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({
        msg: error.response.data.message,
        status: "error",
      });
    }
  }

  done() {
    this.$emit("careplan-added");
    this.show = false;
  }

  async created() {
    await this.getPatientCarePlans(this.activePatientId);
    await this.fetchPractitioners();
    await this.fetchLocations();
    await this.fetchPatients();
    const data = await this.getDropdowns("carePlan");
    this.dropdowns = data;
  }
}
</script>

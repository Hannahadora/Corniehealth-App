<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn class="cursor-pointer" @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3">Create New</h2>
          <cancel-icon class="float-right cursor-pointer mt-1" @click="show = false" />
        </div>
      </cornie-card-title>
      <cornie-card-text>
        <v-form class="flex-grow flex flex-col">
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Basic Info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                :label="'Class'"
                v-model="encounterClass"
                :items="['inpatient', 'outpatient', 'ambulatory', 'emmergency']"
              />
              <cornie-select
                :label="'Service Type'"
                v-model="encounter.serviceType"
                :items="[
                  'Cardiology',
                  'Aged Care Assessment',
                  'Friendly Visiting',
                  'Personal Alarms/Alerts',
                  'Acupuncture',
                  'Aromatherapy',
                  'Bowen Therapy',
                ]"
              />
              <cornie-select
                :label="'Priority'"
                v-model="encounter.priority"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select :label="'Based on'" :items="['Service 1', 'Service 2']" />
              <auto-complete
                :label="'Appointment'"
                v-model="encounter.appointmentId"
                :items="appointmentList"
              />
              <cornie-select
                :label="'Reason code'"
                v-model="encounter.priority"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Reason reference
                </div>
                <div
                  @click="() => (showReference = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon />
                  </div>
                </div>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Diagnosis"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">Condition</div>
                <div
                  @click="() => (showCondition = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Use'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-input
                class="w-full"
                label="Rank"
                placeholder="Enter"
                v-model="encounter.priority"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Participant"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Participant type
                </div>
                <div
                  @click="() => (showPersonReference = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-input
                class="w-full"
                label="Person"
                placeholder="Autoloaded/Manual input"
                v-model="encounter.priority"
              />
              <date-time-picker
                class="w-full"
                label="Start date/time"
                v-model:date="participant.date"
                v-model:time="participant.time"
              />
            </div>
            <div class="flex w-full items-center justify-end">
              <div
                class="px-5 py-2 capitalize text-primary border-primary rounded-full border-2"
              >
                Add new
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Hospitalisation"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Pre-admission identifier
                </div>
                <div
                  @click="() => (showPreAdmission = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon />
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">origin</div>
                <div
                  @click="() => (showPreAdmission = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Ward'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Room'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Bed'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-input
                class="w-full"
                label="Admit source"
                placeholder="Enter"
                v-model="encounter.priority"
              />
              <div class="flex flex-col space-y-4">
                <div class="capitalize text-black text-sm font-semibold">
                  Re-admission
                </div>
                <div class="flex space-x-10">
                  <cornie-radio v-model="type" label="Yes" value="yes" />
                  <cornie-radio v-model="type" value="No" label="no" />
                </div>
              </div>
              <cornie-select
                :label="'Diet Preference'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Special courtesy'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Special Arrangement'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">Destination</div>
                <div
                  @click="() => (showPreAdmission = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Discharge Disposition'"
                v-model="encounter.priority"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Location"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-input
                class="w-full"
                label="Service Provider"
                placeholder="Autoloaded"
              />
              <cornie-input class="w-full" label="Location" placeholder="Autoloaded" />
              <cornie-input
                class="w-full"
                label="Physical Type"
                placeholder="Autoloaded"
              />
              <cornie-input class="w-full" label="Status" placeholder="Autoloaded" />
              <date-time-picker
                class="w-full"
                label="Start Date/Time"
                v-model:date="issues.issued.date"
                v-model:time="issues.issued.time"
              />
              <date-time-picker
                class="w-full"
                label="End Date/Time"
                v-model:date="issues.issued.date"
                v-model:time="issues.issued.time"
              />
              <cornie-input class="w-full" label="Part of" placeholder="Autoloaded" />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>
      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
    <div>
      <reason-reference v-model="showReference" />
      <condition v-model="showCondition" />
      <person-reference v-model="showPersonReference" />
      <pre-admission-identifier v-model="showPreAdmission" />
    </div>
  </cornie-dialog>
</template>

<script lang="ts">
import AutoComplete from "@/components/autocomplete.vue";
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSelect from "@/components/cornieselect.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import AddIcon from "@/components/icons/plus.vue";
import Modal from "@/components/modal.vue";
import IAppointment from "@/types/IAppointment";
import IEncounter from "@/types/IEncounter";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";
import { Item } from "@/types/IUpdateModel";
import SelectBoxes from "@/views/dashboard/schedules/components/apply-to.vue";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import { Options, Vue } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import { namespace } from "vuex-class";
import BasicInfo from "./basic-info.vue";
import condition from "./condition.vue";
import HospitalInfo from "./hospital-info.vue";
import OriginSelect from "./origin-select.vue";
import PersonReference from "./person-reference.vue";
import PreAdmissionIdentifier from "./pre-admission.vue";
import ReasonReference from "./reason-reference.vue";
import ServiceProvider from "./service-provider.vue";

const vital = namespace("vitals");
const appointment = namespace("appointment");
const location = namespace("location");
const userStore = namespace("user");

@Options({
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    CancelIcon,
    AddIcon,
    AccordionComponent,
    CornieSelect,
    CornieInput,
    DateTimePicker,
    BasicInfo,
    ServiceProvider,
    HospitalInfo,
    AutoComplete,
    SelectBoxes,
    Modal,
    OriginSelect,
    ReasonReference,
    condition,
    PersonReference,
    PreAdmissionIdentifier,
    CornieRadio,
  },
})
export default class NewEncounter extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;
  showReference = false;
  showCondition = false;
  showPersonReference = false;
  showPreAdmission = false;
  participant = {
    date: "",
    time: "",
  };
  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  @appointment.State
  appointments!: IAppointment[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @location.State
  locations!: ILocation[];

  @vital.Action
  createEncounter!: (encounter: IEncounter) => Promise<boolean>;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  loading = false;
  encounterClass = "";

  diets = [
    { code: "vegetarian", display: "Vegetarian" },
    { code: "dairy-free", display: "Dairy Free" },
    { code: "nut-free", display: "Nut Free" },
    { code: "gluten-free", display: "Gluten Free" },
  ] as Item[];

  courtseys = [
    { code: "EXT", display: "extended courtesy" },
    { code: "NRM", display: "Normal Courtsey" },
    { code: "PRF", display: "professional courtesy" },
    { code: "STF", display: "staff" },
  ] as Item[];

  arrangements = [
    { code: "add-bed", display: "Additional bedding" },
    { code: "wheel", display: "Wheelchair" },
    { code: "int", display: "Interpreter" },
    { code: "att", display: "Attendant" },
    { code: "dog", display: "Guide dog" },
  ] as Item[];

  dispositions = [
    { code: "home", display: "Home" },
    { code: "alt-home", display: "Alternative Home" },
    { code: "other-hcf", display: "Other healthcare facility" },
    { code: "exp", display: "Expired" },
  ] as Item[];

  physicalTypes = [
    { code: "si", display: "Site" },
    { code: "bu", display: "Building" },
    { code: "wi", display: "Wing" },
    { code: "wa", display: "Ward" },
  ] as Item[];

  encounter = {
    destination: {
      id: "d25cc910-0830-40cf-a0c8-7c303f381b29",
      type: "location",
    },
    origin: { id: "d25cc910-0830-40cf-a0c8-7c303f381b29", type: "location" },
    admitSource: {
      id: "d25cc910-0830-40cf-a0c8-7c303f381b29",
      type: "location",
    },
  } as IEncounter;
  patientId = "";

  get appointmentList() {
    if (this.appointments?.length === 0) return [];
    return this.appointments.map((appointment) => {
      return {
        code: appointment.id,
        display: appointment.description,
      };
    });
  }

  get locationList() {
    if (this.locations?.length === 0) return [];
    return this.locations.map((location) => {
      return {
        code: location.id,
        display: location.description,
      };
    });
  }

  async onSave() {
    try {
      this.loading = true;
      this.encounter.patientId = this.patientId;
      this.encounter.practitionerId = this.authPractitioner?.id;
      this.encounter.class = this.encounterClass;
      this.encounter.locationId = "d25cc910-0830-40cf-a0c8-7c303f381b29";

      const created = await this.createEncounter(this.encounter);
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  async created() {
    this.patientId = this.$route.params.id as string;
    if (this.locations?.length <= 0) await this.fetchLocations();
  }
}
</script>

<style scoped>
/* .main-box {
    min-height: 400px;
    height: 100vh;
    overflow-y: scroll;
    overflow: hidden;
} */
</style>

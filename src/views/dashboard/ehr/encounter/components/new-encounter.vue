<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card height="100%" class="flex flex-col h-full bg-white px-6 overflow-y-scroll">
      <cornie-card-title class="">
        <icon-btn class="cursor-pointer" @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3">
            Create New </h2>
          <cancel-icon class="float-right cursor-pointer mt-1 text-danger fill-current" @click="show = false" />
        </div>
      </cornie-card-title>
      <cornie-card-text>
        <v-form class="flex-grow flex flex-col">
          <accordion-component class="rounded-none border-none text-primary" title="Basic Info" :opened="false">
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select :label="'Class'" v-model="encounterClass"
                :items="['inpatient', 'outpatient', 'ambulatory', 'emmergency']" />
              <cornie-select :label="'Service Type'" v-model="encounter.serviceType" :items="[
                'Cardiology',
                'Aged Care Assessment',
                'Friendly Visiting',
                'Personal Alarms/Alerts',
                'Acupuncture',
                'Aromatherapy',
                'Bowen Therapy',
              ]" />
              <cornie-select :label="'Priority'" v-model="encounter.priority"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <cornie-select :label="'Based on'" :items="['Service 1', 'Service 2']" />
              <auto-complete :label="'Appointment'" v-model="encounter.appointmentId" :items="appointmentList" />
              <cornie-select :label="'Reason code'" v-model="encounter.priority"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Reason reference
                </div>
                <div @click="() => (showReference = true)" class="flex items-center border rounded-md p-3 mt-0.5">
                  <div class="flex-1">{{ selectedReasonReference.summary ? selectedReasonReference.summary : 'Select' }}
                  </div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component class="rounded-none border-none text-primary" title="Diagnosis" :opened="false">
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Condition
                </div>
                <div @click="() => (showCondition = true)" class="flex items-center border rounded-md p-3 mt-0.5">
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
              <cornie-select :label="'Use'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <cornie-input class="w-full" label="Rank" placeholder="Enter" v-model="encounter.priority" />
            </div>
            <div class="flex w-full items-center justify-end">
              <div
                class="px-5 py-2 space-x-2 capitalize items-center font-bold text-primary border-primary rounded-full border-2 flex">
                <add-icon />
                <div>Add new</div>
              </div>
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component class="rounded-none border-none text-primary" title="Participant" :opened="false">
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Participant type
                </div>
                <div @click="() => (showPersonReference = true)" class="flex items-center border rounded-md p-3 mt-0.5">
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
              <cornie-input class="w-full" label="Person" placeholder="Autoloaded/Manual input"
                v-model="encounter.priority" />
              <date-time-picker class="w-full" label="Start date/time" v-model:date="participant.date"
                v-model:time="participant.time" />
            </div>
            <div class="flex w-full items-center justify-end">
              <div
                class="px-5 py-2 space-x-2 capitalize items-center font-bold text-primary border-primary rounded-full border-2 flex">
                <add-icon />
                <div>Add new</div>
              </div>
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component class="rounded-none border-none text-primary" title="Hospitalisation" :opened="false">
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Pre-admission identifier
                </div>
                <div @click="() => (showPreAdmission = true)" class="flex items-center border rounded-md p-3 mt-0.5">
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  origin
                </div>
                <div @click="() => (showOrigin = true)" class="flex items-center border rounded-md p-3 mt-0.5">
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
              <cornie-select :label="'Ward'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <cornie-select :label="'Room'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <cornie-select :label="'Bed'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <cornie-input class="w-full" label="Admit source" placeholder="Enter" v-model="encounter.priority" />
              <div class="flex flex-col space-y-4">
                <div class="capitalize text-black text-sm font-semibold">
                  Re-admission
                </div>
                <div class="flex space-x-10">
                  <cornie-radio v-model="type" label="Yes" value="yes" />
                  <cornie-radio v-model="type" value="No" label="no" />
                </div>
              </div>
              <cornie-select :label="'Diet Preference'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <cornie-select :label="'Special courtesy'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <cornie-select :label="'Special Arrangement'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
              <div class="flex flex-col">
                <div class="capitalize text-black text-sm font-semibold">
                  Destination
                </div>
                <div @click="() => (showPreAdmission = true)" class="flex items-center border rounded-md p-3 mt-0.5">
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
              <cornie-select :label="'Discharge Disposition'" v-model="encounter.priority" placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']" />
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component class="rounded-none border-none text-primary" title="Location" :opened="false">
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-input class="w-full" label="Service Provider" :disabled="true" placeholder="Autoloaded" />
              <cornie-input class="w-full" label="Location" :disabled="true" placeholder="Autoloaded" />
              <cornie-input class="w-full" label="Physical Type" :disabled="true" placeholder="Autoloaded" />
              <cornie-input class="w-full" label="Status" :disabled="true" placeholder="Autoloaded" />
              <date-time-picker class="w-full" label="Start Date/Time" />
              <date-time-picker class="w-full" label="End Date/Time" />
              <cornie-input class="w-full" label="Part of" :disabled="true" placeholder="Autoloaded" />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>
      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn @click="show = false" class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary">
            Cancel
          </cornie-btn>
          <cornie-btn :loading="loading" @click="submit" type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg">
            Save
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
    <div>
      <reason-reference @selectedId="setSelected" :conditions="conditions" v-model="showReference" />
      <conditionM v-model="showCondition" />
      <person-reference v-model="showPersonReference" />
      <pre-admission-identifier v-model="showPreAdmission" />
      <origin v-model="showOrigin" />
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
import DateTimePicker from "@/components/date-time-picker.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import AddIcon from "@/components/icons/plus.vue";
import Modal from "@/components/modal.vue";
import IAppointment from "@/types/IAppointment";
import IEncounter from "@/types/IEncounter";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";
import IProcedure from "@/types/IProcedure";
import SelectBoxes from "@/views/dashboard/schedules/components/apply-to.vue";
import { Options, Vue } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import { namespace } from "vuex-class";
import BasicInfo from "./basic-info.vue";
import conditionM from "./condition.vue";
import HospitalInfo from "./hospital-info.vue";
import OriginSelect from "./origin-select.vue";
import origin from "./origin.vue";
import PersonReference from "./person-reference.vue";
import PreAdmissionIdentifier from "./pre-admission.vue";
import ReasonReference from "./reason-reference.vue";
import ServiceProvider from "./service-provider.vue";

const vital = namespace("vitals");
const appointment = namespace("appointment");
const location = namespace("location");
const userStore = namespace("user");
const encounterM = namespace("encounter");
const condition = namespace("condition");
const procedure = namespace("procedure");
// const location = namespace("location");

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
    conditionM,
    PersonReference,
    PreAdmissionIdentifier,
    CornieRadio,
    origin,
  },
})
export default class NewEncounter extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;
  showReference = false;
  showCondition = false;
  showPersonReference = false;
  showPreAdmission = false;
  showOrigin = false;
  participant = {
    date: "",
    time: "",
  };
  // conditions = [];
  @encounterM.Action
  postEncounter!: (data: any) => Promise<void>;

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

  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  @condition.State
  conditions!: any;

  @procedure.State
  procedures!: IProcedure[];

  @procedure.Action
  getProcedures!: (patientId: string) => Promise<void>;

  loading = false;
  encounterClass = "";
  encounter = {
    serviceType: '',
    priority: '',
    appointmentId: '',
  }
  type = ""
  patientId = ''
  selectedReasonReference: any = {}
  setSelected(e: any) {
    console.log('selectedOptionEE', e)
    this.selectedReasonReference = e
    this.postData.hospitalization.preAdmissionIdentifier.identifier = this.selectedReasonReference.id
    this.postData.reasonReferences[0].identifier = this.selectedReasonReference.id
  }


  postData = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    identifier: "string",
    status: "active",
    class: "string",
    serviceType: "string",
    // appointmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    hospitalization: {
      preAdmissionIdentifier: {
        type: "condition",
        description: "string",
        identifier: "f7a697b0-eb24-4f64-844d-6cf5d0d82aca",
        practitioner: "string",
      },
      origin: {
        type: "location",
        name: "string",
        address: "string",
      },
      ward: "string",
      room: "string",
      bed: "string",
      admitSource: "string",
      readmission: true,
      dietPreferences: ["string"],
      specialCourtesy: "string",
      specialAgreement: "string",
      destination: {},
      dischargeDisposition: "string",
    },
    // organizationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    patientId: this.patientId,
    startDate: "2022-05-25",
    endDate: "2022-05-25",
    startTime: "string",
    endTime: "string",
    statusHistory: {
      value: "string",
      start: "2022-05-25",
      end: "2022-05-25",
      practitionerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      practitionerName: "string",
      current: true,
      priorPrescription: "string",
      detectedIssue: "string",
      eventHistory: "string",
    },
    locationId: "9b45779c-91f3-4f73-8de8-83265412789d",
    "practitionerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    location: {
      name: "string",
      locationStatus: "string",
      operationalStatus: "string",
      description: "string",
      alias: "string",
      mode: "string",
      type: "string",
      phone: "string",
      email: "string",
      address: "string",
      country: "string",
      state: "string",
      physicalType: "string",
      latitude: "string",
      longitude: "string",
      altitude: "string",
      managingOrg: "string",
      partOf: "string",
      availabilityExceptions: "string",
      careOptions: "string",
      openTo: "string",
      hoursOfOperation: {
        day: "string",
        openTime: "string",
        closeTime: "string",
      },
    },
    basedOn: "string",
    diagnoses: [
      {
        type: "condition",
        reference: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        conditionDescription: "string",
        use: "string",
        rank: "string",
        practitioner: "string",
      },
    ],
    participants: [
      {
        type: "practitioner",
        referenceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        startDate: "2022-05-25",
        endDate: "2022-05-25",
        startTime: "20:00",
        endTime: "22:00",
      },
    ],
    providerName: "string",
    reasonReferences: [
      {
        type: "condition",
        description: "string",
        identifier: "f7a697b0-eb24-4f64-844d-6cf5d0d82aca",
        practitioner: "string",
      },
    ],
    billingStatus: "billed",
  }


  async submit() {
    await this.postEncounter({ ...this.postData, patientId: this.patientId }).then(() => {
      window.location.reload()
    })

  }


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


  async created() {
    this.patientId = this.$route.params.id as string;
    if (this.locations?.length <= 0) await this.fetchLocations();
    console.log("location", this.locations);
    await this.fetchPatientConditions(this.$route.params.id.toString());
    await this.getProcedures(this.$route.params.id.toString());
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

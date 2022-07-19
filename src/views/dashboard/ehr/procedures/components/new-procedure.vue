<template>
  <clinical-dialog v-model="show" :title="'Create New'" class="">
    <v-form class="flex-grow flex flex-col">
      <accordion-component
        class="rounded-none border-none text-primary"
        title="Basic info"
        :opened="false"
      >
        <div class="grid grid-cols-2 gap-6 py-6">
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">
              Based on
            </div>
            <div
              @click="() => (showBasedOn = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">
              Part of
            </div>
            <div
              @click="() => (showPartOf = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <fhir-input
            reference="http://hl7.org/fhir/ValueSet/allergy-intolerance-category"
            class="required w-full"
            v-model="basic.category"
            label="category"
            placeholder="Select"
            required
          />
          <fhir-input
            reference="http://hl7.org/fhir/ValueSet/allergyintolerance-code"
            class="required w-full"
            label="code"
            v-model="basic.code"
            placeholder="Select"
            required
          />
        </div>
      </accordion-component>

      <accordion-component
        class="rounded-none border-none text-primary"
        title="Performed"
        :opened="false"
      >
        <div class="flex flex-col">
          <div>Performed</div>
          <div class="flex space-x-3 w-full mt-3">
            <div v-for="r in performedOptions" :key="r">
              <cornie-radio
                v-model="performed"
                :value="r.toLocaleLowerCase()"
                :label="r"
              />
            </div>
          </div>
          <div class="mt-2">
            <date-time-picker
              v-if="performed == 'date/time'"
              class="w-full"
              label="Date reported"
              v-model:date="date"
              v-model:time="time"
            />
            <div class="w-full mt-1" v-if="performed == 'age'">
              <span class="text-sm font-semibold mb-3">Age</span>
              <div class="flex space-x-2 w-full">
                <cornie-input
                  placeholder="0"
                  class="grow w-full"
                  :setfull="true"
                  v-model="age.value"
                />
                <cornie-select
                  :items="['Day']"
                  placeholder="/ Day"
                  class="w-32 mt-0.5 flex-none"
                  :setPrimary="true"
                  v-model="age.day"
                />
              </div>
            </div>
            <div v-if="performed == 'period'" class="grid grid-cols-2 gap-6">
              <date-time-picker
                class="w-full"
                label="Start Date/time"
                v-model:date="period.start"
                v-model:time="period.startTime"
              />
              <date-time-picker
                class="w-full"
                label="End Date/time"
                v-model:date="period.end"
                v-model:time="period.endTime"
              />
            </div>
            <div class="w-full mt-1" v-if="performed == 'range'">
              <!-- <span class="text-sm font-semibold mb-3">Range</span> -->
              <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <div>Range (min)</div>
                  <div class="flex space-x-2 w-full">
                    <cornie-input
                      placeholder=""
                      class="grow w-full"
                      :setfull="true"
                      v-model="range.min"
                    />
                    <cornie-select
                      :items="['Day']"
                      placeholder="/ Day"
                      class="w-32 mt-0.5 flex-none"
                      :setPrimary="true"
                      v-model="range.unit"
                    />
                  </div>
                </div>
                <div class="flex flex-col">
                  <div>Range (max)</div>
                  <div class="flex space-x-2 w-full">
                    <cornie-input
                      placeholder=""
                      class="grow w-full"
                      :setfull="true"
                      v-model="range.max"
                    />
                    <cornie-select
                      :items="['Day']"
                      placeholder="/ Day"
                      class="w-32 mt-0.5 flex-none"
                      :setPrimary="true"
                      v-model="range.unit"
                    />
                  </div>
                </div>
              </div>
            </div>
            <cornie-input
              v-if="performed == 'string'"
              class="w-full"
              label="String"
              placeholder="Enter"
              v-model="performerString"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="rounded-none text-primary"
        title="Recorder"
        :opened="false"
      >
        <div class="flex py-5 w-1/2">
          <div class="flex-1 w-full">
            <!-- <cornie-input
                    :disabled="true"
                    class="w-full"
                    placeholder="Autoloaded"
                  /> -->
            <cornie-input
              label="Recorder"
              class="-mt-5 w-full"
              placeholder="Autoloaded"
              :disabled="true"
              v-model="recorderP"
            >
              <template #labelicon>
                <check-box
                  :label="'Assert this record'"
                  class="w-full"
                  v-model="asserterId"
                  :value="authPractitioner.id"
                />
              </template>
              <!-- <template #append-inner>
                      <span class="bg-primary py-2.5 px-3 -mr-2 rounded cursor-pointer" @click="showRecorder = true">
                        <d-edit class="fill-current text-white" />
                      </span>
                    </template> -->
            </cornie-input>
          </div>
          <div class="flex-none">
            <img
              @click="() => (showAssessorModal = true)"
              src="@/assets/img/asseor-update.svg"
              class="ml-2 mt-5"
              alt=""
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="rounded-none text-primary"
        title="Performer"
        :opened="false"
      >
        <div class="grid grid-cols-2 gap-6 py-6">
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">Actor</div>
            <div
              @click="() => (showActor = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">
              Function
            </div>
            <div
              @click="() => (showFunction = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <cornie-select
            :label="'On Behalf'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
        </div>
      </accordion-component>

      <accordion-component
        class="rounded-none text-primary"
        title="Location"
        :opened="false"
      >
        <div class="grid grid-cols-2 gap-6 py-6">
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">
              Location
            </div>
            <div
              @click="() => (showLocation = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <cornie-select
            :label="'Reason Code'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">
              Reason Reference
            </div>
            <div
              @click="() => (showReasonReference = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <fhir-input
            v-model="location.body"
            reference="http://hl7.org/fhir/ValueSet/body-site"
            :rules="required"
            label="Body Site"
            placeholder="Select"
          />
          <cornie-select
            :label="'Outcome'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">
              Report
            </div>
            <div
              @click="() => (showReport = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <cornie-select
            :label="'Complication'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
          <cornie-select
            :label="'Complication Detail'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
          <cornie-select
            :label="'Follow Up'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
          <cornie-input
            class="w-full"
            :label="'Note'"
            placeholder="Autoloaded"
          />
        </div>
      </accordion-component>

      <accordion-component
        class="rounded-none text-primary"
        title="Focal Device"
        :opened="false"
      >
        <div class="grid grid-cols-2 gap-6 py-6">
          <cornie-select
            :label="'Action'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
          <cornie-select
            :label="'Manipulated'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
        </div>
      </accordion-component>

      <accordion-component
        class="rounded-none text-primary"
        title="Used items"
        :opened="false"
      >
        <div class="grid grid-cols-2 gap-6 py-6">
          <div class="flex flex-col w-full">
            <div class="capitalize text-black text-sm font-semibold">
              Used reference
            </div>
            <div
              @click="() => (showUsedReference = true)"
              class="flex items-center border rounded-md p-3 mt-0.5"
            >
              <div class="flex-1">Select</div>
              <div class="flex-none self-center">
                <add-icon class="fill-current text-danger" />
              </div>
            </div>
          </div>
          <cornie-select
            :label="'Used Code'"
            v-model="code"
            placeholder="Select"
            :items="['ASAP', 'Callback results', 'callback for scheduling']"
          />
        </div>
        <div class="flex w-full justify-end">
          <div
            class="rounded-full space-x-3 font-bold px-6 py-3 flex text-primary items-center justify-center border border-primary"
          >
            <add-icon />
            <div>Add</div>
          </div>
        </div>
      </accordion-component>
    </v-form>
    <template #optionactions>
      <div class="flex justify-end space-x-3">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Pause Encounter
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          @click="submit"
          class="text-white bg-danger px-6 rounded-xl"
        >
          Save
        </cornie-btn>
      </div>
    </template>
  </clinical-dialog>
  <div>
    <basedon
      @selectedId="setbaseOn"
      :careplan="patientCarePlans"
      :diagnosticsRequest="diagnosticsRequest"
      :medicationRequest="medicationRequest"
      v-model="showBasedOn"
    />
    <parton
      :procedures="procedures"
      :observations="observations"
      v-model="showPartOf"
      @selectedId="setPartOf"
    />
    <actor
      :practitioners="practitioner"
      :patient="patient"
      :device="device"
      :organisation="organisation"
      :related="familyHistories"
      v-model="showActor"
    />
    <function
      :procedures="procedures"
      :observations="observations"
      v-model="showFunction"
    />
    <locationM v-model="showLocation" />
    <reason-reference v-model="showReasonReference" />
    <report v-model="showReport" />
    <used-reference v-model="showUsedReference" />
    <assesor-modal
      :practitioners="practitioner"
      :patient="patient"
      :related="familyHistories"
      @selectedId="showAssessor"
      v-model="showAssessorModal"
    />
  </div>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CheckBox from "@/components/custom-checkbox.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";
  import FhirInput from "@/components/fhir-input.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import ArrowLeft from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/cancel.vue";
  import AddIcon from "@/components/icons/plus.vue";
  import { cornieClient } from "@/plugins/http";
  import IPractitioner from "@/types/IPractitioner";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";
  import actor from "./actor.vue";
  import basedon from "./basedon.vue";
  import Function from "./function.vue";
  import locationM from "./location.vue";
  import parton from "./partof.vue";
  import reasonReference from "./reason-reference.vue";
  import AssesorModal from "./recorder.vue";
  import report from "./report.vue";
  import usedReference from "./used-reference.vue";

  const procedure = namespace("procedure");
  const careplan = namespace("careplan");
  const locationStore = namespace("location");
  const user = namespace("user");

  @Options({
    components: {
      CornieDialog,
      ...CornieCard,
      ArrowLeft,
      CancelIcon,
      AssesorModal,
      ClinicalDialog,
      AddIcon,
      DateTimePicker,
      AccordionComponent,
      basedon,
      CornieSelect,
      parton,
      CheckBox,
      CornieInput,
      actor,
      Function,
      locationM,
      reasonReference,
      report,
      usedReference,
      CornieRadio,
      FhirInput,
    },
  })
  export default class NewProgressNote extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @user.Getter
    authPractitioner!: IPractitioner;

    performedOptions = ["Date/Time", "Age", "Period", "Range", "String"];
    showBasedOn = false;
    showPartOf = false;
    showItemReference = false;
    showActor = false;
    showFunction = false;
    showLocation = false;
    showReasonReference = false;
    showReport = false;
    showUsedReference = false;
    patientId = "";
    performed = "range";
    recorderCheck = "";
    loading = false;
    date = "";
    time = "";
    code = "";
    basic = {
      basedOn: "",
      partof: "",
      category: "",
      code: "",
    };
    assessment = {
      protocol: "",
      summary: "",
    };
    age = {
      value: "",
      day: "",
    };
    period = {
      start: "",
      end: "",
      startTime: "",
      endTime: "",
    };
    range = {
      unit: "",
      min: "",
      max: "",
    };
    performerString = "";
    request = [];
    practitioner: any[] = [];

    @procedure.Action
    createProcedure!: (procedure: any) => Promise<boolean>;

    @procedure.Action
    getProcedures!: (id: string) => Promise<any>;

    @procedure.State
    procedures!: any[];

    @careplan.Action
    getPatientCarePlans!: (id: string) => Promise<any>;

    @careplan.State
    patientCarePlans!: any[];

    observations: any[] = [];
    diagnosticsRequest: any[] = [];
    medicationRequest: any[] = [];
    patient: any[] = [];
    device: any[] = [];
    organisation: any[] = [];

    asserterId = true;

    basedOn: any = {};
    partOf: any = {};
    recorder: any = {};
    showAssessorModal = false;
    familyHistories = <any>[];
    get recorderP() {
      this.recorder.id = this.authPractitioner.id;
      return (
        this.authPractitioner.firstName + " " + this.authPractitioner.lastName
      );
    }
    get performedPayload() {
      if (this.performed == "date/time") {
        return {
          dateTime: this.date,
          age: {
            unit: undefined,
            value: undefined,
          },
          period: {
            start: undefined,
            end: undefined,
            startTime: undefined,
            endTime: undefined,
          },
          range: {
            unit: undefined,
            min: undefined,
            max: undefined,
          },
          string: undefined,
        };
      } else if (this.performed == "age") {
        return {
          dateTime: undefined,
          age: {
            unit: this.age.day,
            value: this.age.value,
          },
          period: {
            start: undefined,
            end: undefined,
            startTime: undefined,
            endTime: undefined,
          },
          range: {
            unit: undefined,
            min: undefined,
            max: undefined,
          },
          string: undefined,
        };
      } else if (this.performed == "period") {
        return {
          dateTime: undefined,
          age: {
            unit: undefined,
            value: undefined,
          },
          period: {
            start: this.period.start,
            end: this.period.end,
            startTime: this.period.startTime,
            endTime: this.period.endTime,
          },
          range: {
            unit: undefined,
            min: undefined,
            max: undefined,
          },
          string: undefined,
        };
      } else if (this.performed == "range") {
        return {
          dateTime: undefined,
          age: {
            unit: undefined,
            value: undefined,
          },
          period: {
            start: undefined,
            end: undefined,
            startTime: undefined,
            endTime: undefined,
          },
          range: {
            unit: this.range.unit,
            min: this.range.min,
            max: this.range.max,
          },
          string: undefined,
        };
      } else if (this.performed == "string") {
        return {
          dateTime: undefined,
          age: {
            unit: undefined,
            value: undefined,
          },
          period: {
            start: undefined,
            end: undefined,
            startTime: undefined,
            endTime: undefined,
          },
          range: {
            unit: undefined,
            min: undefined,
            max: undefined,
          },
          string: this.performerString,
        };
      }
    }
    setbaseOn(e: any) {
      console.log("based on ", e);
      this.basedOn = e;
    }

    setPartOf(e: any) {
      console.log("part of ", e);
      this.partOf = e;
    }

    showAssessor(valueforrole: any) {
      // this.assessorItem = valueforrole;
      console.log("recorder", valueforrole);
      this.recorder = valueforrole;
      this.recorder.assert = valueforrole.id;
    }

    location = {
      body: "",
    };
    required = string().required();

    @locationStore.Action
    fetchLocations!: () => Promise<any>;

    @locationStore.State
    locations!: any;

    async submit() {
      let g = {
        patientId: this.$route.params.id,
        recorderId: this.recorder.id,
        asserterId: this.asserterId ? this.recorder.assert : undefined,
        recorder: {
          name: this.recorder.name,
          specialty: this.recorder.specialty || "",
        },
        basedOn: { type: this.basedOn.typeData, date: this.basedOn.createdAt },
        partOf: { type: this.partOf.typeData, id: this.partOf.id },
        performed: this.performedPayload,
        performers: [
          {
            type: "practitioner",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
            detail: "string",
            dispenserType: "string",
            dispenser: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
        ],
        performerFunction: {
          type: "procedure",
          practitioner: "string",
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "string",
          detail: "string",
        },
        locations: [
          {
            type: "location",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
          },
        ],
        reason: {
          type: "condition",
          practitioner: "string",
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "string",
          detail: "string",
          practitionerSpecialty: "string",
          date: "2022-05-30",
        },
        bodySite: "string",
        outcome: "string",
        // report: {
        //   type: "diagnostic-report",
        //   date: "2022-05-30",
        //   id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //   name: "string",
        //   detail: "string",
        // },
        report: "jkdlkfj09435",
        complication: "string",
        complicationDetail: "string",
        followUp: "string",
        note: "string",
        focalDeviceAction: "string",
        focalDeviceManipulated: "string",
        statusHistory: {
          value: "string",
          start: "2022-05-30",
          end: "2022-05-30",
          practitionerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          practitionerName: "string",
          current: true,
          priorPrescription: "string",
          detectedIssue: "string",
          eventHistory: "string",
        },
        usedItems: [
          {
            type: "device",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
            detail: "string",
          },
        ],
      };

      await this.createProcedure(g);
    }

    async fetchObservations() {
      const url = `/api/v1/observations/patient/${this.$route.params.id}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.observations = response.data;
      }
    }

    async fetchDiagnosticsRequest() {
      const url = `/api/v1//diagnostic-requests/patient/${this.$route.params.id}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.diagnosticsRequest = response.data;
      }
    }

    async fetchMedicationRequest() {
      const url = `/api/v1//medication-requests/patient/${this.$route.params.id}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.medicationRequest = response.data;
      }
    }

    async fetchPractitioners() {
      const AllPractitioners = cornieClient().get("/api/v1/practitioner");
      const response = await Promise.all([AllPractitioners]);
      this.practitioner = response[0].data;
    }

    async fetchPatientRequest() {
      const url = "/api/v1/patient";
      const response = await cornieClient().get(url);
      if (response.success) {
        this.patient = response.data;
      }
    }

    async fetchFamilyHistories() {
      const url = `/api/v1/family-history/get-for-patient/${this.$route.params.id}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.familyHistories = response.data;
      }
    }

    async fetchOrganisation() {
      const url = "/api/v1/organization";
      const response = await cornieClient().get(url);
      if (response.success) {
        this.organisation = response.data;
        console.log("organisation", this.organisation);
      }
    }
    async fetchDevices() {
      const url = "/api/v1/devices";
      const response = await cornieClient().get(url);
      if (response.success) {
        this.device = response.data;
        // console.log("devvice", this.device);
      }
    }

    async created() {
      console.log("mounted");
      this.patientId = this.$route.params.id.toString();
      await this.getPatientCarePlans(this.patientId);
      await this.fetchObservations();
      await this.fetchDiagnosticsRequest();
      await this.fetchMedicationRequest();
      await this.fetchPractitioners();
      await this.getProcedures(this.patientId);
      await this.fetchPatientRequest();
      await this.fetchFamilyHistories();
      await this.fetchOrganisation();
      await this.fetchDevices();
    }
  }
</script>

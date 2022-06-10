<template>
  <clinical-dialog v-model="show" :title="'Create New'" class="">
    <v-form ref="form">
      <div class="border-b-2 pb-5 border-dashed border-gray-200">
        <accordion-component
          class="text-primary"
          title="Basic Info"
          :opened="false"
        >
          <div class="grid grid-cols-2 gap-6 py-6">
            <cornie-select
              :label="'Class'"
              v-model="basic.class"
              :items="['inpatient', 'outpatient', 'ambulatory', 'emmergency']"
            />
            <cornie-select
              :label="'Service Type'"
              v-model="basic.serviceType"
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
              v-model="basic.priority"
              :items="['ASAP', 'Callback results', 'callback for scheduling']"
            />
            <cornie-select
              v-model="basic.baseOn"
              :label="'Based on'"
              :items="[
                'Care Plan',
                'Medication Request',
                'Service Request',
                'Immunization Recommendation',
              ]"
            />
            <cornie-select
              v-model="appointmentVal"
              :label="'Appointment'"
              :items="appointmentList"
            />
            <!-- <auto-complete :label="'Appointment'" v-model="encounter.appointmentId" :items="appointmentList" /> -->
            <!-- <appointment-list /> -->
            <!-- <cornie-select
                :label="'Reason code'"
                v-model="encounter.priority"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              /> -->
            <div class="flex flex-col">
              <div class="capitalize text-black text-sm font-semibold">
                Reason reference
              </div>
              <div
                @click="() => (showReference = true)"
                class="flex items-center border rounded-md p-3 mt-0.5"
              >
                <div class="flex-1">Select</div>
                <div class="flex-none">
                  <add-icon class="fill-current text-danger" />
                </div>
              </div>
            </div>
            <cornie-input
              class="w-full"
              label="Reason Code"
              :placeholder="
                selectedReasonReference.length > 0
                  ? printCode(
                      selectedReasonReference[
                        selectedReasonReference.length - 1
                      ].code
                    )?.display
                  : 'Reason code'
              "
              :disabled="true"
            />
            <!-- <fhir-input
                reference="http://hl7.org/fhir/ValueSet/clinical-findings"
                class="w-full"
                label="Reason Code"
                v-model="basic.reasonCode"
                placeholder="Select"
              /> -->
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(s, i) in selectedReasonReference"
              class="p-3 shadow-md rounded-md"
            >
              <div class="flex items-center">
                <div class="flex-1">
                  <div class="font-bold text-danger capitalize">
                    {{ s.typeData }}
                  </div>
                  <div class="font-bold text-sm mb-0.5">
                    {{ printCode(s.code)?.display }}
                  </div>
                  <div class="font-bold text-sm">XXXXXX</div>
                  <div class="flex items-center">
                    <div class="font-semibold text-xs">
                      {{ s.practitioner.firstName }}
                    </div>
                    .
                    <div class="font-light text-xxs flex justify-end">
                      {{ s.practitioner.department }}
                    </div>
                  </div>
                </div>
                <delete-icon @click="removeReference(i)" />
              </div>
            </div>
          </div>
        </accordion-component>

        <accordion-component
          class="rounded-none border-none text-primary"
          title="Diagnosis"
          :opened="false"
        >
          <div class="grid grid-cols-2 gap-6 py-6">
            <div class="flex flex-col">
              <div class="capitalize text-black text-sm font-semibold">
                Condition
              </div>
              <div
                @click="() => (showCondition = true)"
                class="flex items-center border rounded-md p-3 mt-0.5"
              >
                <div class="flex-1">
                  {{
                    diagnosisTemp.conditionDescription
                      ? diagnosisTemp.conditionDescription
                      : "Select"
                  }}
                </div>
                <div class="flex-none">
                  <add-icon class="fill-current text-danger" />
                </div>
              </div>
            </div>
            <cornie-select
              :label="'Use'"
              v-model="diagnosisTemp.use"
              placeholder="Select"
              :items="roles"
            />
            <cornie-input
              class="w-full"
              label="Rank"
              placeholder="Enter"
              v-model="diagnosisTemp.rank"
            />
          </div>
          <div class="flex w-full items-center justify-end">
            <div
              @click="addDiagnosis"
              class="px-5 py-2 space-x-2 capitalize cursor-pointer items-center font-bold text-primary border-primary rounded-full border-2 flex"
            >
              <add-icon />
              <div>Add new</div>
            </div>
          </div>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(s, i) in diagnosisVal"
              class="p-3 shadow-md rounded-md"
            >
              <div class="flex items-center">
                <div class="flex-1">
                  <div class="font-bold text-danger capitalize">
                    {{ s.typeData }}
                  </div>
                  <div class="font-bold text-sm mb-0.5">
                    {{ s.conditionDescription }}
                  </div>
                  <div class="font-bold text-sm">XXXXXX</div>
                  <div class="flex items-center">
                    <div class="font-semibold text-xs">
                      {{ s.practitioner.firstName }}
                    </div>
                    .
                    <div class="font-light text-xxs flex justify-end">
                      {{ s.practitioner.department }}
                    </div>
                  </div>
                </div>
                <delete-icon @click="removeDiagnosis(i)" />
              </div>
            </div>
          </div>
        </accordion-component>

        <accordion-component
          class="rounded-none border-none text-primary"
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
                class="flex items-center border rounded-md p-3 mt-0.5"
              >
                <div class="flex-1">Practitioner</div>
                <div class="flex-none">
                  <add-icon class="fill-current text-danger" />
                </div>
              </div>
            </div>
            <cornie-input
              :disabled="true"
              class="w-full"
              label="Person"
              :placeholder="
                participantTemp?.name ? participantTemp?.name : 'Person'
              "
            />
            <date-time-picker
              class="w-full"
              label="Start date/time"
              v-model:date="participantTemp.startDate"
              v-model:time="participantTemp.startTime"
            />
          </div>
          <div class="flex w-full items-center justify-end">
            <div
              @click="addPerson"
              class="px-5 py-2 space-x-2 capitalize items-center font-bold text-primary border-primary rounded-full border-2 flex"
            >
              <add-icon />
              <div>Add new</div>
            </div>
          </div>

          <div class="border-2 h-1 border-dashed w-full my-4"></div>
          <div class="grid grid-cols-3 gap-3">
            <div
              class="p-3 shadow-md rounded-md"
              v-for="(p, i) in participantsVal"
            >
              <div class="flex items-center">
                <div class="flex-1">
                  <div class="font-bold text-danger capitalize">
                    {{ p.typeData }}
                  </div>
                  <div class="flex flex-col">
                    <div class="font-bold text-sm">{{ p.name }}</div>
                    <div class="text-xxs">{{ p.department }}</div>
                  </div>
                </div>
                <delete-icon @click="removePerson(i)" />
              </div>
            </div>
          </div>
        </accordion-component>

        <!-- <accordion-component
            class="rounded-none border-none text-primary"
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
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
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
                <div
                  @click="() => (showOrigin = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
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
                <div class="capitalize text-black text-sm font-semibold">
                  Destination
                </div>
                <div
                  @click="() => (showPreAdmission = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none">
                    <add-icon class="fill-current text-danger" />
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
          </accordion-component> -->

        <accordion-component
          class="rounded-none border-none text-primary"
          title="Location"
          :opened="false"
        >
          <div class="grid grid-cols-2 gap-6 py-6">
            <cornie-input
              class="w-full"
              label="Service Provider"
              :disabled="true"
              placeholder="Autoloaded"
            />
            <cornie-input
              class="w-full"
              label="Location"
              :disabled="true"
              placeholder="Autoloaded"
            />
            <cornie-input
              class="w-full"
              label="Physical Type"
              :disabled="true"
              placeholder="Autoloaded"
            />
            <cornie-input
              class="w-full"
              label="Status"
              :disabled="true"
              placeholder="Autoloaded"
            />
            <date-time-picker
              v-model:date="location.startDate"
              v-model:time="location.startTime"
              class="w-full"
              label="Start Date/Time"
            />
            <date-time-picker
              v-model:date="location.endDate"
              v-model:time="location.endTime"
              class="w-full"
              label="End Date/Time"
            />
            <cornie-input
              class="w-full"
              label="Part of"
              :disabled="true"
              placeholder="Organisation"
            />
          </div>
        </accordion-component>
      </div>
    </v-form>
    <template #optionactions>
      <div class="flex justify-end space-x-3">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          Cancel
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
    <reason-reference
      @selectedId="setReasonReference"
      :conditions="conditions"
      :procedures="procedures"
      :observations="observations"
      v-model="showReference"
    />
    <conditionM
      @selectedId="setDiagnosisCondition"
      :conditions="conditions"
      :procedures="procedures"
      v-model="showCondition"
    />
    <person-reference
      @selectedId="setPersonReference"
      v-model="showPersonReference"
    />
    <pre-admission-identifier v-model="showPreAdmission" />
    <origin v-model="showOrigin" />
  </div>
</template>

<script lang="ts">
  import AutoComplete from "@/components/autocomplete.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";
  import FhirInput from "@/components/fhir-input.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import ArrowLeft from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/cancel.vue";
  import DeleteIcon from "@/components/icons/deleteorange.vue";
  import AddIcon from "@/components/icons/plus.vue";
  import Modal from "@/components/modal.vue";
  import { cornieClient } from "@/plugins/http";
  import IAppointment from "@/types/IAppointment";
  import IEncounter from "@/types/IEncounter";
  import ILocation from "@/types/ILocation";
  import IPractitioner from "@/types/IPractitioner";
  import IProcedure from "@/types/IProcedure";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import SelectBoxes from "@/views/dashboard/schedules/components/apply-to.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { codes } from "../../conditions/drop-downs";
  import AppointmentList from "./appointments-list.vue";
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
  const observation = namespace("observation");
  // const location = namespace("location");

  @Options({
    components: {
      CornieDialog,
      ...CornieCard,
      ArrowLeft,
      DeleteIcon,
      ClinicalDialog,
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
      AppointmentList,
      FhirInput,
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

    @encounterM.Action
    getEncounters!: (id: any) => Promise<void>;

    @appointment.State
    patientappointments!: IAppointment[];

    @appointment.Action
    fetchByIdAppointments!: (patientId: string) => Promise<void>;

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
    roles = [];
    basic = {
      class: "",
      serviceType: "",
      priority: "",
      baseOn: "",
      reasonCode: "",
    };
    appointmentVal = "";
    selectedReasonReference: any = [];
    diagnosisTemp = {
      typeData: "",
      reference: "",
      conditionDescription: "",
      use: "",
      rank: "",
    };
    diagnosisVal: any = [];
    participantTemp = {
      typeData: "",
      referenceId: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      name: "",
    };
    participantsVal: any = [];
    encounterClass = "";
    location = {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    };
    basedOn = "";
    type = "";
    patientId = "";

    selectedDiagnosisCondition: any = {};
    selectedPersonReference: any = {};
    observations: any = [];

    printCode(code: string) {
      return codes.find((c) => c.code == code);
    }
    setReasonReference(e: any) {
      this.selectedReasonReference.push(e);
      // this.postData.hospitalization.preAdmissionIdentifier.identifier =
      //   this.selectedReasonReference[0].id;
      // this.postData.reasonReferences[0].identifier =
      //   this.selectedReasonReference[0].id;
    }
    removeReference(i: any) {
      this.selectedReasonReference.splice(i, 1);
    }
    setDiagnosisCondition(e: any) {
      this.diagnosisTemp.typeData = e.typeData;
      this.diagnosisTemp.reference = e.id;
      this.diagnosisTemp.conditionDescription = this.printCode(e.code)
        ?.display as any;
      this.diagnosisTemp = { ...this.diagnosisTemp, ...e };
    }
    addDiagnosis() {
      const { typeData, reference, conditionDescription, use, rank } =
        this.diagnosisTemp;
      if (!typeData || !reference) return;

      // this.diagnosisVal.push({
      //   type,
      //   reference,
      //   conditionDescription,
      //   use,
      //   rank,
      // });
      this.diagnosisVal.push(this.diagnosisTemp);
      this.diagnosisTemp = {
        typeData: "",
        reference: "",
        conditionDescription: "",
        use: "",
        rank: "",
      };
    }
    removeDiagnosis(i: any) {
      this.diagnosisVal.splice(i, 1);
    }
    setPersonReference(e: any) {
      console.log("practioner", e);
      this.participantTemp.typeData = "participant";
      this.participantTemp.referenceId = e.id;
      this.participantTemp.startDate = e.startDate;
      this.participantTemp.endDate = e.endDate;
      this.participantTemp.startTime = e.startTime;
      this.participantTemp.endTime = e.endTime;
      this.participantTemp.name = e.name;
      console.log("temp", this.participantTemp);
    }
    addPerson() {
      // const {} = this.participantTemp
      if (!this.participantTemp.referenceId) return;
      this.participantsVal.push(this.participantTemp);
      console.log("reference", this.participantsVal);
      // this.participantTemp.referenceId = "";
    }
    removePerson(i: any) {
      this.participantsVal.splice(i, 1);
    }
    async fetchObservations() {
      const url = `/api/v1/observations/patient/${this.$route.params.id.toString()}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.observations = response.data;
      }
    }

    async fetchRoles() {
      const AllRoles = cornieClient().get("/api/v1/roles");
      const response = await Promise.all([AllRoles]);
      this.roles = response[0].data;

      if (this.roles.length > 0) {
        //@ts-ignore
        this.roles = this.roles.map((x) => x.description);
        return;
      } else this.roles = [];
      console.log("roles", this.roles);
    }

    // async fetchLocations() {
    //   try {
    //     const response = await cornieClient().get(
    //       "/api/v1/location/myOrg/getMyOrgLocations"
    //     );
    //     if (response.success) return response.data;
    //   } catch (error) {}
    //   return [] as ILocation[];
    // }

    async submit() {
      let postData = {
        class: this.basic.class,
        status: "active",
        serviceType: this.basic.serviceType,
        // appointmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        hospitalization: {
          preAdmissionIdentifier: {
            type: "condition",
            description: undefined,
            identifier: this.selectedReasonReference[0].id,
            practitioner: undefined,
          },
          origin: {
            type: "location",
            name: undefined,
            address: undefined,
          },
          ward: undefined,
          room: undefined,
          bed: undefined,
          admitSource: undefined,
          readmission: true,
          dietPreferences: ["lol"],
          specialCourtesy: undefined,
          specialAgreement: undefined,
          destination: {},
          dischargeDisposition: undefined,
        },
        // organizationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        patientId: this.patientId,
        startDate: "2022-05-25",
        endDate: "2022-05-25",
        startTime: undefined,
        endTime: undefined,
        statusHistory: {
          value: undefined,
          start: "2022-05-25",
          end: "2022-05-25",
          practitionerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          practitionerName: undefined,
          current: true,
          priorPrescription: undefined,
          detectedIssue: undefined,
          eventHistory: undefined,
        },
        locationId: "9b45779c-91f3-4f73-8de8-83265412789d",
        practitionerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        location: {
          name: undefined,
          locationStatus: undefined,
          operationalStatus: undefined,
          description: undefined,
          alias: undefined,
          mode: undefined,
          type: undefined,
          phone: undefined,
          email: undefined,
          address: undefined,
          country: undefined,
          state: undefined,
          physicalType: undefined,
          latitude: undefined,
          longitude: undefined,
          altitude: undefined,
          managingOrg: undefined,
          partOf: undefined,
          availabilityExceptions: undefined,
          careOptions: undefined,
          openTo: undefined,
          hoursOfOperation: {
            day: undefined,
            openTime: undefined,
            closeTime: undefined,
          },
        },
        basedOn: this.basic.baseOn,
        diagnoses: this.diagnosisVal.map((x: any) => {
          return {
            type: x.typeData,
            reference: x.reference,
            conditionDescription: x.conditionDescription,
            use: x.use,
            rank: x.rank,
          };
        }),
        participants: this.participantsVal.map((x: any) => {
          console.log("sent p", x);
          return {
            type: "practitioner",
            referenceId: x.referenceId,
            startDate: x.startDate,
            endDate: x.endDate,
            startTime: x.startTime,
            endTime: x.endTime,
          };
        }),
        providerName: undefined,
        reasonReferences: this.selectedReasonReference.map((x: any) => {
          return {
            type: x.typeData,
            description: this.printCode(x.code)?.display,
            identifier: x.id,
          };
        }),
        billingStatus: "billed",
      };
      console.log("submit", postData);
      await this.postEncounter({
        ...postData,
        patientId: this.$route.params.id.toLocaleString(),
      })
        .then(async () => {
          // window.location.reload();
          notify({ msg: "Encounters created successfully", status: "success" });
          this.show = false;
          await this.getEncounters(this.$route.params.id.toString());
        })
        .catch((e) => {
          console.log("error on encounter", e);
          notify({
            msg: "There was an error creating encounters",
            status: "error",
          });
        });
    }

    get appointmentList() {
      if (this.patientappointments?.length <= 0) return [];
      return this.patientappointments
        ?.filter((app) => app)
        .map((app) => {
          return app?.description;
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
      await this.fetchByIdAppointments(this.$route.params.id.toString());
      await this.fetchObservations();
      await this.fetchRoles();
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

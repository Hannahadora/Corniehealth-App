<template>
  <big-dialog
    v-model="show"
    :title="newaction + ' ' + 'Appointment'"
    subtext="All Fields are required"
    class=""
  >
    <v-form ref="form">
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Basic Info"
        :opened="true"
      >
        <div class="grid grid-cols-2 gap-3 mt-5">
          <auto-complete
            class="w-full"
            placeholder="--Select--"
            label="Service Category"
            :items="dropdowns.serviceCategory"
            :rules="required"
            v-model="serviceCategory"
          />
          <auto-complete
            class="w-full"
            placeholder="--Select--"
            label="Service Type"
            :items="dropdowns.serviceType"
            v-model="serviceType"
            :rules="required"
          />
          <auto-complete
            placeholder="--Select--"
            :rules="required"
            class="w-full"
            v-model="specialty"
            :items="dropdowns.specialty"
            label="Specialty"
          />
          <auto-complete
            placeholder="--Select--"
            :rules="required"
            v-model="appointmentType"
            class="w-full"
            :items="[
              'Check-Up',
              'Follow-Up',
              'Emergency',
              'Routine',
              'Walk-In',
            ]"
            label="Appointment Type"
          />
          <auto-complete
            placeholder="--Select--"
            v-model="reasonCode"
            :rules="required"
            class="w-full"
            :items="[
              'Anxiety disorder of childhood OR adolescence',
              'Choroidal hemorrhage',
              '	Spontaneous abortion with laceration of cervix',
              '	Homoiothermia',
            ]"
            label="Reason Code"
          />
          <auto-complete
            placeholder="--Select--"
            :rules="required"
            class="w-full"
            v-model="reasonRef"
            :items="[
              'Refferal',
              'Condition',
              'Procedure',
              'Observation',
              'Immunization',
              'Recommendation',
            ]"
            label="Reason Reference"
          />
          <auto-complete
            placeholder="--Select--"
            :rules="required"
            class="w-full"
            v-model="priority"
            :items="['Routine', 'Urgent', 'Asap', 'Stat']"
            label="Priority"
          />
          <cornie-input
            label="Description"
            placeholder="--Enter--"
            v-model="description"
            class="w-full"
          />
          <cornie-input
            class="w-full"
            label="supporting information"
            placeholder="--Enter--"
            v-model="supportingInfo"
          />
          <cornie-select
            v-if="availableSlots.length === 0 && newPractitioners.length === 0"
            placeholder="--Select--"
            class="w-full"
            label="Slot"
            :rules="required"
            :items="[
              'Please choose a pracitioner participant to view avialable slots',
            ]"
          />

          <cornie-select
            v-else-if="
              availableSlots.length === 0 && newPractitioners.length !== 0
            "
            placeholder="--Select--"
            class="w-full"
            label="Slot"
            :rules="required"
            :items="['This pracitioner does not have an avialable slot']"
          />
          <cornie-select
            v-else
            @click="showSlots(allSlots, slot)"
            v-model="slot"
            placeholder="--Select--"
            class="w-full"
            label="Slot"
            :rules="required"
            :items="allSlots"
          />

          <single-date-picker
            label="start date"
            v-model="period.start"
            :rules="required"
            class="w-full"
          />

          <single-date-picker
            label="end date"
            v-model="period.end"
            :rules="required"
            class="w-full"
          />
          <!-- <date-time-picker
                    v-model:date="period.start"
                    v-model:time="data.startTime"
                    label="Start Date & Time"
                    width="w-full"

                    />


                    <date-time-picker
                    v-model:date="period.end"
                    v-model:time="data.endTime"
                    label="End Date & Time"
                    width="w-full"
                    /> -->

          <cornie-input
            disabled
            :rules="required"
            label="Duration"
            v-model="duration"
            placeholder="--Autofilled--"
            class="w-full mt-3"
          />
          <cornie-input
            :rules="required"
            label="Comments"
            v-model="comments"
            placeholder="--Enter--"
            class="w-full mt-3"
          />
          <cornie-input
            :rules="required"
            label="Patient’s Instruction"
            v-model="patientInstruction"
            placeholder="--Enter--"
            class="w-full"
          />
          <auto-complete
            placeholder="--Select--"
            v-model="basedOn"
            :rules="required"
            class="w-full"
            :items="allRequests"
            label="Based On"
          />
        </div>
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Participants"
        :opened="false"
      >
        <div class="grid grid-cols-2 gap-3 mt-5">
          <div class="w-full cursor-pointer">
            <label class="flex normal-case mb-0 text-black text-sm font-bold"
              >Actor</label
            >
            <input-desc-rounded :info="''" class="cursor-pointer">
              <input
                type="text"
                disabled
                v-model="actorType"
                placeholder="--Select--"
                class="cursor-pointer p-2 border-1 border-gray-300 rounded-md w-100 w-full"
              />
              <span>
                <plus-icon
                  class="aadd text-danger fill-current cursor-pointer"
                  @click="showActor()"
                />
              </span>
            </input-desc-rounded>
          </div>

          <!-- <cornie-select
          @click="checkActor"
          class="w-full"
          placeholder="--Select--"
            v-model="actors"
            label="Actor"
            :items="['Patient','Practitioner','Device','Location','Healthcare Services']"
            :rules="required"
          /> -->
        </div>
        <div class="w-full">
          <div>
            <div class="w-full grid grid-cols-3 gap-4 mt-5">
              <div
                class="border-r-2 border-dashed"
                v-for="(input, index) in newPractitioners"
                :key="index"
              >
                <div class="mb-8 p-2">
                  <div class="flex space-x-4 float-left">
                    <avatar
                      class="mr-2"
                      v-if="input.image"
                      :src="input.image"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                    <div>
                      <p class="text-xs text-black font-semibold">
                        {{ input.firstName }}
                        {{ input.lastName }}
                      </p>
                      <p class="text-xs text-gray-400 font-medium">
                        {{ valuePractioner }}
                      </p>
                    </div>
                  </div>
                  <div class="float-right">
                    <div class="flex space-x-4">
                      <d-edit
                        class="float-left cursor-pointer"
                        @click="showActor()"
                      />
                      <deleteorange-icon
                        class="float-right cursor-pointer"
                        @click="removePractitioner(index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-r-2 border-dashed"
                v-for="(input, index) in newDevices"
                :key="index"
              >
                <div class="mb-8 p-2">
                  <div class="flex space-x-4 float-left">
                    <avatar class="mr-2" :src="localSrc" />
                    <div>
                      <p class="text-xs text-black font-semibold">
                        {{ input.deviceName.name }}
                      </p>
                      <p class="text-xs text-gray-400 font-medium">
                        {{ valueDevice }}
                      </p>
                    </div>
                  </div>
                  <div class="float-right">
                    <div class="flex space-x-4">
                      <d-edit
                        class="float-left cursor-pointer"
                        @click="showActor()"
                      />
                      <deleteorange-icon
                        class="float-right cursor-pointer"
                        @click="removeDevice(index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-r-2 border-dashed"
                v-for="(input, index) in newRoles"
                :key="index"
              >
                <div class="mb-8 p-2">
                  <div class="flex space-x-4">
                    <avatar
                      class="mr-2"
                      v-if="input.image"
                      :src="input.image"
                    />
                    <avatar class="mr-2" v-else :src="img.placeholder" />
                    <div>
                      <p class="text-xs text-black font-semibold">
                        {{ input.name }}
                      </p>
                      <p class="text-xs text-gray-400 font-medium">
                        {{ valueRole }}
                      </p>
                    </div>
                  </div>
                  <span>
                    <deleteorange-icon
                      class="float-right cursor-pointer"
                      @click="removeRole(index)"
                    />
                  </span>
                </div>
              </div>
              <div
                class="border-r-2 border-dashed"
                v-for="(input, index) in newPatients"
                :key="index"
              >
                <div class="mb-8 p-2">
                  <div class="flex space-x-4 float-left">
                    <avatar
                      class="mr-2"
                      v-if="input.profilePhoto"
                      :src="input.profilePhoto"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                    <div>
                      <p class="text-xs text-black font-semibold">
                        {{ input.firstname }} {{ input.lastname }}
                      </p>
                      <p class="text-xs text-gray-400 font-medium">
                        {{ valuePatient }}
                      </p>
                    </div>
                  </div>
                  <div class="float-right">
                    <div class="flex space-x-4">
                      <d-edit
                        class="float-left cursor-pointer"
                        @click="showActor()"
                      />
                      <deleteorange-icon
                        class="float-right cursor-pointer"
                        @click="removePatient(index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-r-2 border-dashed"
                v-for="(input, index) in newLocations"
                :key="index"
              >
                <div class="mb-8 p-2">
                  <div class="flex space-x-4 float-left">
                    <avatar
                      class="mr-2"
                      v-if="input.profilePhoto"
                      :src="input.profilePhoto"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                    <div>
                      <p class="text-xs text-black font-semibold">
                        {{ input.name }}
                      </p>
                      <p class="text-xs text-gray-400 font-medium">
                        {{ valueLocation }}
                      </p>
                    </div>
                  </div>
                  <div class="float-right">
                    <div class="flex space-x-4">
                      <d-edit
                        class="float-left cursor-pointer"
                        @click="showActor()"
                      />
                      <deleteorange-icon
                        class="float-right cursor-pointer"
                        @click="removeLocation(index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-r-2 border-dashed"
                v-for="(input, index) in newHealthcare"
                :key="index"
              >
                <div class="mb-8 p-2">
                  <div class="flex space-x-4 float-left">
                    <avatar
                      class="mr-2"
                      v-if="input.profilePhoto"
                      :src="input.profilePhoto"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                    <div>
                      <p class="text-xs text-black font-semibold">
                        {{ input.name }}
                      </p>
                      <p class="text-xs text-gray-400 font-medium">
                        {{ valueHealth }}
                      </p>
                    </div>
                  </div>
                  <div class="float-right">
                    <div class="flex space-x-4">
                      <d-edit
                        class="float-left cursor-pointer"
                        @click="showActor()"
                      />
                      <deleteorange-icon
                        class="float-right cursor-pointer"
                        @click="removeHealth(index)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </accordion-component>
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn
        :loading="loading"
        @click="apply"
        class="text-white bg-danger px-3 rounded-xl"
      >
        Save
      </cornie-btn>
    </template>
  </big-dialog>
  <actor-modal
    :patients="patients"
    :practitioners="practitioners"
    :devices="devices"
    :practitionerRoles="practitionerRoles"
    :locations="locations"
    :healthcares="healthcares"
    :actorType="actorType"
    @show:modal="showActor"
    v-model:visible="showActorModal"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieNumInput from "@/components/cornienuminput.vue";
import DEdit from "@/components/icons/aedit.vue";
import CornieTextArea from "@/components/textarea.vue";
// import DatePicker from "./datepicker.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import ActorModal from "./actor.vue";
import DateTimePicker from "@/components/datetime-picker.vue";
import Measurable from "@/components/measurable.vue";
import plusIcon from "@/components/icons/plus.vue";
import { IPatient } from "@/types/IPatient";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import TimeablePicker from "@/components/timeable.vue";
import { namespace } from "vuex-class";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";
import IAppointment, {
  Practitioners,
  Patients,
  Devices,
  Location,
  HealthCare,
} from "@/types/IAppointment";
import ILocation from "@/types/ILocation";
import IDevice from "@/types/IDevice";
import IPractitioner from "@/types/IPractitioner";
import IHealthcare from "@/types/IHealthcare";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
import SingleDatePicker from "./datepicker.vue";
import FhirInput from "@/components/fhir-input.vue";

const appointment = namespace("appointment");
const patients = namespace("patients");
const location = namespace("location");
const device = namespace("device");
const practitioner = namespace("practitioner");
const roles = namespace("roles");
const healthcare = namespace("healthcare");
const dropdown = namespace("dropdown");

const data = {
  age: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
};

@Options({
  name: "AddAppointment",
  components: {
    BigDialog,
    TimeablePicker,
    DEdit,
    CornieNumInput,
    CornieBtn,
    DeleteorangeIcon,
    AutoComplete,
    DateTimePicker,
    Avatar,
    FhirInput,
    ActorModal,
    // DatePicker,
    SingleDatePicker,
    Measurable,
    plusIcon,
    AccordionComponent,
    CornieSelect,
    CornieInput,
    CornieTextArea,
  },
})
export default class AddAppointment extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @PropSync("modelValue")
  show!: boolean;

  // @patients.State
  // patients!: IPatient[];
  patients = [];

  @practitioner.State
  practitioners!: IPractitioner[];

  @device.State
  devices!: IDevice[];

  @location.State
  locations!: ILocation[];

  @healthcare.State
  healthcares!: IHealthcare[];

  //   @patients.Action
  // fetchPatients!: () => Promise<void>;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @device.Action
  fetchDevices!: () => Promise<void>;

  @location.Action
  fetchLocations!: () => Promise<void>;

  @healthcare.Action
  fetchHealthcares!: () => Promise<void>;

  @appointment.Action
  getAppointmentById!: (id: string) => IAppointment;

  required = string().required();

  dropdowns = {} as IIndexableObject;
  dropdowns2 = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  historymodel = {} as IAppointment;

  showActorModal = false;
  loading = false;

  data: any = {};
  //period = {...data};
  actors = "Practitioner";
  actorType = "";
  practitionerRoles = [];
  localSrc = require("../../../../assets/img/placeholder.png");
  valuePractioner = "";
  valuePatient = "";
  valueRole = "";
  valueDevice = "";
  valueLocation = "";
  valueHealth = "";
  availableSlots = [];
  request = [];
  newslot: any;

  serviceCategory = "";
  locationId = null;
  deviceId = null;
  serviceType = "";
  specialty = "";
  appointmentType = "";
  reasonCode = "";
  reasonRef = "";
  priority = "";
  description = "";
  supportingInfo = "";
  oldslots = "";
  slot = "";
  basedOn = "";
  comments = "";
  duration = "";
  patientInstruction = "";
  practitionerId = "";
  period = {} as Period;
  errortext = "";
  newPractitioners = [];
  newPatients = [];
  newDevices = [];
  newLocations = [];
  newHealthcare = [];

  apractitioners: Practitioners[] = [];
  adevices: Devices[] = [];
  apatients: Patients[] = [];
  alocation: Location[] = [];
  ahealthcare: HealthCare[] = [];

  get patientId() {
    return this.$route.params.id;
  }

  async setNewHistoryModel() {
    this.historymodel = JSON.parse(JSON.stringify(this.payload));
  }

  @Watch("id")
  idChanged() {
    this.setAppointment();
  }
  async setAppointment() {
    const appointment = await this.getAppointmentById(this.id);
    if (!appointment) return;
    this.serviceCategory = appointment.serviceCategory;
    this.locationId = appointment.locationId;
    this.deviceId = appointment.deviceId;
    this.serviceType = appointment.serviceType;
    this.specialty = appointment.specialty;
    this.supportingInfo = appointment.supportingInfo;
    this.appointmentType = appointment.appointmentType;
    this.reasonCode = appointment.reasonCode;
    this.reasonRef = appointment.reasonRef;
    this.priority = appointment.priority;
    this.description = appointment.description;
    this.slot = appointment.slot;
    this.basedOn = appointment.basedOn;
    this.duration = appointment.duration;
    this.comments = appointment.comments;
    this.patientInstruction = appointment.patientInstruction;
    this.period = appointment.period;
    this.apractitioners = appointment.Practitioners;
    this.adevices = appointment.Devices;
    this.apatients = appointment.Patients;
    this.alocation = appointment.Locations;
    this.ahealthcare = appointment.HealthCare;
  }

  get payload() {
    return {
      serviceCategory: this.serviceCategory,
      locationId: this.locationId,
      deviceId: this.deviceId,
      serviceType: this.serviceType,
      specialty: this.specialty,
      appointmentType: this.appointmentType,
      reasonCode: this.reasonCode,
      supportingInfo: this.supportingInfo,
      reasonRef: this.reasonRef,
      priority: this.priority,
      description: this.description,
      slot: this.slot,
      basedOn: this.basedOn,
      duration: this.duration,
      comments: this.comments,
      patientInstruction: this.patientInstruction,
      Devices: this.adevices,
      period: this.period,
      Patients: this.apatients,
      Practitioners: this.apractitioners,
      Locations: this.alocation,
      healthcare: this.ahealthcare,
    };
  }
  get newaction() {
    return this.id ? "Update" : "New";
  }

  async checkActor() {
    if (this.actors == "Patient") {
      this.actorType = "Patient";
      this.showActorModal = true;
    } else if (this.actors == "Practitioner") {
      this.actorType = "Practitioner";
      this.showActorModal = true;
    } else if (this.actors == "Device") {
      this.actorType = "Device";
      this.showActorModal = true;
    } else if (this.actors == "Practitioner Role") {
      this.actorType = "Practitioner Role";
      this.showActorModal = true;
    } else if (this.actors == "Location") {
      this.actorType = "Location";
      this.showActorModal = true;
    } else if (this.actors == "Healthcare Services") {
      this.actorType = "Healthcare Services";
      this.showActorModal = true;
    } else {
      this.actors = "";
    }
  }
  async showActor(
    newid: string,
    updatePractitioners: any,
    updatePatients: any,
    updateDevices: any,
    updateLocation: any,
    updateHealthcare: any,
    getPractitioner: any,
    getPatient: any,
    getDevice: any,
    getLocation: any,
    getHealthcare: any,
    value: string,
    apractitionerId: string
  ) {
    this.showActorModal = true;
    this.actorType = value;

    if (value == "Practitioner") {
      this.newPractitioners = updatePractitioners;
      this.apractitioners = getPractitioner;
      this.valuePractioner = value;
      this.practitionerId = newid;
      this.getSlots();
    } else if (value == "Patient") {
      this.newPatients = updatePatients;
      this.apatients = getPatient;
      this.valuePatient = value;
    } else if (value == "Device") {
      this.newDevices = updateDevices;
      this.adevices = getDevice;
      this.valueDevice = value;
    } else if (value == "Location") {
      this.newLocations = updateLocation;
      this.valueLocation = value;
      this.alocation = getLocation;
    } else if (value == "Healthcare Services") {
      this.newHealthcare = updateHealthcare;
      this.valueHealth = value;
      this.ahealthcare = getHealthcare;
    }
  }

  async showSlots(slots: any, id: string) {
    const pt = this.availableSlots.find((i: any) => i.id === id);
    this.newslot = pt;
    this.period.start = this.newslot.date;
    this.period.end = this.newslot.date;
    this.duration = this.newslot.startTime + "-" + this.newslot.endTime;
  }
  removePractitioner(index: number) {
    this.newPractitioners.splice(index, 1);
  }
  removePatient(index: number) {
    this.newPatients.splice(index, 1);
  }
  removeDevice(index: number) {
    this.newDevices.splice(index, 1);
  }
  removeLocation(index: number) {
    this.newLocations.splice(index, 1);
  }
  removeHealth(index: number) {
    this.newHealthcare.splice(index, 1);
  }
  done() {
    this.$emit("appointment-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    if (this.id) await this.updateappointment();
    else await this.createappointment();
    this.loading = false;
  }
  async createappointment() {
    if (this.apractitioners.length === 0) {
      window.notify({ msg: "Pracitioner is required", status: "error" });
    } else if (this.apatients.length === 0) {
      window.notify({ msg: "Patient is required", status: "error" });
    } else {
      try {
        const response = await cornieClient().post(
          "/api/v1/appointment",
          this.payload
        );
        if (response.success) {
          window.notify({ msg: "Appointment created", status: "success" });
          this.done();
        }
      } catch (error) {
        window.notify({ msg: "This slot is overbooked", status: "error" });
      }
    }
  }
  async updateappointment() {
    const url = `/api/v1/appointment/${this.id}`;
    const payload = {
      ...this.payload,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Appointment  updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Appointment not updated", status: "error" });
    }
  }

  async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.practitionerRoles = response[0].data;
  }
  get allSlots() {
    if (!this.availableSlots || this.availableSlots.length === 0) return [];
    return this.availableSlots.map((i: any) => {
      return {
        code: i.id,
        display: i.startTime + "-" + i.endTime,
      };
    });
  }

  get allRequests() {
    if (!this.request || this.request.length === 0) return [];
    return this.request.map((i: any) => {
      return {
        code: i.id,
        display: i.requestInfo.intent,
      };
    });
  }
  async getSlots() {
    const oneId = this.practitionerId;
    const AllSlots = cornieClient().get(
      `/api/v1/slot/practitioner/${this.practitionerId}`
    );
    const response = await Promise.all([AllSlots]);
    this.availableSlots = response[0].data;
  }
  async getSinglePatient() {
    const oneId = this.practitionerId;
    const AllSlots = cornieClient().get(`/api/v1/patient/${this.patientId}`);
    const response = await Promise.all([AllSlots]);
    this.patients = response[0].data;
  }
  async fetchRequest() {
    const AllRequests = cornieClient().get("/api/v1/requests");
    const response = await Promise.all([AllRequests]);
    this.request = response[0].data;
  }

  async created() {
    this.getSinglePatient();
    this.fetchRoles();
    this.setAppointment();
    this.fetchPractitioners();
    this.fetchDevices();
    this.fetchLocations();
    this.fetchHealthcares();
    this.fetchRequest();

    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
  }
}
</script>
<style scoped>
.aadd {
  float: right;
  position: relative;
  bottom: 30px;
  margin-right: 10px;
}
</style>

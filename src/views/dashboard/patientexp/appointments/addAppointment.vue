<template>
  <div class="w-full h-full">
    <span class="flex w-full mt-3 font-bold text-lg text-primary py-2 mx-auto">
      {{ allaction }} Appointment
      <span class="text-danger text-xs mt-2 ml-2 font-normal"
        >(Items with asterisk are required for filling)</span
      >
    </span>
    <div>
      <div class="py-4 ">
         <div class="flex space-x-4">
            <avatar class="mr-2 w-14 h-14" v-if="practionerObject?.image" :src="practionerObject?.image"/>
            <avatar class="mr-2  w-14 h-14" v-else :src="img.placeholder"/>
            <div>
              <p class="text-sm text-dark font-semibold">
                {{ practionerObject?.firstName }}
                {{ practionerObject?.lastName }}
              </p>
              <p class="text-sm text-gray font-light">
                {{ practionerObject?.department }}
              </p>
            </div>
          </div>
      </div>
      <div class="w-full">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-80">
            <accordion-component title="Appointment Details" v-model="opened">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="w-full"
                   :required="true"
                    :rules="required"
                    :items="dropdowns.serviceCategory"
                    v-model="serviceCategory"
                    label="service category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="w-full"
                   :required="true"
                    :rules="required"
                    :items="dropdowns.serviceType"
                    v-model="serviceType"
                    label="service type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   :required="true"
                    :rules="required"
                    :items="dropdowns.specialty"
                    v-model="specialty"
                    label="specialty"
                    placeholder="--Select--"
                    class="w-full"
                  >
                  </cornie-select>
                  <cornie-select
                   :required="true"
                    :rules="required"
                    :items="[
                      'Check-Up',
                      'Follow-Up',
                      'Emergency',
                      'Routine',
                      'Walk-In',
                    ]"
                    v-model="appointmentType"
                    label="Appointment Type"
                    placeholder="--Select--"
                    class="w-full"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="['reason code']"
                    v-model="reasonCode"
                    label="Reason code"
                    placeholder="--Select--"
                    class="w-full"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="[
                      'Refferal',
                      'Condition',
                      'Procedure',
                      'Observation',
                      'Immunization',
                      'Recommendation',
                    ]"
                    v-model="reasonRef"
                    label="reason reference"
                    placeholder="--Select--"
                    class="w-full"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="['routine', 'urgent', 'asap', 'stat']"
                    v-model="priority"
                    label="priority"
                    placeholder="--Select--"
                    class="w-full"
                  >
                  </cornie-select>
                  <cornie-input
                    label="description"
                    placeholder="--Enter--"
                    v-model="description"
                    class="w-full"
                  />
                  <cornie-input
                    label="supporting information"
                    placeholder="--Enter--"
                    v-model="supportingInfo"
                    class="w-full"
                  />
                  <!-- <div>
                    <label class="block uppercase mb-1 text-xs font-bold">
                      slot
                    </label>
                    <span
                      class="text-gray-600 cursor-pointer text-xs"
                      @click="showSlots"
                    >
                      Choose Slot</span
                    >
                  </div> -->
                   <cornie-input
                    label="Slot"
                    placeholder="--Autofilled--"
                    v-model="slotDate"
                    :disabled="true"
                    class="w-full"
                  />
                  <cornie-input
                    label="start date"
                    placeholder="--Autofilled--"
                    v-model="period.start"
                    :disabled="true"
                    class="w-full"
                  />
                   <cornie-input
                    label="end date"
                    placeholder="--Autofilled--"
                    v-model="period.end"
                    :disabled="true"
                    class="w-full"
                  />
                  <!-- <div class="w-11/12">
                    <single-date-picker
                      label="start date"
                      v-model="period.start"
                    />
                  </div> -->
                  <!-- <div class="w-11/12">
                    <single-date-picker
                      label="end date"
                      v-model="period.end"
                    />
                  </div> -->
                  <cornie-input
                    label="duration (minutes)"
                    placeholder="--Enter--"
                    v-model="duration"
                    :disabled="true"
                  />
                  <cornie-input
                    :required="true"
                    :rules="required"
                    label="comments"
                    placeholder="--Enter--"
                    v-model="comments"
                  />
                  <cornie-input
                    label="patient’s instruction"
                    placeholder="--Enter--"
                    v-model="patientInstruction"
                  />
                  <!-- <cornie-select
                  class="required"
                  :rules="required"
                  :items="[
                    'CarePlan',
                    'MedicationRequest',
                    'ServiceRequest',
                    'ImmunizationRecommendation',
                  ]"
                  v-model="basedOn"
                  label="based on"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="['information']"
                  v-model="supportingInformation"
                  label="supporting information"
                  placeholder="--Select--"
                >
                </cornie-select>
                 <cornie-select
                  class="required"
                  :rules="required"
                  :items="['required']"
                  v-model="required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-date-picker  class="w-full" v-model="period"
                  label="Period"/> -->
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Add Participants" v-model="openedR">
              <template v-slot:default>
                <div
                  class="float-left flex cursor-pointer p-5 mb-5 space-x-4 mt-3 text-xs text-danger uppercase font-semibold"
                  @click="displayParticipants()"
                >
                  add actor(s)
                  <plus-icon class="ml-2 text-primary fill-current" />
                </div>
                <div class="w-full">
                  <div>
                    <div class="w-full grid grid-cols-3 gap-4 mt-5">
                       <div v-if="newPractitioners.length > 0">

                      <div
                        class="border-r-2"
                        v-for="(input, index) in newPractitioners"
                        :key="index"
                      >
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                            <avatar
                              class="mr-2"
                              v-if="input.image"
                              :src="input.image"
                            />
                            <avatar
                              class="mr-2"
                              v-else
                              :src="img.placeholder"
                            />
                            <div>
                              <p class="text-xs text-dark font-semibold">
                                {{ input.firstName }}
                                {{ input.lastName }}
                              </p>
                              <p class="text-xs text-gray font-light">
                                {{ valuePractioner }}
                              </p>
                            </div>
                          </div>
                          <span>
                            <deleteorange-icon
                              class="float-right cursor-pointer relative bottom-8"
                              @click="removePractitioner(index)"
                            />
                          </span>
                        </div>
                      </div>
                      </div>
                      <div v-else>
                        <div
                          class="border-r-2"
                          v-for="(input, index) in practitioners"
                          :key="index"
                        >
                          <div class="mb-8 p-2">
                            <div class="flex space-x-4">
                              <avatar
                                class="mr-2"
                                v-if="input.practitioner.image"
                                :src="input.practitioner.image"
                              />
                              <avatar
                                class="mr-2"
                                v-else
                                :src="img.placeholder"
                              />
                              <div>
                                <p class="text-xs text-dark font-semibold">
                                  {{ input.practitioner.firstName }}
                                  {{ input.practitioner.lastName }}
                                </p>
                                <p class="text-xs text-gray font-light">
                                  {{ valuePractioner }}
                                </p>
                              </div>
                            </div>
                            <span>
                              <deleteorange-icon
                                class="float-right cursor-pointer relative bottom-8"
                                @click="removePractitioner(index)"
                              />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div v-if="newPatients.length > 0">
                        <div
                          class="border-r-2"
                          v-for="(input, index) in newPatients"
                          :key="index"
                        >
                          <div class="mb-8 p-2">
                            <div class="flex space-x-4">
                              <avatar
                                class="mr-2"
                                v-if="input.profilePhoto"
                                :src="input.profilePhoto"
                              />
                              <avatar
                                class="mr-2"
                                v-else
                                :src="img.placeholder"
                              />
                              <div>
                                <p class="text-xs text-dark font-semibold">
                                  {{ input.firstname }} {{ input.lastname }}
                                </p>
                                <p class="text-xs text-gray font-light">
                                  {{ valuePatient }}
                                </p>
                              </div>
                            </div>
                            <span>
                              <deleteorange-icon
                                class="float-right cursor-pointer relative bottom-8"
                                @click="removePatient(index)"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <div
                          class="border-r-2"
                          v-for="(input, index) in patients"
                          :key="index"
                        >
                          <div class="mb-8 p-2">
                            <div class="flex space-x-4">
                              <avatar
                                class="mr-2"
                                v-if="input.patient.profilePhoto"
                                :src="input.patient.profilePhoto"
                              />
                              <avatar
                                class="mr-2"
                                v-else
                                :src="img.placeholder"
                              />
                              <div>
                                <p class="text-xs text-dark font-semibold">
                                  {{ input.patient.firstname }} {{ input.patient.lastname }}
                                </p>
                                <p class="text-xs text-gray font-light">
                                  {{ valuePatient }}
                                </p>
                              </div>
                            </div>
                            <span>
                              <deleteorange-icon
                                class="float-right cursor-pointer relative bottom-8"
                                @click="removePatient(index)"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    
                       <div v-if="newDevices.length > 0">
                          <div
                            class="border-r-2"
                            v-for="(input, index) in newDevices"
                            :key="index"
                          >
                            <div class="mb-8 p-2">
                              <div class="flex space-x-4">
                                <avatar class="mr-2" :src="img.placeholder" />
                                <div>
                                  <p class="text-xs text-dark font-semibold">
                                    {{ input.deviceName.name }}
                                  </p>
                                  <p class="text-xs text-gray font-light">
                                    {{ valueDevice }}
                                  </p>
                                </div>
                              </div>
                              <span>
                                <deleteorange-icon
                                  class="float-right cursor-pointer relative bottom-8"
                                  @click="removeDevice(index)"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                       <div v-else>
                          <div
                            class="border-r-2"
                            v-for="(input, index) in devices"
                            :key="index"
                          >
                            <div class="mb-8 p-2">
                              <div class="flex space-x-4">
                                <avatar class="mr-2" :src="img.placeholder" />
                                <div>
                                  <p class="text-xs text-dark font-semibold">
                                    {{ input.device.deviceName.name }}
                                  </p>
                                  <p class="text-xs text-gray font-light">
                                    {{ valueDevice }}
                                  </p>
                                </div>
                              </div>
                              <span>
                                <deleteorange-icon
                                  class="float-right cursor-pointer relative bottom-8"
                                  @click="removeDevice(index)"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        

                      <div
                        class="border-r-2"
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
                            <avatar
                              class="mr-2"
                              v-else
                              :src="img.placeholder"
                            />
                            <div>
                              <p class="text-xs text-dark font-semibold">
                                {{ input.name }}
                              </p>
                              <p class="text-xs text-gray font-light">
                                {{ valueRole }}
                              </p>
                            </div>
                          </div>
                          <span>
                            <deleteorange-icon
                              class="float-right cursor-pointer relative bottom-8"
                              @click="removeRole(index)"
                            />
                          </span>
                        </div>
                      </div>

                

                    </div>
                  </div>
                </div>
              </template>
            </accordion-component>
            <span class="flex justify-end w-full">
              <button
                @click="
                  $router.push('/dashboard/provider/experience/appointments')
                "
                type="button"
                class="outline-primary rounded text-black bg-white mt-5 mr-3 py-2 pr-14 pl-14 px-3 focus:outline-none hover:bg-primary hover:text-white"
              >
                Cancel
              </button>

              <cornie-btn
                :loading="loading"
                type="submit"
                class="bg-danger rounded text-white mt-5 pr-14 pl-14 focus:outline-none hover:opacity-90"
              >
                Save
              </cornie-btn>
            </span>
          </div>
        </form>
        <all-actors
          :practitioners="practitioner"
          :devices="device"
          :roles="role"
          :patients="patient"
          :practionerId="practitionersId"
          @update:preferred="displayParticipants"
          v-model="showActors"
        />
        <all-slots
          :columns="availableSlots"
          @update:preferred="showSlots"
          v-model:visible="displaySlots"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieDateRangePicker from "@/components/daterangepicker.vue";
import IAppointment, {
  ParticipantDetail,
  Practitioners,
  Patients,
  Devices,
} from "@/types/IAppointment";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import PractitionersFilter from "@/components/practitioner.vue";
import PatientsFilter from "@/components/patient.vue";
import DevicesFilter from "@/components/device.vue";
import RolesFilter from "@/components/roles.vue";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import SingleDatePicker from "./datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import PlusIcon from "@/components/icons/plus.vue";
import Avatar from "@/components/avatar.vue";
import AllActors from "./actors.vue";
import AllSlots from "./slots.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import {Slot} from '@/types/ISchedule';

const appointment = namespace("appointment");
const dropdown = namespace("dropdown");
const slot = namespace("schedules");

const emptyPractitioners: Practitioners = {
  id: "",
  type: "",
  required: "",
  consultationMedium: "",
  period: {} as Period,
  practitionerId: "",
};
const emptyPatients: Patients = {
  id: "",
  type: "",
  required: "",
  consultationMedium: "",
  period: {} as Period,
  patientId: "",
  firstname: "",
  lastname: "",
  gender: "",
  dateOfBirth: "",
  accountType: "",
  mrn: "",
};
const emptyDevices: Devices = {
  id: "",
  type: "",
  required: "",
  consultationMedium: "",
  period: {} as Period,
  deviceId: "",
};
const emptyParticipant: ParticipantDetail = {
  period: {} as Period,
  required: "",
  consultationMedium: "",
};

@Options({
  components: {
    CornieInput,
    CornieSelect,
    AllActors,
    PlusIcon,
    PractitionersFilter,
    SingleDatePicker,
    DeleteorangeIcon,
    CornieDateRangePicker,
    Textarea,
    DEdit,
    CDelete,
    AllSlots,
    Avatar,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    PatientsFilter,
    DevicesFilter,
    RolesFilter,
  },
})
export default class AddAppointment extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  practitionersId!: string;

   @Prop({ type: String, default: "" })
  slotId!: string;

  @Prop({ type: Array, default: [] })
  availivilePractitioner!: object;

  

  
  @slot.State
  slots!: Slot[];

  @slot.Action
  singlePractitonerSlot!: (slotId: string) => Promise<void>;

  actorTypeValue = "";

  @appointment.Action
  getAppointmentById!: (id: string) => IAppointment;


  loading = false;
  expand = false;
  isVisible = "";
  startdate = "";
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedT = false;
  displaySlots = false;
  availableSlots = [];
  actor = "";
  type = "";
  practitionerId = "";
  img = setup(() => useHandleImage());
  slotDate = "";

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
  slot = "";
  basedOn = "A32bef92-1a82-4c05-9bda-1f6c12bd2582";
  duration = "";
  comments = "";
  patientInstruction = "";
  period = {} as Period;
  participantDetail = { ...emptyParticipant };
  practitioners: Practitioners[] = [];
  devices: Devices[] = [];
  patients: Patients[] = [];
  roles = [];

  newPractitioners = [];
  newActors = [];
  newDevices = [];
  newPatients = [];
  newRoles = [];

  roleFilter = false;
  deviceFilter = false;
  practitionerFilter = false;
  patientFilter = false;
  availableFilter = false;
  showActors = false;
  participantitem = "";
  valuePractioner = "";
  valuePatient = "";
  valueRole = "";
  valueDevice = "";

  practitioner = [];
  device = [];
  patient = [];
  role = [];

  availability: any[] = [];
  availabilities = Array();

  preferredHeaders = [];
  items = ["Patient", "Practitioner", "Practitioner Role", "Device"];

  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];
  required = string().required();
  dropdowns = {} as IIndexableObject;
  dropdowns2 = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

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
    this.practitioners = appointment.Practitioners;
    this.devices = appointment.Devices;
    this.patients = appointment.Patients;
    this.slotId = appointment.slot;
    this.slotDate = new Date(appointment.period.start).toLocaleDateString() +'-'+ new Date(appointment.period.end as any).toLocaleDateString();
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
      Devices: this.devices,
      period: this.period,
      Patients: this.patients,
      Practitioners: this.practitioners,
    };
  }
  // get singlePractionerId(){
  //   return this.$route.redirectedFrom?.query.practitioner as string
  // }
  start = [] as any;
  end= [] as any;
  get allaction() {
    return this.id ? "Edit" : "Create";
  }
  get selectedItem() {
    return this.participantitem;
  }
  get practionerObject() {
    const pt = this.practitioner.find((i: any) => i.id === this.practitionersId);
    return pt;
  }

  setTime(date: Date, time: string) {
  const { hour, minute } = this.splitTime(time);
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
  }
   splitTime(time: string) {
  const [hour, minute] = time.split(":").map((val) => Number(val));
  return { hour, minute };
  }
  getDurationSecs(startTime: string, endTime: string) {
    let start = new Date();
    start = this.setTime(start, startTime);
    let end = new Date();
    end = this.setTime(end, endTime);
    const durationMillis = end.getTime() - start.getTime();
    return Math.ceil(durationMillis / 1000);
  }
  
  get slotObject() {
    const pt = this.slots.find((i: any) => i.id == this.slotId);
    console.log(pt,"PT@ii");
    if(pt){
      this.slot  = pt.id as any;
      this.slotDate = pt.startTime +'-'+ pt.endTime;
      this.period.start = pt.date;
      this.period.end = pt.date;
      const time = this.getDurationSecs( pt.startTime as any , pt.endTime as any);
      this.duration = Math.floor(time / 60).toString() as any;
      return pt;
    }
  }
  // async addPractitioner(value: any, id: any) {
  //   this.newPractitioners = value;
  //   this.practitioners = id;
  //   this.practitionerFilter = false;
  // }
  async showSlots(slots: any) {
    this.displaySlots = true;
    this.period.start = slots.startDate;
    this.period.end = slots.endDate;
    this.duration = slots.startTime + "-" + slots.endTime;
    this.slot = slots.id;
   this.getPractionerSlot();
  }
  async displayParticipants(
    valueforpractitioner: any,
    valueforpatient: any,
    valuefordevice: any,
    typevalue: string,
    incomingpractioner: any,
    incomingpatient: any,
    incomingdevice: any,
    apractitionerId: string
  ) {
    this.showActors = true;
    if (typevalue == "Practitioner") {
      this.newPractitioners = valueforpractitioner;
      this.valuePractioner = typevalue;
      this.practitionerId = apractitionerId;
      // this.newPractitioner.push(...value);
      this.practitioners = incomingpractioner;
    }
    if (typevalue == "Patient") {
      this.newPatients = valueforpatient;
      this.valuePatient = typevalue;
      // this.newPatient.push(...value);
      this.patients = incomingpatient;
    }
    if (typevalue == "Device") {
      this.valueDevice = typevalue;
      this.newDevices = valuefordevice;
      this.devices = incomingdevice;
    }
  }
  removePractitioner(index: number) {
    this.newPractitioners.splice(index, 1);
  }
  removeRole(index: number) {
    this.newRoles.splice(index, 1);
  }
  removePatient(index: number) {
    this.newPatients.splice(index, 1);
  }
  removeDevice(index: number) {
    this.newDevices.splice(index, 1);
  }
  showAvailable() {
    this.availableFilter = true;
  }
  async addPatients(value: any, id: any) {
    this.newPatients = value;
    this.patients = id;
    this.patientFilter = false;
  }
  async addDevices(value: any, id: any) {
    this.newDevices = value;
    this.devices = id;
    this.deviceFilter = false;
  }
  async addRoles(value: any, id: any) {
    // this.role.push(value);
    this.newRoles = value;
    this.roles = id;
    this.roleFilter = false;
  }
  get setValue() {
    if (this.type == "Practitioner") {
      this.practitionerFilter = true;
    } else if (this.type == "Patient") {
      this.patientFilter = true;
    } else if (this.type == "Device") {
      this.deviceFilter = true;
    } else if (this.type == "Practitioner Role") {
      this.roleFilter = true;
    }
    return this.type;
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateAppointment();
    else await this.createAppointment();
    this.loading = false;
  }
  async createAppointment() {
    this.actor = this.type;
    if(this.payload.Practitioners == []){
        window.notify({ msg: "Practioner Actor is requred", status: "error" });
    }else if (this.payload.Patients == []){
      window.notify({ msg: "Pateint Actor is requred", status: "error" });
    }
    try {
      const response = await cornieClient().post(
        "/api/v1/appointment",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Appointment created", status: "success" });
        this.$router.push("/dashboard/provider/experience/appointments");
      }
    } catch (error) {
      window.notify({ msg: "The Slot is overbooked", status: "error" });
      // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }

  async updateAppointment() {
    const url = `/api/v1/appointment/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Appointment updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/appointments");
      }
    } catch (error) {
      window.notify({ msg: "Appointment not updated", status: "error" });
    }
  }

  async getPractionerSlot() {
    try {
      const response = await cornieClient().get(
        `/api/v1/slot/practitioner/${this.practitionersId}`
      );
      if (response.success) {
        this.availableSlots = response.data;
      }
    } catch (error) {}

  }

  // async getSlots() {
  //   try {
  //     const response = await cornieClient().get(
  //       `/api/v1/slot/practitioner/${this.practitionersId}`
  //     );
  //     if (response.success) {
  //       this.availableSlots = response.data;
  //     }
  //   } catch (error) {}

  // }

  async fetchPractitioners() {
    const AllPractitioners = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioners]);
    this.practitioner = response[0].data;
  }
  async fetchDevices() {
    const AllDevices = cornieClient().get("/api/v1/devices");
    const response = await Promise.all([AllDevices]);
    this.device = response[0].data;
  }
  async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.role = response[0].data;
  }
  async fetchPatients() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
  async created() {
   await  this.fetchPractitioners();
    await this.singlePractitonerSlot(this.practitionerId);
    const data =  this.getDropdowns("availability");
    const data2 =  this.getDropdowns("practitioner");
    if(this.payload.slot){
      await this.singlePractitonerSlot(this.payload.slot);
    }else{
    }
    //  this.getSlots();
    this.dropdowns = data;
    this.dropdowns2 = data2;
    this.slotObject;
    await this.setAppointment();
    await this.getPractionerSlot();

    
    this.fetchDevices();
    this.fetchRoles();
    this.fetchPatients();
  }
}
</script>
<style>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
.outline-primary {
  border: 2px solid #080056;
  background: #fff;
}
.required label::after {
  content: "*";
  color: #fe4d3c;
  margin-left: 5px;
}
</style>

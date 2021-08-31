<template>
  <div class="w-full h-full">
    <span class="flex w-full mt-3 font-bold text-lg text-primary py-2 mx-auto">
      {{ allaction }} Appointment
      <span class="text-danger text-xs mt-2 ml-2 font-normal"
        >(Items with asterisk are required for filling)</span
      >
    </span>
    <div>
      <div class="w-full">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-80">
            <accordion-component title="Appointment Details" v-model="opened">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="dropdowns.serviceCategory"
                    v-model="serviceCategory"
                    label="service category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="dropdowns.serviceType"
                    v-model="serviceType"
                    label="service type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="dropdowns.specialty"
                    v-model="specialty"
                    label="specialty"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="[
                      'Check-Up',
                      'Follow-Up',
                      'Emergency',
                      'Routine',
                      'Walk-In',
                    ]"
                    v-model="appointmentType"
                    label="APPOINTMENT TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['reason code']"
                    v-model="reasonCode"
                    label="Reason code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['Refferal','Condition','Procedure','Observation','Immunization', 'Recommendation']"
                    v-model="reasonRef"
                    label="reason reference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['routine', 'urgent', 'asap', 'stat']"
                    v-model="priority"
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input
                    label="description"
                    placeholder="--Enter--"
                    v-model="description"
                  />
                  <cornie-input
                    label="supporting information"
                    placeholder="--Enter--"
                    v-model="supportingInfo"
                  />
                  <div>
                    <label class="block uppercase mb-1 text-xs font-bold">
                      slot
                    </label>
                    <span class="text-gray-600 cursor-pointer text-xs">
                      Choose Slot</span
                    >
                  </div>
                  <single-date-picker
                    label="start date"
                    v-model="period.start"
                    :rules="required"
                  />
                  <single-date-picker
                    label="end date"
                    v-model="period.end"
                    :rules="required"
                  />
                  <cornie-input
                    label="duration (minutes)"
                    placeholder="--Enter--"
                    v-model="duration"
                  />
                  <cornie-input
                    class="required"
                    label="comments"
                    placeholder="--Enter--"
                    v-model="comments"
                  />
                  <cornie-input
                    class="required"
                    label="patient’s instruction"
                    placeholder="--Enter--"
                    v-model="patientInstruction"
                  />
                  <div>
                    <label class="block uppercase mb-1 text-xs font-bold">
                      Based On
                    </label>
                    <span class="text-gray-600 cursor-pointer text-xs">
                      Choose Request</span
                    >
                  </div>
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Add Participants" v-model="openedR">
              <template v-slot:default>
                <div
                  class="
                    float-left
                    flex
                    cursor-pointer
                    p-5
                    mb-5
                    space-x-4
                    mt-3
                    text-xs text-danger
                    uppercase
                    font-semibold
                  "
                  @click="displayParticipants()"
                >
                  add actor(s)
                  <plus-icon class="ml-2 text-primary fill-current" />
                </div>
                <div class="w-full">
                  <div>
                    <div class="w-full grid grid-cols-3 gap-4 mt-5">
                      <div class="border-r-2" v-for="(input, index) in newPractitioners" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                            <avatar class="mr-2" :src="input.image" />
                            <!--   <avatar class="mr-2" v-else :src="img.placeholder" />-->
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
                      <div class="border-r-2" v-for="(input, index) in newDevices" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                              <avatar class="mr-2"  :src="img.placeholder" />
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
                      <div  class="border-r-2" v-for="(input, index) in newRoles" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                            <avatar class="mr-2" v-if="input.image" :src="input.image" />
                              <avatar class="mr-2" v-else :src="img.placeholder" />
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
                      <div class="border-r-2" v-for="(input, index) in newPatients" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                            <avatar class="mr-2" v-if="input.image" :src="input.image" />
                            <avatar class="mr-2" v-else :src="img.placeholder" />
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
                  </div>          
                </div>
                <div class="w-full grid grid-cols-3 gap-4 p-5">
                  <cornie-select
                    :onChange="setValue"
                    class="required"
                    :rules="required"
                    :items="items"
                    v-model="type"
                    label="TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Required', 'Information Only', 'Optional']"
                    v-model="participantDetail.required"
                    label="required"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-picker
                    label="period"
                    v-model="participantDetail.period"
                    :rules="required"
                  />
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="[
                      'Out-Patient',
                      ' In-Patient',
                      ' Virtual',
                      'HomeCare',
                    ]"
                    v-model="participantDetail.consultationMedium"
                    label="consultation medium"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
            <span class="flex justify-end w-full">
              <button
                @click="
                  $router.push('/dashboard/provider/experience/appointments')
                "
                type="button"
                class="
                  outline-primary
                  rounded-full
                  text-black
                  mt-5
                  mr-3
                  py-2
                  pr-14
                  pl-14
                  px-3
                  focus:outline-none
                  hover:bg-primary
                  hover:text-white
                "
              >
                Cancel
              </button>

              <cornie-btn
                :loading="loading"
                type="submit"
                class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  pr-14
                  pl-14
                  focus:outline-none
                  hover:opacity-90
                "
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
          @update:preferred="displayParticipants"
          v-model:visible="showActors"
        />
    <!--    <practitioners-filter
          :columns="practitioner"
          @update:preferred="addPractitioner"
          v-model:visible="practitionerFilter"
        />
        <patients-filter
          :columns="patient"
          @update:preferred="addPatients"
          v-model:visible="patientFilter"
        />
        <devices-filter
          :columns="device"
          @update:preferred="addDevices"
          v-model:visible="deviceFilter"
        />
        <roles-filter
          :columns="role"
          @update:preferred="addRoles"
          v-model:visible="roleFilter"
        />-->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options,  setup,Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IAppointment, { ParticipantDetail } from "@/types/IAppointment";
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
import SingleDatePicker from "@/components/datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import PlusIcon from "@/components/icons/plus.vue";
import Avatar from "@/components/avatar.vue";
import AllActors from "./actors.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import { useHandleImage } from "@/composables/useHandleImage";

const appointment = namespace("appointment");
const dropdown = namespace("dropdown");

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
    Availability,
    DeleteorangeIcon,
    Textarea,
    DEdit,
    CDelete,
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

  actor = "";
  type = "";
 img = setup(() => useHandleImage());

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
  slot = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  basedOn = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  duration = "";
  comments = "";
  patientInstruction = "";
  period = {} as Period;
  participantDetail = { ...emptyParticipant };
  Practitioners = [];
  Devices = [];
  Patients = [];
  roles = [];

  newPractitioners  = [];
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
    this.Practitioners = appointment.Practitioners;
    this.Devices = appointment.Devices;
    this.Patients = appointment.Patients;
    this.participantDetail = appointment.participantDetail;
  }
  get payload() {
    const payload = {
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
      //   slot: this.slot,
      basedOn: this.basedOn,
      duration: this.duration,
      comments: this.comments,
      patientInstruction: this.patientInstruction,
      participantDetail: this.participantDetail,
      period: this.period,
      Patients: this.Patients,
    } as any;
    if (this.Devices.length > 0) {
      payload.Devices = this.Devices;
    }
    // if(this.Patients.length > 0){
    //   payload.Patients = this.Patients;
    // }
    if (this.Practitioners.length > 0) {
      payload.Practitioners = this.Practitioners;
    }
    return payload;
  }
  get allaction() {
    return this.id ? "Edit" : "Create";
  }
  get selectedItem() {
    return this.participantitem;
  }
  async addPractitioner(value: any, id: any) {
    //this.practitioner.push({ ...this.practitioners });
    this.newPractitioners = value;
    this.Practitioners = id;
    this.practitionerFilter = false;
  }
  async displayParticipants(value: any, id: any, typevalue: string) {
    // this.newPractitioners .push({ ...this.practitioners });
    //  this.newActors = value;
      this.showActors = true;
      
    if (typevalue == "Practitioner") {
     this.newPractitioners = value;
     this.valuePractioner = typevalue;
    // this.newPractitioner.push(...value);
      this.Practitioners = id;
    } 
    if (typevalue == "Patient") {
     this.newPatients = value;
     this.valuePatient = typevalue;
     // this.newPatient.push(...value);
      this.Patients = id;
    } 
     if (typevalue == "Role") {
     this.newRoles = value;
     this.valueRole = typevalue;
     // this.newRole.push({ ...this.newRoles});
      this.roles = id;
    } 
     if (typevalue == "Device") {
       this.valueDevice = typevalue;
      this.newDevices = value;
      this.Devices = id;
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
    this.Patients = id;
    this.patientFilter = false;
  }
  async addDevices(value: any, id: any) {
    this.newDevices = value;
    this.Devices = id;
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
    //const period = this.period;
    this.payload.period.end = new Date(this.payload.period.end).toISOString();
    this.payload.period.start = new Date(
      this.payload.period.start
    ).toISOString();
    this.type = this.actor;
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
      console.log(error);
      window.notify({ msg: "Appointment not created", status: "error" });
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
    this.setAppointment();
    this.fetchPractitioners();
    this.fetchDevices();
    this.fetchRoles();
    this.fetchPatients();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
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
}
.required label::after {
  content: "*";
  color: #fe4d3c;
  margin-left: 5px;
}
</style>

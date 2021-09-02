<template>
  <div class="w-full">
    <span class="flex w-full mt-3 font-bold text-lg text-primary py-2 mx-auto">
      {{ allaction }} Requests
      <span class="text-danger text-xs mt-2 ml-2 font-normal"
        >(Items with asterisk are required for filling)</span
      >
    </span>
    <div>
      <div class="w-full h-screen overflow-auto">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-80">
            <accordion-component title="Basic Info" v-model="opened">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    :items="dropdowns.serviceCategory"
                    v-model="serviceCategory"
                    label="activity definition"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="dropdowns.serviceType"
                    v-model="serviceType"
                    label="based on"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="dropdowns.specialty"
                    v-model="specialty"
                    label="replaces"
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
                    label="intent"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['reason code']"
                    v-model="reasonCode"
                    label="category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['reason reference']"
                    v-model="reasonRef"
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['reason reference']"
                    v-model="reasonRef"
                    label="do not perform"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Request Info" v-model="openedR">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="requester"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.specialty"
                  v-model="specialty"
                  label="encounter"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </accordion-component>
            <accordion-component title="Subject" v-model="openedS">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceCategory"
                  v-model="serviceCategory"
                  label="subject"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="insurance"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </accordion-component>
            <accordion-component title="Request" v-model="openedS">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceCategory"
                  v-model="serviceCategory"
                  label="reason code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceCategory"
                  v-model="serviceCategory"
                  label="order detail"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="precondition?"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="precondition code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="reason code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="request reference"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-input label="supporting info" placeholder="--Enter--" />
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="specimen"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="body site"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-numinput
                  label="quantity"
                  type="number"
                  placeholder="--Enter--"
                />
                <div>
                  <label class="block uppercase mb-1 text-xs font-bold"
                    >Ratio</label
                  >
                  <div
                    class="flex h-12 border-gray-100 rounded-lg w-full border-2"
                  >
                    <input
                      contenteditable="true"
                      class="w-10 ml-20 outline-none focus-within:outline-none"
                      type="text"
                      value="2"
                    />
                    <span class="relative left-14 top-2">:</span>
                    <input
                      contenteditable="true"
                      type="text"
                      class="ml-32 w-10 outline-none focus-within:outline-none"
                      value="2"
                    />
                  </div>
                </div>
                <div>
                  <range-slider />
                </div>
                <cornie-date-picker class="w-full" label="occurence DATE" />
                <cornie-date-picker class="w-full" label="occurence Period" />
                <time-picker
                  class="w-full"
                  placeholder="00:00"
                  label="occurence timing"
                />
                <cornie-input label="note" placeholder="--Enter--" />
                <cornie-input
                  label="patient instructions"
                  placeholder="--Enter--"
                />
              </div>
            </accordion-component>
            <accordion-component title="Performer" v-model="openedS">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceCategory"
                  v-model="serviceCategory"
                  label="performer type"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="performer"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="location code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="serviceType"
                  label="location"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </accordion-component>
            <accordion-component title="Forms" v-model="openedS">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  :items="dropdowns.serviceCategory"
                  v-model="serviceCategory"
                  label="Link Forms"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieNuminput from "@/components/cornienuminput.vue";
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
import RangeSlider from "@/components/range.vue";
import DatePicker from "@/components/daterangepicker.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
import TimePicker from "@/components/Timepicker.vue";

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
    CornieNuminput,
    CornieDatePicker,
    PractitionersFilter,
    TimePicker,
    SingleDatePicker,
    Availability,
    Textarea,
    DEdit,
    CDelete,
    Avatar,
    RangeSlider,
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
  openedS = true;

  actor = "";
  type = "";

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

  newPractitioners = [];
  newDevices = [];
  newPatients = [];
  newRoles = [];

  roleFilter = false;
  deviceFilter = false;
  practitionerFilter = false;
  patientFilter = false;
  availableFilter = false;
  participantitem = "";

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

    console.log(appointment);
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
      slot: this.slot,
      basedOn: this.basedOn,
      duration: this.duration,
      comments: this.comments,
      patientInstruction: this.patientInstruction,
      participantDetail: this.participantDetail,
      period: this.period,
    } as any;
    if (this.Devices.length > 0) {
      payload.Devices = this.Devices;
    }
    if (this.Patients.length > 0) {
      payload.Patients = this.Patients;
    }
    if (this.Practitioners.length > 0) {
      payload.Practitioners = this.Practitioners;
    }
    return payload;
  }
  get allaction() {
    return this.id ? "Edit" : "New";
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
  removePractitioner(index: number) {
    this.newPractitioners.splice(index, 1);
  }
  removeRole(index: number) {
    this.newRoles.splice(index, 1);
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
    this.payload.period.start = new Date(this.period.start).toISOString();
    //this.payload.period.end = new Date(this.period.end).toISOString();
    this.actor = this.type;
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
input[type="range"]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
}
</style>

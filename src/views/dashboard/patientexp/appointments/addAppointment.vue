<template>
  <div class="w-full h-full">
    <span class="flex w-full font-bold text-lg text-primary py-2 mx-auto">
      Create Appointment
      <span class="text-danger text-xs mt-2 ml-2 font-normal"
        >(Items with asterisk are required for filling)</span
      >
    </span>
    <div>
      <div class="w-full h-screen overflow-auto">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-96">
            <accordion-component title="Appointment Details" v-model="opened">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['category']"
                    v-model="serviceCategory"
                    label="service category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['type']"
                    v-model="serviceType"
                    label="service type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['special']"
                    v-model="specialty"
                    label="specialty"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Check-Up','Follow-Up','Emergency','Routine','Walk-In' ]"
                    v-model="appointmentType"
                    label="APPOINTMENT TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['state']"
                    v-model="reasonCode"
                    label="REason code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['state']"
                    v-model="reasonRef"
                    label="reason reference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['state']"
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
                      Choose Slot</span>
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
                      Choose Request</span>
                  </div>
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Add Participants" v-model="openedR">
              <template v-slot:default>
                <div
                  class="p-5"
                  v-for="(input, index) in practitioner"
                  :key="index"
                  >
                  <span
                    class="
                      flex
                      border-b-2 border-dashed
                      w-full
                      text-sm text-primary
                      py-2
                      mx-auto
                      font-semibold
                      col-span-full
                      mb-2
                      mt-4
                    "
                  >
                    Practitioner
                  </span>
                  <div class="grid grid-cols-2 gap-2 col-span-full mt-4 p-5">
                    <div class="flex space-x-4">
                      <avatar class="mr-2" :src="input[index].image" />
                      <!--   <avatar class="mr-2" v-else :src="img.placeholder" />-->
                      <div>
                        <p class="text-xs text-dark font-semibold">
                          {{ input[index].firstName }}
                          {{ input[index].lastName }}
                        </p>
                        <p class="text-xs text-gray font-light">
                          {{ input[index].jobDesignation }}
                          {{ input[index].department }}
                        </p>
                      </div>
                    </div>
                    <div class="float-right">
                      <c-delete
                        class="ml-20 cursor-pointer float-right"
                        @click="removePractitioner(index)"
                      />
                      <d-edit
                        class="cursor-pointer float-right"
                        @click="practitionerFilter = true"
                      />
                    </div>
                  </div>
                </div>
                <div class="p-5"  v-for="(input, index) in device"
                  :key="index">
                  <span
                    class="
                      flex
                      border-b-2 border-dashed
                      w-full
                      text-sm text-primary
                      py-2
                      mx-auto
                      font-semibold
                      col-span-full
                      mb-2
                    "
                  >
                    Device
                  </span>
                  <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                    <div>
                      <p class="text-xs text-dark font-semibold">{{input[index].deviceName.name}}</p>
                      <p class="text-xs text-gray font-light">{{input[index].deviceName.nameType}}</p>
                    </div>
                    <div class="float-right">
                      <c-delete class="ml-20 cursor-pointer float-right" />
                      <d-edit class="cursor-pointer float-right" />
                    </div>
                  </div>
                </div>
                <div class="p-5"  v-for="(input, index) in role"
                  :key="index">
                  <span
                    class="
                      flex
                      border-b-2 border-dashed
                      w-full
                      text-sm text-primary
                      py-2
                      mx-auto
                      font-semibold
                      col-span-full
                      mb-2
                    "
                  >
                    Practitioners Role
                  </span>
                  <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                    <div>
                      <p class="text-xs text-dark font-semibold">{{input[index].name}}</p>
                      <p class="text-xs text-gray font-light">{{input[index].description}}</p>
                    </div>
                    <div class="float-right">
                      <c-delete class="ml-20 cursor-pointer float-right" />
                      <d-edit class="cursor-pointer float-right" />
                    </div>
                  </div>
                </div>
                <div class="w-full grid grid-cols-3 gap-4 p-5">
                  <cornie-select
                   :onChange="setValue"
                    class="required"
                    :rules="required"
                    :items="items"
                    v-model="member.type"
                    label="TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required border-0 focus-within:outline-none"
                    :rules="required"
                    :value="member.type"
                    label="actor"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="member.required"
                    label="required"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-picker
                    label="period"
                    v-model:end="member.period.end"
                    v-model="member.period.start"
                    :rules="required"
                  />
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['medium']"
                    v-model="member.consultationMedium"
                    label="consultation medium"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
            <span class="flex justify-end w-full">
              <button
                @click="$router.push('/dashboard/provider/experience/appointments')"
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
        <practitioners-filter
          :columns="practitioners"
          @update:preferred="addPractitioner"
          v-model:visible="practitionerFilter"
        />
        <patients-filter
          :columns="patients"
          @update:preferred="addPatients"
          v-model:visible="patientFilter"
        />
        <devices-filter
          :columns="devices"
          @update:preferred="addDevices"
          v-model:visible="deviceFilter"
        />
         <roles-filter
          :columns="roles"
          @update:preferred="addRoles"
          v-model:visible="roleFilter"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IAppointment, {Members} from "@/types/IAppointment";
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
import Avatar from "@/components/avatar.vue";

const appointment = namespace("appointment");
const dropdown = namespace("dropdown");

const emptyMember: Members = {
  appointmentId: "",
  actor: "",
  type: "",
  period: { start: "2011/12/15", end: "2017/12/19" },
  required: "",
  consultationMedium: "",
};

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PractitionersFilter,
    SingleDatePicker,
    Availability,
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
  supportingInfo ="";
  slot = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  basedOn = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  duration = "";
  comments = "";
  patientInstruction = "";
  period = { start: "10/12/2011", end: "15/12/2019" };

 member = { ...emptyMember }
 members: Members[] = [{appointmentId:"",actor:"",type:"", required:"",consultationMedium:"",period:{start:'',end:''}}];

  roleFilter = false;
  deviceFilter = false;
  practitionerFilter = false;
  patientFilter = false;
  availableFilter = false;
  participantitem = "";
  practitioner: any[] = [];
  practitioners = Array();
  device: any[] = [];
  devices = Array();
  availability: any[] = [];
  availabilities = Array();
  role: any[] = [];
  roles = Array();
  preferredHeaders = [];
  items = ["Patient", "Practitioner", "Practitioner Role", "Device"];

  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];
  required = string().required();
  dropdowns = {} as IIndexableObject;

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
      period: this.period,
    
    };
  }
  get allaction() {
    return this.id ? "Edit" : "Add a";
  }
  get selectedItem() {
    return this.participantitem;
  }
  async addPractitioner(value: object) {
    this.practitioner.push({ ...this.practitioners });
    this.practitionerFilter = false;
  }
  editPractioner(index: number) {
    this.practitioner = this.practitioners[index];
  }
  removePractitioner(index: number) {
    this.practitioner.splice(index, 1);
  }
  showAvailable() {
    this.availableFilter = true;
  }
  async addPatients(value: object) {
    this.patientFilter = false;
  }
  async addDevices(){
     this.device.push({ ...this.devices });
    this.deviceFilter = false;
  }
  async addRoles(value: object){
    this.role.push({ ...this.roles });
    this.roleFilter = false;
    console.log(value);
  }
   get setValue() {
    if (this.member.type == "Practitioner") {
      this.practitionerFilter = true;
    } else if (this.member.type == "Patient") {
      this.patientFilter = true;
    }else if(this.member.type == 'Device'){
       this.deviceFilter = true;
    }else if(this.member.type == 'Practitioner Role'){
        this.roleFilter = true;
    }
    return this.member.type;
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateAppointment();
    else await this.createAppointment();
    this.loading = false;
  }
  async createAppointment() {
    this.payload.period.start = new Date(this.period.start).toISOString();
    this.payload.period.end = new Date(this.period.end).toISOString();
    try {
      const response = await cornieClient().post("/api/v1/appointment", this.payload);
      this.member.appointmentId = response.data.id;
      if (response.success) {
        const response = await cornieClient().post("/api/v1/appointment/participant",this.member);
        if(response.success){
          window.notify({ msg: "Appointment created", status: "success" });
          this.$router.push("/dashboard/provider/experience/appointments");
        }
      }
    } catch (error) {
      window.notify({ msg: "Appointment not created", status: "error" });
      this.$router.push("/dashboard/provider/experience/appointments");
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
    this.practitioners = response[0].data;
  }
  async fetchDevices() {
    const AllDevices = cornieClient().get("/api/v1/devices");
    const response = await Promise.all([AllDevices]);
    this.devices = response[0].data;
  }
  async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.roles = response[0].data;
  }
  async created() {
    this.setAppointment();
    this.fetchPractitioners();
    this.fetchDevices();
    this.fetchRoles();
    const data = await this.getDropdowns("availability");
    this.dropdowns = data;
    console.log(data);
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

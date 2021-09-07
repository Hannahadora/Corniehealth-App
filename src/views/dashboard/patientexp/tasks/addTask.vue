<template>
  <div class="w-full">
    <span class="flex w-full mt-3 -mb-2 font-bold text-lg text-primary py-2 mx-auto">
     New Task
    </span>
    <div>
      <div class="w-full h-screen">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-80">
            <accordion-component title="Required Field" v-model="opened" :opened="false">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-input label="activity definition" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-input label="desciption" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-select
                    :items="['proposal','plan','order','original-order','reflex-order','filler-order','instance-order','option']"
                    v-model="serviceType"
                    label="intent"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="['']"
                    v-model="specialty"
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="['routine','urgent','asap','stat']"
                    v-model="appointmentType"
                    label="status"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input label="status reason" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                   <cornie-input label="business status" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-select
                    :items="['reason code']"
                    v-model="reasonCode"
                    label="code"
                    placeholder="--Select--"
                  >
                   <template v-slot:labelicon>
                        <question-icon/>
                    </template>  
                  </cornie-select>
                   <cornie-input label="for" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                   <cornie-input label="business status" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <date-picker label="excecution period">
                       <template v-slot:labelicon>
                        <question-icon/>
                    </template>  
                  </date-picker>
                  <cornie-select
                    :items="['reason reference']"
                    v-model="reasonRef"
                    label="performer type"
                    placeholder="--Select--"
                  >
                  <template v-slot:labelicon>
                        <question-icon/>
                    </template>  
                  </cornie-select>
                   <cornie-select
                    :items="['reason reference']"
                    v-model="reasonRef"
                    label="owner"
                    placeholder="--Select--"
                  >
                  <template v-slot:labelicon>
                        <question-icon/>
                    </template>  
                  </cornie-select>
                  <cornie-select
                    :items="['reason reference']"
                    v-model="reasonRef"
                    label="location"
                    placeholder="--Select--"
                  >
                  <template v-slot:labelicon>
                        <question-icon/>
                    </template>  
                  </cornie-select>
                  <div>
                      <DateTimePicker :label="'start DATE & Time'">
                           <template v-slot:labelicon>
                            <question-icon/>
                        </template>  
                          <template #date>
                              <span><span>{{ new Date(data.startDate ?? Date.now()).toLocaleDateString()}}</span></span>
                          </template>
                          <template #time>
                              <span><span>{{ data.startTime }}</span></span>
                          </template>
                          <template #input>
                              <v-date-picker  v-model="data.startDate" style="position:relative;z-index:9000;width:100%"></v-date-picker>
                                <label
                                  class="block uppercase my-1 text-xs font-bold"
                                  >
                                  Time
                              </label>
                              <input v-model="data.startTime" type="time" class="w-full border rounded-md p-2">
                          </template>
                      </DateTimePicker>
                  </div>
                  <div>
                      <DateTimePicker :label="'end DATE & Time'">
                           <template v-slot:labelicon>
                          <question-icon/>
                      </template>  
                          <template #date>
                              <span>{{ new Date(data.endDate ?? Date.now()).toLocaleDateString()}}</span>
                          </template>
                          <template #time>
                              <span>{{ data.endTime }}</span>
                          </template>
                          <template #input>
                              <v-date-picker name="eeee" v-model="data.endDate" style="z-index:9000;width:100%"></v-date-picker>
                              <label
                                  class="block uppercase my-1 text-xs font-bold"
                                  >
                                  Time
                              </label>
                              <input v-model="data.endTime" type="time" class="w-full border rounded-md p-2">
                          </template>
                      </DateTimePicker>
                  </div>
                  <cornie-select
                    :items="['reason reference']"
                    v-model="reasonRef"
                    label="recipient"
                    placeholder="--Select--"
                  >
                  <template v-slot:labelicon>
                        <question-icon/>
                    </template>  
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Optional Field" v-model="opened" :opened="true">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-input label="based on" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-input label="part of" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-input label="reason code" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-input label="reason reference" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                   <cornie-input label="note" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                   <cornie-input label="focus" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-input label="encounter" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <div class="block">
                      <label class="flex uppercase mb-2 text-xs font-bold">
                        Repitition
                        <span class="ml-1"><question-icon/></span>
                    </label>
                    <div  class="w-full flex space-x-4 mb-3">
                      <cornie-radio label="Days"  class="text-xs" name="request" id="pickup" />
                      <cornie-radio label="Week"  name="request" id="patientadress" checked/>
                      <cornie-radio label="Month"  name="request" id="homeaddress"/>
                       <cornie-radio label="Years"  name="request" id="homeaddress"/>
                    </div>
                  </div>
                </div>
                  <span class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-sm text-primary
                                py-2
                                mx-auto
                                font-bold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                            Input
                  </span>
                  <div  class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                      <cornie-input label="type" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-input label="value" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  </div>                 
                    <span class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-sm text-primary
                                py-2
                                mx-auto
                                font-bold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                            Output
                  </span>
                  <div  class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                      <cornie-input label="type" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
                  <cornie-input label="value" placeholder="--Enter--" v-model="description">
                    <template v-slot:labelicon>
                        <info-icon class="text-primary fill-current"/>
                    </template>  
                  </cornie-input>
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
      
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IAppointment, {ParticipantDetail}  from "@/types/IAppointment";
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
import InfoIcon from "@/components/icons/info.vue";
import QuestionIcon from "@/components/icons/question.vue";
import SingleDatePicker from "@/components/datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
import DateTimePicker from './components/datetime-picker.vue';

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
    PractitionersFilter,
    SingleDatePicker,
    Availability,
    QuestionIcon,
    CornieRadio,
    Textarea,
    DEdit,
    CDelete,
    DateTimePicker,
    Avatar,
    CAdd,
    AddIcon,
    InfoIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    PatientsFilter,
    DevicesFilter,
    RolesFilter,
  },
})
export default class AddTask extends Vue {
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
  openedM = false;
  showMedicationModal = false;

  data: any = { 
        days: [ ],
        practitioners: [ ],
        breaks: [ ],
        healthcares: [ ],
        devices: [ ],
    }

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
  supportingInfo ="";
  slot = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  basedOn = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  duration = "";
  comments = "";
  patientInstruction = "";
    period = {} as Period;
  participantDetail = {...emptyParticipant}
  
  Practitioners = [];
  Devices = [];
  Patients: any[] = [];
  roles = [];

  newPractitioners =[];
  newDevices = [];
  newPatients =[];
  newRoles = [];

  roleFilter = false;
  deviceFilter = false;
  practitionerFilter = false;
  patientFilter = false;
  availableFilter = false;
  participantitem = "";

  practitioner = [];
  device  = [];
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
    const payload =  {
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
    } as any
    if(this.Devices.length > 0){
      payload.Devices = this.Devices;
    }
    if(this.Patients.length > 0){
      payload.Patients = this.Patients;
    }
    if(this.Practitioners.length > 0){
      payload.Practitioners = this.Practitioners;
    }
    return payload
  }
  get allaction() {
    return this.id ? "Edit" : "New";
  }
  get selectedItem() {
    return this.participantitem;
  }
  async showMedication(){
    this.showMedicationModal = true;
  }
  async addPractitioner(value: any,id:any) {
    //this.practitioner.push({ ...this.practitioners });
    this.newPractitioners = value;
    this.Practitioners = id;
    this.practitionerFilter = false;
  }
  removePractitioner(index: number) {
    this.newPractitioners.splice(index, 1);
  }
  removeRole(index: number){
    this.newRoles.splice(index, 1);
  }
   removeDevice(index: number){
    this.newDevices.splice(index, 1);
  }
  showAvailable() {
    this.availableFilter = true;
  }
  async addPatients(value: any,id:any) {
    this.newPatients = value;
    this.Patients = id;
    this.patientFilter = false;
  }
  async addDevices(value:any, id:any){
     this.newDevices = value;
     this.Devices = id;
    this.deviceFilter = false;
  }
  async addRoles(value: any,id:any){
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
    }else if(this.type == 'Device'){
       this.deviceFilter = true;
    }else if(this.type == 'Practitioner Role'){
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
   // this.payload.period.end = new Date(this.period.end).toISOString();
    this.actor = this.type
    try {
      const response = await cornieClient().post("/api/v1/appointment", this.payload);
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

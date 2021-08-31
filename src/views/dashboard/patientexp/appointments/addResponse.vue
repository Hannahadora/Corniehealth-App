<template>
  <div class="w-full h-full bg-white rounded-md p-5">
    <span class="  flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2">
     Respond
    </span>
    <div>
      <div class="w-full">
        <form class="mt-2 w-full" @submit.prevent="submit">
          <div class="pb-80">
            <div class="w-full border-2 mb-32 grid grid-cols-3 gap-5 p-5 pb-5">
                  <cornie-input
                    label="Appointment"
                    placeholder="--Autoloaded--"
                    v-model="appointmentType"
                  />
                   <single-date-picker
                    label="start date"
                    class="py-2"
                    v-model="setDate.start"
                    :rules="required"
                  />
                  <single-date-picker
                    label="end date"
                      class="py-2"
                    v-model="setDate.end"
                    :rules="required"
                  />
                  <cornie-select
                    v-model="type"
                    label="PARTICIPANT TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    v-model="actor"
                    label="ACTOR"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Cancelled','Confirmed']"
                    v-model="status"
                    label="Status"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input
                    class="required"
                    label="comments"
                    placeholder="--Enter--"
                    v-model="comment"
                  />
            </div> 
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
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IAppointment, {ParticipantDetail}  from "@/types/IAppointment";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import SingleDatePicker from "./datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
import moment from 'moment'

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


actor = "";
  type = "";

status = "";
appointmentId = "";
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
  comment = "";
  patientInstruction = "";
  period = {} as Period;
  participantDetail = {...emptyParticipant}
  Practitioners = [];
  Devices = [];
  Patients = [];
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
    this.setAppointmentResponse();
  }

  async setAppointmentResponse() {
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
    this.comment = appointment.comment;
    this.patientInstruction = appointment.patientInstruction;
    this.period = appointment.period;
    this.Practitioners = appointment.Practitioners;
    this.Devices = appointment.Devices;
    this.Patients = appointment.Patients;
     this.status = appointment.status;
     this.appointmentId = appointment.appointmentId;
    this.participantDetail = appointment.participantDetail;
  }
  get payload() {
    const payload =  {
      status: this.status,
      appointmentId: this.appointmentId,
      comment: this.comment,
    } as any
    return payload
  }
 
  async submit() {
    this.loading = true;
    this.createAppointmentResponse();
    this.loading = false;
  }
  async createAppointmentResponse() {

    this.appointmentId = this.id;
    try {
      const response = await cornieClient().post("/api/v1/appointment/addAppointmentReponse", this.payload);
      if (response.success) {
          window.notify({ msg: "Appointment Response created", status: "success" });
          this.$router.push(`/dashboard/provider/experience/responses/${this.id}`);
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: "Appointment Response not created", status: "error" });
     // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }

 get setDate(){
  const end =   moment(this.period.end).format('DD/MM/YYYY')
      const start =  moment(this.period.start).format('DD/MM/YYYY')
     return{
      start,
       end
       } 
      
  }

  async created() {
   // this.setDate();
    this.setAppointmentResponse();
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

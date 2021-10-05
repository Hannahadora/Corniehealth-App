<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title  class="w-full">
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Update Status</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
              <div class="w-full">
          <div class="container  content-con">
            <div class="w-full py-3">
              <div class="w-full my-6">
                <input-desc-rounded :label="'Current Status'" :info="''">
                  <input  disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Updated By'" :info="''">
                  <input  disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Last Date Updated'" :info="''">
                  <input  disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <cornie-select :label="'New Status'" :items="['Active', 'Inactive']" style="width: 100%" />
            </div>
          </div>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
          Update Status
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from '@/components/cornieradio.vue'
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from '@/components/icons/info.vue'
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/daterangepicker.vue";
import { string } from "yup";
import IRequest, { Medications,MedicationDetails } from "@/types/IRequest";
 import Slider from '@vueform/slider';
 import { IPatient } from "@/types/IPatient";
import Period from "@/types/IPeriod";
import '@vueform/slider/themes/default.css';
import DateTimePicker from './components/datetime-picker.vue'
import { namespace } from 'vuex-class'
import IPractitioner from "@/types/IPractitioner";
import InputDescRounded from "./components/input-desc-rounded.vue"
const userStore = namespace("user");

const request = namespace('request')
const dropdown = namespace("dropdown");
const patients = namespace("patients");

const emptyMedicationDetails: Medications = {
    medicationDetails:{
        medicationCode: "",
    medicationReference: "",
    courseOfTherapyType: "",
    dosageInstruction: "",
    initialFill: "",
    quantity: 0,
    duration: {} as Period,
    },
    refillInfo:{},
    substitutionAllowed:{},
    
}

const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  medications: [],


};


@Options({
  name: "requestDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    CDelete,
    RangeSlider,
    UpdateIcon,
    DeleteorangeIcon,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    DateTimePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    Slider,
    MainCornieSelect
  },
})
export default class Medication extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  // @Prop({ type: Object, required: false, default: { ...emptyRequest} })
  // request!: IRequest;
  
  requestModel = {} as IRequest;

  @request.Action
  getRequestById!: (id: string) => IRequest;

  // @Watch("request")
  // requestUpdated(request: IRequest) {
  //   this.requestModel = JSON.parse(JSON.stringify({ ...request }));
  // }

  @patients.State
  patients!: IPatient[];


  @patients.Action
  fetchPatients!: () => Promise<void>;

   @userStore.Getter
  authPractitioner!: IPractitioner;

  @request.Mutation
  updatedRequests!: any;

 checked = false;
  checked2 = false;
  checked3 = false;
  step=1;
 width_percent= 33.33;
  width= 33.33;

  loading = false;
  expand = false;
  isVisible = "";
  startdate = "";
  enddate = "";
  selected=1;
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  openedM = false;
  showMedicationModal = false;
 


  patient=[];
  practitioner=[];

dispenser="";
subject="";
requester="";
performer="";


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


@Watch('id')
  idChanged() {
    this.setRequest()
  }

  get PatientName() {
            const id = this.$route.params.id;
            const pt = this.patients.find((i: any) => i.id === id);
           return {
             ...pt
           }
        }

 select(i:number) {
      this.selected = i;
    }
 async  next() {
      this.step = this.step + 1;
      this.width += this.width_percent;
    }

   async  back() {
      this.step >= 0 && (this.step -= 1);
      this.width -= this.width_percent;
    }



 
    medicationsDetail = {...emptyMedicationDetails}; 
    medicationsDetails: Medications[] = [];
 
    addMedicationDetails(){
      this.medicationsDetails.push({...this.medicationsDetail});
      this.back();
    }
    removemedication(index:number){
         this.medicationsDetails.splice(index, 1);
    }
  async setRequestModel() {
     this.requestModel = JSON.parse(JSON.stringify({ ...emptyRequest}));
  }
  async setRequest() {
    const request = await this.getRequestById(this.id)
    if (!request) return
    this.requestModel =  (request) ;
    this.requestModel.medications = request.medications;
  }
 get newaction() {
    return this.id ? 'Update' : 'Create New'
  }
  get payload() {
    //  const model = JSON.parse(JSON.stringify({ ...this.requestModel }));
    // return model;
    return{
        requestInfo: this.requestModel.requestInfo,
        requestDetails: this.requestModel.requestDetails,
        subject: this.requestModel.subject,
        performer: this.requestModel.performer,
        medicationAdministration: this.requestModel.medicationAdministration,
        fufillment: this.requestModel.fufillment,
        history: this.requestModel.history,
        medications: this.requestModel.medications,
    }

  }
  get allaction() {
    return this.id ? "Edit" : "New";
  }
get allPerformer() {
     if (!this.practitioner || this.practitioner.length === 0) return [ ];
     return this.practitioner.map((i: any) => {
         return {
             code: i.id,
             display: i.firstName +' '+ i.lastName,
         }
     })
 }
 get allRequester() {
     if (!this.patient || this.patient.length === 0) return [ ];
     return this.patient.map((i: any) => {
         return {
             code: i.id,
             display: i.firstname +' '+ i.lastname,
         }
     })
 }
  async showMedication(value:any){
    this.requestModel.medications = value;
    this.showMedicationModal = true;
  }
 done() {
    this.$emit("allergy-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
      if (this.id) await this.updateRequest()
    else await this.createRequest()
    this.loading = false;
  }
  async createRequest() {
    //const period = this.period;
    const practitionerfullname = this.authPractitioner.firstName +' '+ this.authPractitioner.lastName
    const patientfullname = this.PatientName.firstname +' '+ this.PatientName.lastname;

    const practitionerfullnameid = this.authPractitioner.id;
    const patientfullnameid = this.PatientName.id;

    this.payload.requestDetails.recorder = practitionerfullnameid;
     this.payload.requestDetails.requester = patientfullnameid;
     this.payload.subject.subject = patientfullnameid;
     this.payload.performer.dispenser = practitionerfullnameid;
     this.payload.medicationAdministration.performer = practitionerfullnameid;
     this.payload.medications = this.medicationsDetails;
    try {
      const response = await cornieClient().post("/api/v1/requests", this.payload);
      if (response.success) {
          this.updatedRequests([response.data]);
          window.notify({ msg: "Request Created", status: "success" });
       this.done();
      }
    } catch (error) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updateRequest() {
     const id = this.id;
    const url = `/api/v1/requests/${id}`;
    const payload = this.payload ;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
          this.updatedRequests([response.data]);
        window.notify({ msg: "Request Updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async fetchAllPatients() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
 async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }

  async created() {
    this.setRequest();
    this.setRequestModel();
    this.fetchPatients();
    this.fetchAllPatients();
    this.fetchPractitioner();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
  }
}
</script>

<style>

.slider-connect {
    background: #fe4d3c;
    cursor: pointer;
}

.slider-tooltip {
    position: absolute;
    display: block;
    font-size: var(--slider-tooltip-font-size, .875rem);
    line-height: var(--slider-tooltip-line-height, 1.25rem);
    font-weight: var(--slider-tooltip-font-weight, 600);
    white-space: nowrap;
    padding: var(--slider-tooltip-py, 2px) var(--slider-tooltip-px, 6px);
    min-width: var(--slider-tooltip-min-width, 20px);
    text-align: center;
    color: var(--slider-tooltip-color, #fff);
    border-radius: var(--slider-tooltip-radius, 5px);
    border: 1px solid #fe4d3c;
    background: #fe4d3c;
}
.bg-gray {
    background-color: #F6F8F9;
}
.icon-wrap {
   content:counter(step);
  counter-increment: step;
    background: #fff;
    border-radius: 50%;
        top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
   left: -54em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap2 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: -7.5em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap3 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: -1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 52em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap4 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 42em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
 .icon-check-mark{
    top: 1.3em;
    z-index: 1;
    left: 5em;
    right: 0;
    position: absolute;
}
.icon-check-mark2{
       top: 1.3em;
    z-index: 1;
    left: 23em;
    right: 0;
    position: absolute;
}
.icon-check-mark3{
      top: 1.3em;
    z-index: 1;
    left: 45.5em;
    right: 0;
    position: absolute;
}
.bg-danger-100{
    background-color: #FE4D3C;
}
</style>

<template>
   <big-dialog
    v-model="show"
    title="Identifier" 
    :id="newhistoryId"
    :horizontal="false"
  >
  
      <div class="w-full">
          <div class="float-left">
                <img
                    class="mr-2"
                    v-if="orgInfo.image"
                    :src="orgInfo.image"
                    />
                <avatar class="mr-2" v-else :src="localSrc" />
          </div>
          <div class="block float-right">
             <p class="text-sm">{{orgInfo.name}}</p>
             <p class="text-sm" v-if="orgInfo.address">{{orgInfo.address}}</p>
               <p class="text-sm" v-else>N/A</p>
             <p class="text-sm" v-if="orgInfo.phone">{{orgInfo.phone}}</p>
               <p class="text-sm" v-else>N/A</p>
              <p class="text-sm" v-if="orgInfo.email">{{orgInfo.email}}</p>
                <p class="text-sm" v-else>N/A</p>
          </div>
      </div>
    

      <div class="w-full mt-32 border-dashed border-gray-300 pb-6 border-b-2">
          <p class="font-bold text-black">Medical History</p>
          <div class="grid grid-cols-2 gap-4">
              <div class="mt-4">
                  <div  class="mb-2">
                    <p>Status</p>
                    <span class="text-danger text-xs">Active</span>
                  </div>
                   <div  class="mb-2">
                        <p>Date</p>
                        <span class="text-gray-400 text-xs">06/09/2021</span>
                   </div>
                    <div  class="mb-2">
                        <p>Last Review Date</p>
                        <span class="text-gray-400 text-xs">06/09/2021</span>
                   </div>
              </div>
              <div class="mt-4">
                   <div  class="mb-2">
                        <p>Publisher</p>
                        <span class="text-gray-400 text-xs">Femi Usman</span>
                   </div>
                    <div  class="mb-2">
                        <p>Contact</p>
                        <span class="text-gray-400 text-xs">08190345678</span>
                   </div>
                    <div  class="mb-2">
                        <p>Approval Date</p>
                        <span class="text-gray-400 text-xs">06/09/2021</span>
                   </div>
              </div>

          </div>
      </div>
      <div>
           <accordion-component title="1. Thyroid/Parathyroid(Glandular System)" :opened="true">
              <template v-slot:default>
                <div class="mt-5">
                    <p class="text-black font-semibold text-sm mb-5">1.1    Is it easy to put on weight and hard to lose it?</p>
                     <select-option label="Yes" class="mb-2"/>
                     <select-option label="Maybe" class="mb-2"/>
                     <select-option label="No"/>
                </div>
                <div class="mt-5">
                    <p class="text-black font-semibold text-sm mb-5">1.2    Do you get cold hands and feet?</p>
                     <cornie-radio label="No" class="mb-3" name="question"/>
                     <cornie-radio label="Yes" class="mt-4" name="question"/>
                     
                </div>
                <div class="mt-5">
                    <p class="text-black font-semibold text-sm mb-5">1.3    Are your fingernails ridged, brittle or weak?</p>
                     <select-option label="Ridged" class="mb-2"/>
                     <select-option label="Weak" class="mb-2"/>
                     <select-option label="Brittle" class="mb-2"/>
                     <select-option label="None of the above" class="mb-2"/>
                </div>
                <div class="mt-5 pb-4">
                    <cornie-textarea label="General comments" class="w-full" placeholder="Start typing..."/>
                </div>
                <div class="border-b-2 border-gray-100"></div>
                <div class="mt-5">
                    <p class="text-black font-semibold text-sm mb-5">2. Do you get cramping in your muscles?</p>
                     <cornie-radio label="No" class="mb-3" name="question"/>
                     <cornie-radio label="Yes" class="mt-4" name="question"/>
                     
                </div>
                <div class="mt-5">
                    <p class="text-black font-semibold text-sm mb-5">3. How can we help with your medical questions?</p>
                        <p class="text-sm">
                            All your health deatails are strickly confidential, feel free to give us answers that will help us secure your health safety. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </p>
                </div>
              </template>
          </accordion-component>
      </div>

 
    <template #actions>
           <span class="flex justify-end w-full">
      <cornie-btn
        @click="show = false"
        class="border-primary border-2  mr-3  pl-8 pr-8 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
              <cornie-btn
                :loading="loading"
                type="submit"
                class="bg-danger rounded-full font-semibold text-white border-2 pl-8 pr-8 px-3 py-2 mr-3"
              >
                Submit
              </cornie-btn>
           </span>
    </template>
 
  </big-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import Avatar from "@/components/avatar.vue";
import CornieNuminput from "@/components/cornienuminput.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from '@/components/cornieradio.vue'
import BigDialog from "@/components/formdialog.vue";
import InfoIcon from '@/components/icons/info.vue'
import CornieInput from "@/components/cornieinput.vue";
import CornieTextarea from "@/components/textarea.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import IconInput from "@/components/IconInput.vue";
import AccordionComponent from "@/components/form-accordion.vue";
//import CornieDatePicker from "./components/datepicker.vue";
import CornieDateRangePicker from "@/components/daterangepicker.vue";
import SearchIcon from "@/components/icons/search.vue";
import SelectOption from "@/components/custom-checkbox.vue";
//import DatePicker from "./components/datetime-picker.vue";
import { string } from "yup";
import Measurable from "@/components/measurable.vue";
//import EncounterSelect from "./encounter-select.vue";
import IOtherrequest from "@/types/IOtherrequest";
  import { IPatient } from "@/types/IPatient";
//import DateTimePicker from './components/datetime-picker.vue'
import { namespace } from 'vuex-class'
import IPractitioner from "@/types/IPractitioner";
import FhirInput from "@/components/fhir-input.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import ShareIcon from "@/components/icons/share.vue";
import CheckinIcon from "@/components/icons/newcheckin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CheckoutIcon from "@/components/icons/newcheckout.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import CalenderIcon from "@/components/icons/newcalender.vue";
import SendIcon from "@/components/icons/send.vue";


const patients = namespace("patients");
const userStore = namespace("user");
const otherrequest = namespace('otherrequest')
const dropdown = namespace("dropdown");
const OrgStore = namespace("OrgStore");

const measurable = {
  unit: "",
  min: 0,
  max: 0,
  string: "",
};
const emptyOtherrequest: IOtherrequest = {
  basicInfo: {},
  requestInfo: {},
  subject: {},
  performer: {},
  forms: {},
  request: {
    range: [20,50]
  },
};


@Options({
  name: "viewRequest",
  components: {
    ...CornieCard,
    CornieIconBtn,
     CancelIcon,
    CalenderIcon,
    CheckinIcon,
    NewviewIcon,
    CornieTextarea,
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    DangerIcon,
    PlusIcon,
    SelectOption,
    SendIcon,
    SearchIcon,
    MessageIcon,
    CheckoutIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    NoteIcon,
    FhirInput,
    ArrowLeftIcon,
   // EncounterSelect,
    Avatar,
   // DatePicker,
    CDelete,
    RangeSlider,
    DEdit,
    Measurable,
    InfoIcon,
    //CornieDatePicker,
    CornieDateRangePicker,
    BigDialog,
    CornieNuminput,
 //   DateTimePicker,
    AccordionComponent,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect
  },
})
export default class ViewReferral extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;
  
  @Prop({ type: Object, required: false, default: { ...emptyOtherrequest} })
  otherrequest!: IOtherrequest;

  otherrequestModel = {} as IOtherrequest;

  @otherrequest.Action
  getOtherrequestById!: (id: string) => IOtherrequest;

 @patients.State
  patients!: IPatient[];

  @userStore.Getter
  authPractitioner!: IPractitioner;

    @patients.Action
    fetchPatients!: () => Promise<void>;

  @Watch("otherrequest")
  requestUpdated(request: IOtherrequest) {
    this.otherrequestModel = JSON.parse(JSON.stringify({ ...otherrequest }));
  }
  @otherrequest.Mutation
  updatedOtherrequests!: any;

  localSrc = require('../../../../assets/img/placeholder.png');
range="";
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
practiceform=[];
location=[];
dispenser="";
subject="";
requester="";
performer="";
orgInfo=[];

agemesurable = { ...measurable };

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
   async fetchOrgInfo() {
      try {
        const response = await cornieClient().get(
          "/api/v1/organization/myOrg/get"
        );
        this.orgInfo = response.data || {};
      } catch (error) {
        window.notify({ msg: "Could not fetch organization", status: "error" });
      }
    }
get age() {
    return {
    age: this.range,
    };
  }
   get patientId() {
    return this.$route.params.id;
  }
  get PatientName() {
         var id = this.$route.params.id;
        const pt = this.patients.find((i: any) => i.id === id);
        return {
            ...pt
        }
    }
async setRequestModel() {
     this.otherrequestModel = JSON.parse(JSON.stringify({ ...this.otherrequest }));
  }
  get payload() {
    return{
      basicInfo: this.otherrequestModel.basicInfo,
       requestInfo: this.otherrequestModel.requestInfo,
        subject: this.otherrequestModel.subject, 
        performer: this.otherrequestModel.performer,
         forms: this.otherrequestModel.forms,
          request: this.otherrequestModel.request,
     
    }
  }
get format() {
        return `${this.otherrequestModel.request.range}`
  }

  get isUpdate() {
    return Boolean(this.id);
  }
 select(i:number) {
      this.selected = i;
    }
    


    get newaction() {
    return this.id ? 'Update' : 'Save'
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

 done() {
    this.$emit("allergy-added");
    this.show = false;
  }
    async setRequest() {
    const otherrequest = await this.getOtherrequestById(this.id)
    if (!otherrequest) return
    this.otherrequestModel =  ({...otherrequest}) ;
  }

 get allForms(){
    if (!this.practiceform || this.practiceform.length === 0) return [ ];
     return this.practiceform.map((i: any) => {
         return {
             code: i.id,
             display: i.formTitle,
         }
     })
 }
 get allLocation() {
     if (!this.location || this.location.length === 0) return [ ];
     return this.location.map((i: any) => {
         return {
             code: i.id,
             display: i.name,
         }
     })
 }

  async apply() {
    this.loading = true;
       if (this.id) await this.updateOtherrequest()
    else await this.createOtherrequest()
    this.loading = false;
  }
 async createOtherrequest() {
   // this.payload.request.occurenceDate = new Date(this.payload.request.occurenceDate).toISOString();
     const practitionerfullnameid = this.authPractitioner.id;
    const patientfullnameid = this.PatientName.id;


   this.payload.requestInfo.requester = practitionerfullnameid;
  this.payload.subject.subject = practitionerfullnameid;
  this.payload.performer.performer = practitionerfullnameid;
  
  if(this.allLocation.length === 0) this.payload.performer.location = practitionerfullnameid;
  
   try {
      const response = await cornieClient().post("/api/v1/other-requests", this.payload);
      if (response.success) {
          this.updatedOtherrequests([response.data]);
          window.notify({ msg: "Request Created", status: "success" });
        this.done();
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: "Request not Created", status: "error" });
    }
  }
  async updateOtherrequest() {
     const id = this.id;
    const url = `/api/v1/other-requests/${id}`;
    const payload = this.payload ;
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
          this.updatedOtherrequests([response.data]);
        window.notify({ msg: "Request Updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Request not Updated", status: "error" });
    }
  }


  async fetchLocation() {
    const AllLocation = cornieClient().get("/api/v1/location/myOrg/getMyOrgLocations");
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
  }
  async fetchPracticeForms() {
    const AllForms = cornieClient().get("/api/v1/practice-form");
    const response = await Promise.all([AllForms]);
    this.practiceform = response[0].data;
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
      this.fetchOrgInfo();
    this.setRequest();
    this.setRequestModel();
    this.fetchLocation();
    this.fetchPracticeForms();
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

</style>

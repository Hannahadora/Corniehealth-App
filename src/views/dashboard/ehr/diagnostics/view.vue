<template>
   <big-dialog
    v-model="show"
    title="Identifier" 
    class=""
       :id="newhistoryId"
    :horizontal="true"
  >
   <div class="w-full">
      <span class="w-full">
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
      </span>
    
      <div class="w-full grid grid-cols-2 gap-4 border-dashed border-b-2 pb-5">
          <div class="mt-10  float-left">
              <p class="text-black text-lg font-bold">Patient Information</p>
             <div class="w-12 h-12 mt-4">
             <avatar
                    class="mr-2"
                    v-if="PatientName.profilePhoto"
                    :src="PatientName.profilePhoto"
                    />
                <avatar class="mr-2" v-else :src="localSrc" />
             </div>
             <div class="mt-5">
                <p class="text-sm font-bold mb-2">{{PatientName.firstname +' '+ PatientName.lastname}}</p>
                <p class="text-xs text-gray-400 mb-2">MRN - {{PatientName.mrn}}</p>
                <p class="text-xs mb-2">{{PatientName.contactInfo[0].primaryAddress}} </p>
                <p class="text-xs mb-2"> {{PatientName.contactInfo[0].phone.dialCode +' '+ PatientName.contactInfo[0].phone.number}}</p>
                <p class="text-xs mb-2"> {{PatientName.contactInfo[0].email}}</p>
             </div>
          </div>
          <div class="mt-10 float-right">
                <p class="text-black text-lg font-bold">Dispenser & Performer</p> 
                <span class="text-red-500 text-xs">Dispensed By</span>
                <p class="text-md">{{authPractitioner.firstName}} {{authPractitioner.lastName}}</p>
                <span class="text-gray-400 text-xs">{{authPractitioner.address}}</span>
                <span class="text-gray-400 text-xs">{{authPractitioner.phone.number}} {{authPractitioner.phone.dialCode}} | {{authPractitioner.email}}</span>

                <p class="text-red-500 text-xs mt-5">Performed By</p>
                <p class="text-md">{{authPractitioner.firstName}} {{authPractitioner.lastName}}</p>
                <span class="text-gray-400 text-xs">{{authPractitioner.address}}</span>
                <span class="text-gray-400 text-xs">{{authPractitioner.phone.number}} {{authPractitioner.phone.dialCode}} | {{authPractitioner.email}}</span>
          </div>  
      </div>

      <div class="w-full">
          <div class="w-full flex space-x-4 mt-5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z" fill="#667499"/>
            </svg>
            <p class="text-red-500 text-sm font-bold">Basic Info</p>
          </div>
          <div class="w-full grid grid-cols-4 gap-8 mt-4">
              <div>
                  <span class="text-xs text-gray-400 font-medium">Activity Definition</span>
                  <p class="text-xs">{{otherrequestModel.basicInfo.activityDefinition}}</p>
              </div>
              <div>
                  <span class="text-xs text-gray-400 font-medium">Based On</span>
                  <p class="text-xs">{{otherrequestModel.basicInfo.basedOn}}</p>
              </div>
              <div>
                  <span class="text-xs text-gray-400 font-medium">Replaces</span>
                  <p class="text-xs">{{otherrequestModel.basicInfo.replaces}}</p>
              </div>
              <div>
                  <span class="text-xs text-gray-400 font-medium">Intent</span>
                  <p class="text-xs">{{otherrequestModel.basicInfo.intent}}</p>
              </div>
              <div>
                  <span class="text-xs text-gray-400 font-medium">Category</span>
                  <p class="text-xs">{{otherrequestModel.basicInfo.category}}</p>
              </div>
              <div>
                  <span class="text-xs text-gray-400 font-medium">Priority</span>
                  <p class="text-xs">{{otherrequestModel.basicInfo.priority}}</p>
              </div>
              <div>
                  <span class="text-xs text-gray-400 font-medium">Do Not Perform</span>
                  <p class="text-xs">{{otherrequestModel.basicInfo.doNotPerform}}</p>
              </div>
              

          </div>
      </div>
       <div class="w-full">
          <div class="w-full flex space-x-4 mt-5">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="white"/>
            <path d="M14 6L20 12M20 12L14 18M20 12H4" stroke="#080056" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-red-500 text-sm font-bold">Request Info</p>
          </div>
          <div class="w-full grid grid-cols-4 gap-8 mt-4">
              <div>
                  <span class="text-xs text-gray-400 font-medium">Request Code</span>
                  <p class="text-xs">{{otherrequestModel.request.requestCode}}</p>
              </div>
                <div>
                  <span class="text-xs text-gray-400 font-medium">Order Detail</span>
                  <p class="text-xs">{{otherrequestModel.request.orderDetail}}</p>
              </div>
                <div>
                  <span class="text-xs text-gray-400 font-medium">Precondition</span>
                  <p class="text-xs">{{otherrequestModel.request.preCondition}}</p>
              </div>
                <div>
                  <span class="text-xs text-gray-400 font-medium">Precondtion Code</span>
                  <p class="text-xs">{{otherrequestModel.request.preconditionCode}}</p>
              </div>
                <div>
                  <span class="text-xs text-gray-400 font-medium">Reason Code</span>
                  <p class="text-xs">{{otherrequestModel.request.reasonCode}}</p>
              </div>
                <div>
                  <span class="text-xs text-gray-400 font-medium">Request Reference</span>
                  <p class="text-xs">{{otherrequestModel.request.requestReference}}</p>
              </div>
                <div>
                  <span class="text-xs text-gray-400 font-medium">Supporting Info</span>
                  <p class="text-xs">{{otherrequestModel.request.supportingInfo}}</p>
              </div>
                <div>
                  <span class="text-xs text-gray-400 font-medium">Specimen</span>
                  <p class="text-xs">{{otherrequestModel.request.specimen}}</p>
                </div>
                 <div>
                  <span class="text-xs text-gray-400 font-medium">Body Size</span>
                  <p class="text-xs">{{otherrequestModel.request.bodySite}}</p>
                </div>
                 <div>
                  <span class="text-xs text-gray-400 font-medium">Quantity</span>
                  <p class="text-xs">{{otherrequestModel.request.quantity}}</p>
                </div>
                 <div>
                  <span class="text-xs text-gray-400 font-medium">Occurence Time</span>
                  <p class="text-xs">{{otherrequestModel.request.occurenceTiming}}</p>
                </div>
                 <!-- <div>
                  <span class="text-xs text-gray-400 font-medium">Period</span>
                  <p class="text-xs">{{
                       otherrequestModel.request.occurencePeriod.end
                      
                      }}

                     
                  </p>
                </div> -->
           
              

          </div>
      </div>
   </div>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
    </template>
    <template #menuactions>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
             >
            <new-view-icon class="text-blue-300 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            @click="showHistory()"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-purple-700 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            @click="showNewStatus"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
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
import BigDialog from "@/components/bigdialog.vue";
import InfoIcon from '@/components/icons/info.vue'
import CornieInput from "@/components/cornieinput.vue";
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
import CornieDatePicker from "./components/datepicker.vue";
import CornieDateRangePicker from "@/components/daterangepicker.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "./components/datetime-picker.vue";
import { string } from "yup";
import Measurable from "@/components/measurable.vue";
import EncounterSelect from "./encounter-select.vue";
import IOtherrequest from "@/types/IOtherrequest";
  import { IPatient } from "@/types/IPatient";
import DateTimePicker from './components/datetime-picker.vue'
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
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    DangerIcon,
    PlusIcon,
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
    EncounterSelect,
    Avatar,
    DatePicker,
    CDelete,
    RangeSlider,
    DEdit,
    Measurable,
    InfoIcon,
    CornieDatePicker,
    CornieDateRangePicker,
    BigDialog,
    CornieNuminput,
    DateTimePicker,
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
    const AllForms = cornieClient().get("/api/v1/practice-form/surveys");
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

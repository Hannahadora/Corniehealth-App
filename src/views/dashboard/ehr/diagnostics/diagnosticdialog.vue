<template>
  <cornie-dialog v-model="show" right class="h-full"  style="width:70.6667%">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title  class="w-full">
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
         <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">{{allaction}} Request</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
        <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Basic Info" v-model="opened" :opened="false">
              <template v-slot:default>
                <div class="w-full grid grid-cols-2 gap-2 mt-5 pb-5">
                   <cornie-select
                   class="w-full"
                    :items="dropdowns.serviceCategory"
                    v-model="otherrequestModel.basicInfo.activityDefinition"
                    label="activity definition"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full"
                    :items="dropdowns.serviceType"
                    v-model="otherrequestModel.basicInfo.basedOn"
                    label="based on"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full"
                    :items="dropdowns.specialty"
                     v-model="otherrequestModel.basicInfo.replaces"
                    label="replaces"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/request-intent"
                     class="w-full"
                    v-model="otherrequestModel.basicInfo.intent"
                    label="Intent"
                    placeholder="--Select--"
                />
                   <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/servicerequest-category"
                     class="required w-full"
                     v-model="otherrequestModel.basicInfo.category"
                    label="category"
                    placeholder="--Select--"
                />
                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/request-priority"
                     class="required w-full"
                     v-model="otherrequestModel.basicInfo.priority"
                    label="priority"
                    placeholder="--Select--"
                />
                  <cornie-select
                     class="required w-full"
                    :rules="required"
                    :items="['True','False']"
                     v-model="otherrequestModel.basicInfo.doNotPerform"
                    label="do not perform"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
        </accordion-component>
        <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Request Info" expand="true" v-model="opened" :opened="false">
            <div class="grid grid-cols-2 gap-2 mt-5">
                 <!-- <cornie-select
                  class="required"
                  :rules="required"
                  :items="allRequester"
                  v-model="otherrequestModel.requestInfo.requester"
                  label="requester"
                >
                </cornie-select> -->
                 <div class="w-full">
                    <label class="flex uppercase mb-1  text-black text-xs font-bold">requester</label>
                    <input-desc-rounded :info="''">
                      <input :value="PatientName.firstname +' '+ PatientName.lastname" disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                    </input-desc-rounded>
                </div>
                <encounter-select
                  class="required w-full"
                  :rules="required"
                    v-model="otherrequestModel.requestInfo.encounter"
                  label="encounter"
                  placeholder="--Select--"
                >
                </encounter-select>
                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/procedure-code"
                     class="required w-full"
                     v-model="otherrequestModel.request.requestCode"
                  label="Request code"
                  placeholder="--Select--"
                />
                <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/servicerequest-orderdetail"
                     v-model="otherrequestModel.request.orderDetail"
                  label="order detail"
                    class="w-full"
                  placeholder="--Select--"
                />
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.preCondition"
                  label="precondition?"
                  placeholder="--Select--"
                   class="w-full"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.preconditionCode"
                  label="precondition code"
                  placeholder="--Select--"
                   class="w-full"
                >
                </cornie-select>
               <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/procedure-reason"
                     class="required w-full"
                    v-model="otherrequestModel.request.reasonCode"
                  label="reason code"
                  placeholder="--Select--"
                />
                   <div class="w-full cursor-pointer">
                <label class="flex normal-case mb-0  text-black text-sm font-bold">Request Reference</label>
                    <input-desc-rounded  class="cursor-pointer">
                          <input type="text"  disabled  :value="otherrequestModel.request.requestReference" placeholder="Select" class="required cursor-pointer p-2 border w-100 w-full" style="border-radius: 8px">
                          <span>
                           <plus-icon class="aadd text-danger fill-current cursor-pointer"  @click="showRef"/>
                          </span>
                  </input-desc-rounded>         
                 <!-- <cornie-input   :rules="required" label="Reason Reference"  :value="reasonReference" v-model="reasonReference"  class="cursor-pointer w-full" />  -->
              </div>
                <!-- <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.requestReference"
                  label="request reference"
                  placeholder="--Select--"
                >
                </cornie-select> -->
                <cornie-input label="supporting info"  class="w-full"   v-model="otherrequestModel.request.supportingInfo" placeholder="--Enter--" />
                <cornie-select
                  :items="dropdowns.serviceType"
                   v-model="otherrequestModel.request.specimen"
                  label="specimen"
                   class="w-full"
                  placeholder="--Select--"
                >
                </cornie-select>
                <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/body-site"
                     class="required w-full"
                     v-model="otherrequestModel.request.bodySite"
                  label="body site"
                  placeholder="--Select--"
                />
                <cornie-numinput
                  label="quantity"
                  type="number"
                   class="w-full"
                  v-model="otherrequestModel.request.quantity"
                  placeholder="--Enter--"
                />
            </div>
                <measurable label="Heading" v-model="otherrequestModel.request.range" />
              <div class="grid grid-cols-2 gap-2 mt-5">

                   <cornie-input  class="w-full" label="ratio (1st value)"   v-model="otherrequestModel.request.ratio" placeholder="Enter" />
                  <cornie-input  class="w-full" label="ratio (2nd value)"   v-model="ratio" placeholder="Enter" />
                <cornie-date-picker  v-model="otherrequestModel.request.occurenceDate" class="w-full -mt-3" label="occurence DATE" />
                <cornie-date-range-picker  v-model="otherrequestModel.request.occurencePeriod" class="w-full" label="occurence Period" />
                <div class="w-full">
                    <label for="" class="w-full">
                        <span class="uppercase font-bold text-xs">occurence timing</span>
                        <div class="w-full mx-auto">
                            <input type="time" v-model="otherrequestModel.request.occurenceTiming" class="w-full border rounded-lg p-2 w-95" id="appt" required>
                        </div>
                    </label>
                </div>
                
                <cornie-input
                 class="w-full"
                  label="patient instructions"
                  placeholder="--Enter--"
                  v-model="otherrequestModel.request.patientInstructions"
                />
            </div>
                <Textarea  class="w-full" label="note" placeholder="--Enter--"   v-model="otherrequestModel.request.note"/>
            
        </accordion-component>
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Participants" expand="true" v-model="opened" :opened="false">
                <p class="text-gray-600 text-xs mt-5 mb-5 pb-3 italic border-b-2 border-dashed">Patient</p>
            <div class="w-full grid grid-cols-2 gap-2 mt-5 pb-5">
                   <div class="w-full">
                    <label class="flex uppercase mb-1  text-black text-xs font-bold">subject</label>
                    <input-desc-rounded :info="''">
                      <input :value="PatientName.firstname +' '+ PatientName.lastname" disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                    </input-desc-rounded>
                </div>
                   <cornie-select
                     v-if="PatientName.insurances.length === 0"
                class="required w-full"
                :rules="required"
                :items="['No Payment option for this patient']"
                  v-model="otherrequestModel.subject.paymentOption"
                label="payment option"
                placeholder="--Select--"
                >
                </cornie-select>
                 <cornie-select
                v-else
                class="required w-full"
                :rules="required"
                :items="PatientName.insurances"
                v-model="otherrequestModel.subject.paymentOption"
                label="payment option"
                placeholder="--Select--"
                >
                </cornie-select>
             
            </div>
                <p class="text-gray-600 text-xs  pb-3 italic border-b-2 border-dashed">Requester</p>
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                     <!-- <cornie-select
                  class="required"
                  :rules="required"
                  :items="allRequester"
                  v-model="otherrequestModel.requestInfo.requester"
                  label="requester"
                >
                </cornie-select> -->
                  <div class="w-full">
                    <label class="flex uppercase mb-1  text-black text-xs font-bold">requester</label>
                    <input-desc-rounded :info="''">
                      <input :value="PatientName.firstname +' '+ PatientName.lastname" disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                    </input-desc-rounded>
                </div>
            </div>
                <p class="text-gray-600 text-xs pb-3 italic border-b-2 border-dashed">Performer</p>
                <div  class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                          <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/participant-role"
                     class="required w-full"
                    v-model="otherrequestModel.performer.performerType"
                  label="performer type"
                  placeholder="--Select--"
                />
                <!-- <cornie-select
                  class="required"
                  :rules="required"
                  :items="allPerformer"
                  v-model="otherrequestModel.performer.performer"
                  label="performer"
                  placeholder="--Select--"
                >
                </cornie-select> -->
                 <div class="w-full">
                    <label class="flex uppercase mb-1  text-black text-xs font-bold">performer</label>
                    <input-desc-rounded  :info="''">
                      <input :value="authPractitioner.firstName +' '+ authPractitioner.lastName" disabled type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                    </input-desc-rounded>
                  </div>
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="dropdowns.serviceType"
                   v-model="otherrequestModel.performer.locationCode"
                  label="location code"
                  placeholder="--Select--"
                >
                </cornie-select>
                    <cornie-select
                    v-if="allLocation.length === 0"
                  class="required w-full"
                  :rules="required"
                    :items="['No Location Available']"
                    v-model="otherrequestModel.performer.location"
                  label="location"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                v-else
                  class="required w-full"
                  :rules="required"
                    :items="allLocation"
                    v-model="otherrequestModel.performer.location"
                  label="location"
                  placeholder="--Select--"
                >
                </cornie-select>
             
                </div>
        </accordion-component>
            <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Link Forms" expand="true" v-model="opened" :opened="false">
                <div class="w-full grid grid-cols-2 gap-2 mt-5 pb-5">
                        <cornie-select
                        v-if="allForms.length === 0 "
                        :items="['No Practice Form Available']"
                        v-model="otherrequestModel.forms.linkForms"
                        label="Link Forms"
                          class="w-full"
                        placeholder="--Select--"
                        >
                        </cornie-select>
                        <cornie-select
                        v-else
                        :items="allForms"
                        v-model="otherrequestModel.forms.linkForms"
                        label="Link Forms"
                          class="w-full"
                        placeholder="--Select--"
                        >
                        </cornie-select>
                </div>
            </accordion-component>
        
        </v-form>
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
            {{newaction}} 
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
      <reference-modal
          :conditions="patientConditions"
          :allergy="allergy"
          @show:modal="showRef"
          v-model="showRefModal"
        />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieNuminput from "@/components/cornienuminput.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from '@/components/cornieradio.vue'
import CornieDialog from "@/components/CornieDialog.vue";
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
import ReferenceModal from "@/views/dashboard/ehr/refferal/reasonref.vue";
import Measurable from "@/components/measurable.vue";
import IOtherrequest from "@/types/IOtherrequest";
import { IPatient } from "@/types/IPatient";
import DateTimePicker from './components/datetime-picker.vue'
import { namespace } from 'vuex-class'
import IPractitioner from "@/types/IPractitioner";
import EncounterSelect from "./encounter-select.vue";
import FhirInput from "@/components/fhir-input.vue";
import { ICondition } from "@/types/ICondition";
import plusIcon from "@/components/icons/plus.vue";


const condition = namespace("condition");
const patients = namespace("patients");
const userStore = namespace("user");
const otherrequest = namespace('otherrequest')
const dropdown = namespace("dropdown");

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
  name: "requestDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    plusIcon,
    ArrowLeftIcon,
    Measurable,
    DatePicker,
    CDelete,
    RangeSlider,
    ReferenceModal,
    DEdit,
    CancelIcon,
    InfoIcon,
    EncounterSelect,
    FhirInput,
    CornieDatePicker,
    CornieDateRangePicker,
    CornieDialog,
    CornieNuminput,
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
    MainCornieSelect
  },
})
export default class Medication extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;
  
  @Prop({ type: Object, required: false, default: { ...emptyOtherrequest} })
  patientrequests!: IOtherrequest;

  otherrequestModel = {} as IOtherrequest;

  @otherrequest.Action
  getOtherrequestById!: (id: string) => IOtherrequest;

 @patients.State
  patients!: IPatient[];

  @userStore.Getter
  authPractitioner!: IPractitioner;

    @patients.Action
    fetchPatients!: () => Promise<void>;

  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  @condition.State
  conditions!: { [state: string]: ICondition[] };

  @Watch("otherrequest")
  requestUpdated(request: IOtherrequest) {
    this.otherrequestModel = JSON.parse(JSON.stringify({ ...otherrequest }));
  }
  @otherrequest.Mutation
  setPatientRequests!: any;

showRefModal = false;
allergy=[];
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
ratio="";

patient=[];
practitioner=[];
practiceform=[];
location=[];
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

 get patientId() {
    return this.$route.params.id as string;
  }

   get patientConditions() {
    return this.conditions[this.patientId] || [];
  }

async setRequestModel() {
     this.otherrequestModel = JSON.parse(JSON.stringify({ ...this.patientrequests }));
  }
  get payload() {
    //  const model = JSON.parse(JSON.stringify({ ...this.otherrequestModel }));
    // return model;
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
async showRef(value:any){
  this.showRefModal = true;
  this.otherrequestModel.request.requestReference = value;
}
 done() {
    this.$emit("medication-added");
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
  get PatientName() {
            const id = this.$route.params.id;
            const pt = this.patients.find((i: any) => i.id === id);
           return {
             ...pt
           }
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


   this.payload.requestInfo.requester = patientfullnameid;
  this.payload.subject.subject = patientfullnameid;
  this.payload.performer.performer = practitionerfullnameid;
  
  if(this.allLocation.length === 0) this.payload.performer.location = practitionerfullnameid;
  
   try {
      const response = await cornieClient().post("/api/v1/other-requests", this.payload);
      if (response.success) {
          this.setPatientRequests([response.data]);
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
          this.setPatientRequests([response.data]);
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
  
  
    async fetchAllergy() {
    const AllAllergy = cornieClient().get(`/api/v1/allergy/findAllByPatient/${this.patientId}`);
    const response = await Promise.all([AllAllergy]);
    this.allergy = response[0].data.result;
  }


  async created() {
    await this.fetchPatientConditions(this.patientId);
    this.setRequest();
    this.setRequestModel();
    this.fetchLocation();
    this.fetchPracticeForms();
    this.fetchPatients();
    this.fetchAllergy();
    this.fetchAllPatients();
    this.fetchPractitioner();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
  }
}
</script>


<style scoped>

.aadd{
      float: right;
    position: relative;
    bottom: 30px;
    margin-right: 10px;
}
</style>

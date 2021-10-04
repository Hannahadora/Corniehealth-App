<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
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
                <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                   <cornie-select
                    :items="dropdowns.serviceCategory"
                    v-model="otherrequestModel.basicInfo.activityDefinition"
                    label="activity definition"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="dropdowns.serviceType"
                    v-model="otherrequestModel.basicInfo.basedOn"
                    label="based on"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="dropdowns.specialty"
                     v-model="otherrequestModel.basicInfo.replaces"
                    label="replaces"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                   :items="['proposal','plan','order','original-order','reflex-order','filler-order','instance-order','option']"
                     v-model="otherrequestModel.basicInfo.intent"
                    label="intent"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Inpatient','Outpatient','Community','Discharge']"
                    v-model="otherrequestModel.basicInfo.category"
                    label="category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                     class="required"
                    :rules="required"
                    :items="['Routine','Urgent','ASAP','STAT']"
                      v-model="otherrequestModel.basicInfo.priority"
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                     class="required"
                    :rules="required"
                    :items="dropdowns.serviceCategory"
                     v-model="otherrequestModel.basicInfo.doNotPerform"
                    label="do not perform"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
        </accordion-component>
        <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Request Info" expand="true" v-model="opened" :opened="false">
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                 <cornie-select
                  class="required"
                  :rules="required"
                  :items="allRequester"
                  v-model="otherrequestModel.requestInfo.requester"
                  label="requester"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.specialty"
                    v-model="otherrequestModel.requestInfo.encounter"
                  label="encounter"
                  placeholder="--Select--"
                >
                </cornie-select>
                 <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceCategory"
                   v-model="otherrequestModel.request.requestCode"
                  label="reason code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceCategory"
                   v-model="otherrequestModel.request.orderDetail"
                  label="order detail"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.preCondition"
                  label="precondition?"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.preconditionCode"
                  label="precondition code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                   v-model="otherrequestModel.request.reasonCode"
                  label="reason code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.requestReference"
                  label="request reference"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-input label="supporting info"   v-model="otherrequestModel.request.supportingInfo" placeholder="--Enter--" />
                <cornie-select
                  :items="dropdowns.serviceType"
                   v-model="otherrequestModel.request.specimen"
                  label="specimen"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :items="dropdowns.serviceType"
                   v-model="otherrequestModel.request.bodySite"
                  label="body site"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-numinput
                  label="quantity"
                  type="number"
                  v-model="otherrequestModel.request.quantity"
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
                      :v-model="otherrequestModel.request.ratio"
                    />
                    <span class="relative left-14 top-2">:</span>
                    <input
                      contenteditable="true"
                      type="text"
                      :value="otherrequestModel.request.ratio"
                      class="ml-32 w-10 outline-none focus-within:outline-none"
                    />
                  </div>
                </div>
                 <div>
                        <span class="uppercase font-bold text-black text-xs"> range</span>
                        <div class="flex p-3 space-x-2 justify-between w-full">
                          <div class="float-left w-full pr-5">
                            <div>
                                <p class="relative top-4 right-4">0</p>
                                <Slider v-model="otherrequestModel.request.range"  :format="format" showTooltip="drag"/>
                                <p class="float-right relative bottom-4 -mr-7">100</p>
                            </div>
                          </div>
                            <div class="border-2 text-xs h-10 p-2 w-16 mt-1 float-right rounded border-danger">
                                {{format}}
                            </div>
                        </div>
                      </div>
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
                
                <cornie-input label="note" placeholder="--Enter--"  v-model="otherrequestModel.request.note"/>
                <cornie-input
                  label="patient instructions"
                  placeholder="--Enter--"
                  v-model="otherrequestModel.request.patientInstructions"
                />
            </div>
            
        </accordion-component>
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Participants" expand="true" v-model="opened" :opened="false">
                <p class="text-gray-600 text-xs mt-5 mb-5 pb-3 italic border-b-2 border-dashed">Patient</p>
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="allRequester"
                  v-model="otherrequestModel.subject.subject"
                  label="subject"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                   v-model="otherrequestModel.subject.paymentOption"
                  label="payment option"
                  placeholder="--Select--"
                >
                </cornie-select>
            </div>
                <p class="text-gray-600 text-xs  pb-3 italic border-b-2 border-dashed">Requester</p>
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                     <cornie-select
                  class="required"
                  :rules="required"
                  :items="allRequester"
                  v-model="otherrequestModel.requestInfo.requester"
                  label="requester"
                >
                </cornie-select>
            </div>
                <p class="text-gray-600 text-xs pb-3 italic border-b-2 border-dashed">Performer</p>
                <div  class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                         <cornie-select
                  class="required"
                  :rules="required"
                   :items="['Specialized surgeon','Chiropractor','Dental assistant','Specialized nurse','Hospital administrator','Plastic surgeon','Neuropathologist','Nephrologist','Obstetrician','School dental assistant','Medical microbiologist','Cardiologist','Dermatologist','Laboratory hematologist','Gerodontist','Removable prosthodontist','Specialized dentist','Neuropsychiatrist','Medical assistant','Orthopedic surgeon','Thoracic surgeon','Community health physician','Physical medicine specialist','Urologist','Electroencephalography specialist','Dental hygienist']"
                   v-model="otherrequestModel.performer.performerType"
                  label="performer type"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="allPerformer"
                  v-model="otherrequestModel.performer.performer"
                  label="performer"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                   v-model="otherrequestModel.performer.locationCode"
                  label="location code"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required"
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
                <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                        <cornie-select
                        :items="allForms"
                        v-model="otherrequestModel.forms.linkForms"
                        label="Link Forms"
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
            {{newaction}} Request
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
import IOtherrequest from "@/types/IOtherrequest";
 import Slider from '@vueform/slider';
import Period from "@/types/IPeriod";
import '@vueform/slider/themes/default.css';
import DateTimePicker from './components/datetime-picker.vue'
import { namespace } from 'vuex-class'

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
    ArrowLeftIcon,
    DatePicker,
    CDelete,
    RangeSlider,
    DEdit,
    CancelIcon,
    InfoIcon,
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
    Slider,
    MainCornieSelect
  },
})
export default class Medication extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;
  
  @Prop({ type: Object, required: false, default: { ...emptyOtherrequest} })
  otherrequest!: IOtherrequest;

  otherrequestModel = {} as IOtherrequest;

  @otherrequest.Action
  getOtherrequestById!: (id: string) => IOtherrequest;

  @Watch("otherrequest")
  requestUpdated(request: IOtherrequest) {
    this.otherrequestModel = JSON.parse(JSON.stringify({ ...otherrequest }));
  }
  @otherrequest.Mutation
  updatedOtherrequests!: any;


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

async setRequestModel() {
     this.otherrequestModel = JSON.parse(JSON.stringify({ ...this.otherrequest }));
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
    return this.id ? 'Update' : 'Create New'
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
    try {
      const response = await cornieClient().post("/api/v1/other-requests", this.payload);
      if (response.success) {
          this.updatedOtherrequests([response.data]);
          window.notify({ msg: "Request Created", status: "success" });
        this.done();
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: error.response.data.message, status: "error" });
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
      window.notify({ msg: error.response.data.message, status: "error" });
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
 
  async fetchPateints() {
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
    this.fetchPracticeForms();
    this.fetchLocation();
    this.fetchPateints();
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

</style>

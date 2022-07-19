<template>
<cornie-dialog v-model="show" right class="w-8/12 h-full">
   <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
        Diagnostics Request
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

    <cornie-card-text class="flex-grow scrollable">
        <div class="w-full">
            <div id="printMe" class="printMe">
                <div  class="w-full h-full">
                     <div class="w-full">
                            <div class="bg-primary p-5 w-full flex mb-5">
                                <p class="float-left text-white w-full">Prescription ID #: <span class="font-semibold">{{ selectedItem.identifier }} </span></p>
                                    <p class="float-right flex justify-end w-full text-white">Status: <span class="font-semibold">{{ selectedItem.status }}</span></p>
                            </div>
                            <div class="">
                                <div class="flex space-x-8">
                                      <avatar class="mr-2 w-16 h-16" v-if="authPractitioner.image" :src="authPractitioner.image" />
                                    <avatar class="mr-2 w-16 h-16" v-else :src="localSrc" />
                                    <div class="float-right w-full flex justify-end">
                                        <div>
                                            <p class="font-bold mb-2 text-right">{{ authPractitioner?.department }}</p>
                                            <p class="text-right mb-2">{{ authPractitioner?.address }}</p>
                                            <p class="text-right mb-2">{{ authPractitioner?.phone?.dialCode +''+ authPractitioner?.phone?.number }}<span class="font-bold text-2xl text-gray-400">.</span> Info@saintnicholashospital.com</p>
                                            <p class="text-right mb-2"> <span class="text-gray-300">Practice ID #:</span>{{ authPractitioner?.identifier }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>


                  <div class="w-full border-b-2 mt-5 border-dashed border-gray-200 pb-8">
                        <div class="bg-primary p-5 w-full flex mb-5">
                            <p class="float-left text-white w-full">Safety Cap Request #: <span class="font-semibold">{{ selectedItem.asNeeded }}</span></p>
                            <p class="float-right flex justify-end w-full text-white">Delivery Instruction: <span class="font-semibold">{{ selectedItem.priority }}</span></p>
                        </div>

                         <div class="grid grid-cols-3 gap-4 mt-8">
                            <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Request Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Date Requested</p>
                                    <p class="text-sm text-right w-full">{{ new Date(selectedItem.createdAt).toLocaleDateString() }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Encounter ID</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.encounterId ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">ICD-11 Code</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.encounterId ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Priority</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.priority ?? 'N/A' }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Requester</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.patient.firstname +' '+ selectedItem.patient.lastname ?? 'N/A' }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Patient ID</p>
                                    <p class="text-sm text-right w-full">{{  selectedItem.patient.id ?? 'N/A' }}</p>
                                </div>
                            </div>
                             <div class="bg-white rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Performer Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Pharmacist Name</p>
                                    <p class="text-sm text-right w-full">{{ authPractitioner?.jobDesignation ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Practitioner ID</p>
                                    <p class="text-sm text-right w-full">{{ authPractitioner?.identifier ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Pharmacy Name</p>
                                    <p class="text-sm text-right w-full">{{ authPractitioner?.jobDesignation ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Phone No</p>
                                    <p class="text-sm text-right w-full">{{ authPractitioner?.phone?.dialCode +''+ authPractitioner?.phone?.number ?? 'N/A' }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Email</p>
                                    <p class="text-sm text-right w-full">{{ authPractitioner?.email ?? 'N/A' }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Address</p>
                                    <p class="text-sm text-right w-full">{{ authPractitioner?.address ?? 'N/A' }}</p>
                                </div>
                            </div>
                             <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Patient Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Patient Name</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.patient.firstname +' '+ selectedItem.patient.lastname ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">MRN #:</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.mrn  ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Payment Profile</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.status  ?? 'N/A' }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Phone No</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.contactInfo[0]?.phone ? `${selectedItem?.patient?.contactInfo[0]?.phone?.dialCode} ${selectedItem?.patient?.contactInfo[0]?.phone?.number}` : 'N/A' }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Email</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.contactInfo[0]?.email  ?? 'N/A' }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Address</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.contactInfo[0]?.primaryAddress  ?? 'N/A' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 w-full  border-b-2 border-dashed border-gray-200 pb-8">
                        <span class="font-bold text-lg my-9">Diagnostics</span>
                         <cornie-table :columns="rawHeaders" v-model="items" :listmenu="true" :check="false" :menushow="true">
                        </cornie-table>
                    
                    </div>

                   <div class="grid grid-cols-3 gap-4 w-full border-b-2 border-dashed border-gray-300 pb-5">
                        <div class="p-2 w-full mt-3 flex space-x-4">
                            <check-icon class="fill-current text-green-600 mr-5"/>
                            <span class=" mb-3 text-sm font-bold">Request Description: <span class="text-xs text-gray-300 mr-2">{{ selectedItem?.requestDescription }}</span></span>
                        </div>
                        <div class="p-2 w-full mt-3 flex space-x-4">
                            <check-icon class="fill-current text-blue-600 mr-5"/>
                            <span class=" mb-3 text-sm font-bold">Body Site: <span class="text-xs text-gray-300">{{ selectedItem?.bodySite }}</span></span>
                        </div>

                   </div>

                   <div class="w-full grid grid-cols-2 mt-5 gap-4">
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold flex space-x-2"> <patient-icon class="mr-4"/> Patient Instruction</label>
                            <p class="text-xs text-gray-800"> {{ selectedItem?.patientInstruction ?? 'N/A' }}</p>
                        </div>
                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold flex space-x-2"> <note-icon class="mr-4"/> Notes</label>
                            <p class="text-xs text-gray-800">{{ selectedItem?.note ?? 'N/A' }}</p>
                        </div>

                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold flex space-x-2">  <check-icon class="fill-current text-purple-600 mr-4"/>Reason Code</label>
                            <p class="text-xs text-gray-800"> {{ selectedItem?.reasonCode ?? 'N/A' }}</p>
                        </div>
                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold flex space-x-2"><check-icon class="fill-current text-green-600 mr-4"/> As Needed</label>
                            <p class="text-xs text-gray-800"> {{ selectedItem?.asNeeded ?? 'N/A' }}</p>
                        </div>
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold flex space-x-2"><check-icon class="fill-current text-blue-200 mr-4"/> Reason Reference</label>
                            <p class="text-xs text-gray-400 -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span> {{ selectedItem?.reasonReference ?? 'N/A' }}</p>
                        </div>
                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold flex space-x-2"> <check-icon class="fill-current text-danger mr-4"/>As Needed Code</label>
                            <p class="text-xs text-gray-400 -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span> {{ selectedItem?.asNeededCode ?? 'N/A' }}</p>
                        </div>
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class="text-sm font-bold flex space-x-2"><check-icon class="fill-current text-purple-800 mr-4"/>Replaces</label>
                            <p class="text-xs text-gray-400 -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span>{{ selectedItem?.replaces ?? 'N/A' }}</p>
                        </div>
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class="text-sm font-bold flex space-x-2"><check-icon class="fill-current text-blue-700 mr-4"/> Linked Forms</label>
                            <p class="text-xs text-gray-400 -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span> {{ FormName ?? 'N/A' }}</p>
                        </div>                        
                    </div>

                    <div class="bg-blue-50 p-3 mt-8">
                        <div class="border-b-2 border-dashed border-gray-200 pb-8"> 
                            <p class="text-gray-500 mb-3 text-xs text-center">Powered By Cornie Health</p>
                            <p class="text-center text-xs">This is a system generated document from CornieHealth. CornieHealth is a healthtech system solution vendor for healthcare providers and patients. Visit <a class="text-danger font-bold" href="https://www.corniehealth.com">www.corniehealth.com</a> to create your free account.</p>
                        </div>
                        <div class="mt-5"> 
                            <p class="text-gray-400 text-xs text-center">Save Earth, Go Paperless. Join so many other amazing providers and patients on CornieHealth.</p>
                            <p class="text-center text-xs">Document Type: Medication Prescription|Rx ID: {{ selectedItem?.identifier }} | Requester: {{ selectedItem?.requester }} | DateTime Created: {{ createdDate }}</p>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
    </cornie-card-text>
      
    <cornie-card>
    <cornie-card-text class="flex justify-end">
        <cornie-btn @click="show = false" class="text-white bg-danger px-2 rounded-xl"> Close
        </cornie-btn>

    </cornie-card-text>
    </cornie-card>
</cornie-card>


  </cornie-dialog>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";

import ISpecial from "@/types/ISpecial";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";

import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import AccordionComponent from "@/components/form-accordion.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import TextArea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";
import DRangePicker from "@/components/daterangecalendar.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CheckIcon from "@/components/icons/newcheck.vue";
import PatientIcon from "./components/patient.vue";
import NoteIcon from "./components/notes.vue";


const userStore = namespace("user");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "printSection",
  components: {
    ...CornieCard,
    AccordionComponent,
    CornieIconBtn,
    ArrowLeftIcon,
    PatientIcon,
    DRangePicker,
    CancelIcon,
    NoteIcon,
    CornieDialog,
    CornieRadio,
    Avatar,
    CheckIcon,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    CornieTable
  },
})
export default class printSection extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Object, default: {} })
    selectedItem!: any;

    @userStore.Getter
    authPractitioner!: any;

 

    loading = false;
    localSrc = require("../../../../assets/img/placeholder.png");
   

    rawHeaders = [
    { title: "request code", key: "asNeededCode", show: true,   noOrder: true, },
    {
        title: "order detail",
        key: "orderDetail",
        show: true,
        noOrder: true,
    },
    {
        title: "qty",
        key: "quantityValue",
        show: true,
        noOrder: true,
    },
    ];
    get allRequests(){
      return [this.selectedItem]
    }
    get items() {
         const requests =this.allRequests.map((request)=>{
            return {
            ...request,
        }
        })
        
        return requests
    }

    get FormName(){
        return this.selectedItem?.forms?.map((c:any) => c.name).toString();
    }

    get createdDate() {
      return new Date(this.selectedItem?.createdAt).toLocaleString();
    }

  async created() {
   
  }
}
</script>

<style>
.dflex {
  display: -webkit-box;
}
</style>

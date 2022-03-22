<template>
<cornie-dialog v-model="show" right class="w-8/12 h-full">
   <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
         Medication Request
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
                                <p class="float-left text-white w-full">Prescription ID #: <span class="font-semibold">243204</span></p>
                                    <p class="float-right flex justify-end w-full text-white">State: <span class="font-semibold">Active</span></p>
                            </div>
                            <div class="">
                                <div class="flex space-x-8">
                                    <avatar class="mr-2 w-16 h-16" :src="localSrc" />
                                    <!--   <avatar class="mr-2" v-else :src="img.placeholder" />-->
                                    <div class="float-right w-full flex justify-end">
                                        <div>
                                            <p class="font-bold mb-2 text-right">St. Nicholas Hospital</p>
                                            <p class="text-right mb-2">57 Campbell Street, Lagos Island. Lagos</p>
                                            <p class="text-right mb-2">(+234) 802 290 8484 <span class="font-bold text-2xl text-gray-400">.</span> Info@saintnicholashospital.com</p>
                                            <p class="text-right mb-2"> <span class="text-gray-300">Practice ID #:</span>3276680BA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div class="w-full border-b-2 mt-5 border-dashed border-gray-200 pb-8">
                        <div class="bg-primary p-5 w-full flex mb-5">
                            <p class="float-left text-white w-full">Safety Cap Request #: <span class="font-semibold">Yes</span></p>
                            <p class="float-right flex justify-end w-full text-white">Delivery Instruction: <span class="font-semibold">Deliver to Patient (Priority)</span></p>
                        </div>

                         <div class="grid grid-cols-3 gap-4 mt-8">
                            <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Request Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Date Requested</p>
                                    <p class="text-sm text-right w-full">22 January 2022, 14:00</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Encounter ID</p>
                                    <p class="text-sm text-right w-full">EN-233298</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">ICD-11 Code</p>
                                    <p class="text-sm text-right w-full">32DA788</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Priority</p>
                                    <p class="text-sm text-right w-full">20/02/2022</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Requester</p>
                                    <p class="text-sm text-right w-full">Dr. Sarah Johnson</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Practitioner ID</p>
                                    <p class="text-sm text-right w-full">457789</p>
                                </div>
                            </div>
                             <div class="bg-white rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Dispenser Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Pharmacist Name</p>
                                    <p class="text-sm text-right w-full">20/02/2022</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Practitioner ID</p>
                                    <p class="text-sm text-right w-full">EN-233298</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Pharmacy Name</p>
                                    <p class="text-sm text-right w-full">32DA788</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Phone No</p>
                                    <p class="text-sm text-right w-full">20/02/2022</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Email</p>
                                    <p class="text-sm text-right w-full">Dr. Sarah Johnson</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Address</p>
                                    <p class="text-sm text-right w-full">457789</p>
                                </div>
                            </div>
                             <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Patient Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Patient Name</p>
                                    <p class="text-sm text-right w-full">Nkechi Claire Obi</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">MRN #:</p>
                                    <p class="text-sm text-right w-full">***3454</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Payment Profile</p>
                                    <p class="text-sm text-right w-full">32DA788</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Phone No</p>
                                    <p class="text-sm text-right w-full">20/02/2022</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Email</p>
                                    <p class="text-sm text-right w-full">Dr. Sarah Johnson</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Address</p>
                                    <p class="text-sm text-right w-full">457789</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 w-full  border-b-2 border-dashed border-gray-200 pb-8">
                        <span class="font-bold text-lg my-9">Medicaiton</span>
                         <cornie-table :columns="rawHeaders" v-model="items" :listmenu="true" :check="false" :menushow="true">
                            <template #actions="{ item }">
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                                <danger-icon />
                                <span class="ml-3 text-xs">Cancel</span>
                                </div>
                            </template>
                        </cornie-table>
                    
                    </div>

                     <div class="mt-5 w-full  border-b-2  border-dashed border-gray-200 pb-8">
                        <span class="font-bold text-lg my-8">Refill</span>
                         <cornie-table :columns="rawHeaders2" v-model="items" :listmenu="true" :check="false" :menushow="true">
                            <template #actions="{ item }">
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                                <danger-icon />
                                <span class="ml-3 text-xs">Cancel</span>
                                </div>
                            </template>
                        </cornie-table>
                    
                    </div>
                 
                   
                    <div class="w-full grid grid-cols-2 mt-5 gap-4">
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Supporting Info</label>
                            <p class="text-xs text-gray-800"> Click on the secure link below to pay for this bill. This service is provided in partnership with Paystack.</p>
                        </div>
                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Notes</label>
                            <p class="text-xs text-gray-800"> A follow up appointment has been scheduled for patient on 18 October, 2021</p>
                        </div>
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Medication Allergies</label>
                            <p class="text-xs text-gray-800"> Aspirin, Codeine, Penicilin</p>
                        </div>
                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Existing Conditions</label>
                            <p class="text-xs text-gray-800"> Aspirin, Codeine, Penicilin</p>
                        </div>
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class="text-sm font-bold">History</label>
                            <p class="text-xs text-gray-400 -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span> Prior Prescription</p>
                            <p class="text-xs text-gray-400  -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span> Detected Issues</p>
                        </div>
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class="text-sm font-bold">Medication Administration</label>
                            <p class="text-xs text-gray-400 -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span> Performer</p>
                            <p class="text-xs text-gray-400  -mt-5"> <span class="text-5xl  font-bold text-gray-300">.</span> Performer Role</p>
                        </div>                        
                    </div>

                    <div class="bg-blue-50 p-3 mt-8">
                        <div class="border-b-2 border-dashed border-gray-200 pb-8"> 
                            <p class="text-gray-500 mb-3 text-xs text-center">Powered By Cornie Health</p>
                            <p class="text-center text-xs">This is a system generated document from CornieHealth. CornieHealth is a healthtech system solution vendor for healthcare providers and patients. Visit <a class="text-danger font-bold" href="https://www.corniehealth.com">www.corniehealth.com</a> to create your free account.</p>
                        </div>
                        <div class="mt-5"> 
                            <p class="text-gray-400 text-xs text-center">Save Earth, Go Paperless. Join so many other amazing providers and patients on CornieHealth.</p>
                            <p class="text-center text-xs">Document Type: Medication Prescription|Rx ID: 234567 | Requester: Dr. Sarah Johnson | DateTime Created: 22 January 2022, 14:00</p>
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


const practitioner = namespace("practitioner");
const special = namespace("special");
const patients = namespace("patients");
const request = namespace("request");

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
    DRangePicker,
    CancelIcon,
    CornieDialog,
    CornieRadio,
    Avatar,
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

    @Prop({ type: Function, default: defaultFilter })
    filter!: (item: any, query: string) => boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: "" })
    specilatyId!: string;

    @patients.State
    patients!: IPatient[];

    @patients.Action
    fetchPatients!: () => Promise<void>;

    @practitioner.State
    practitioners!: IPractitioner[];


    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

     @request.State
    requests!: any[];

    @request.Action
    fetchRequests!: () => Promise<void>;


    loading = false;
    localSrc = require("../../../../../assets/img/placeholder.png");
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();

    rawHeaders = [
    { title: "medication", key: "code", show: true,   noOrder: true, },
    {
        title: "dosage",
        key: "dosage",
        show: true,
        noOrder: true,
    },
    {
        title: "duration",
        key: "duration",
        show: true,
        noOrder: true,
    },
    {
        title: "course of therapy",
        key: "course",
        show: true,
        noOrder: true,
    },
    {
        title: "refill",
        key: "refill",
        show: true,
        noOrder: true,
    },
    ];
    rawHeaders2 = [
    { title: "DISPENSE INTERVAL", key: "code", show: true,   noOrder: true, },
    {
        title: "VALID PERIOD",
        key: "dosage",
        show: true,
        noOrder: true,
    },
    {
        title: "QUANTITY",
        key: "duration",
        show: true,
        noOrder: true,
    },
    {
        title: "SUPPLY DURATION",
        key: "course",
        show: true,
        noOrder: true,
    },
    ];

    get items() {
         const requests =this.requests.map((request)=>{
            return {
            ...request,
            code: "Panadol (10mg)",
            dosage: "0 : 1: 0 /day",
            duration:"10 Days",
            course: "Oral",
            refill:"Yes"
        
        }
        })
        
        return requests
    }


    requestDetails = {
        recorder :  "",
        requester : "",
        encounter : "",
        reasonCode : "",
        reasonReference : " ",
        definition : "",
        basedOn :  "",
        supportingInformation : "",
    }

    requestInfo = {
        statusReason: "",
        intent: "",
        category: "",
        priority: "",
        doNotPerform : "",
        reasonForProhibition : ""
    }


    @Watch("id")
    idChanged() {
    
    }

     get allRequester() {
        if (!this.patients || this.patients.length === 0) return [];
        return this.patients.map((i: any) => {
        return {
            code: i.id,
            display: i.firstname + " " + i.lastname,
        };
        });
    }

    get allPerformer() {
        if (!this.practitioners || this.practitioners.length === 0) return [];
        return this.practitioners.map((i: any) => {
        return {
            code: i.id,
            display: i.firstName + " " + i.lastName,
        };
        });
    }




   async submit() {
    this.loading = true;
    this.loading = false;
  }


  async created() {
      await this.fetchPatients();
      await this.fetchPractitioners();
  }
}
</script>

<style>
.dflex {
  display: -webkit-box;
}
</style>

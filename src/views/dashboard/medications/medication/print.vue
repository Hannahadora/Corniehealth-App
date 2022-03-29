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
                            <p class="float-left text-white w-full">Safety Cap Request #: <span class="font-semibold">Yes</span></p>
                            <p class="float-right flex justify-end w-full text-white">Delivery Instruction: <span class="font-semibold"> {{ selectedItem?.deliveryLocation }}</span></p>
                        </div>

                         <div class="grid grid-cols-3 gap-4 mt-8">
                            <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Request Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Date Requested</p>
                                    <p class="text-sm text-right w-full">{{ new Date(selectedItem?.createdAt).toLocaleDateString() }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Encounter ID</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.euncounterId }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">ICD-11 Code</p>
                                    <p class="text-sm text-right w-full">32DA788</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Priority</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.priority }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Requester</p>
                                    <p class="text-sm text-right w-full">{{ getPractitionerName(selectedItem?.dispenserId) }}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Practitioner ID</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.dispenserId }}</p>
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
                                    <p class="text-sm text-right w-full">{{ selectedItem?.dispenserId }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Pharmacy Name</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.dispenserId || 'N/A'}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Phone No</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.dispenserId || 'N/A'}}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Email</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.dispenserId || 'N/A'}}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Address</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.address || 'N/A'}}</p>
                                </div>
                            </div>
                             <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Patient Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Patient Name</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.firstname +''+ selectedItem?.patient?.lastname }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">MRN #:</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.mrn}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Payment Profile</p>
                                    <p class="text-sm text-right w-full">32DA788</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Phone No</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.phone || 'N/A'}}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Email</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.email || 'N/A'}}</p>
                                </div>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Address</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem?.patient?.address || 'N/A'}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 w-full  border-b-2 border-dashed border-gray-200 pb-8">
                        <span class="font-bold text-lg my-9">Medicaiton</span>
                         <cornie-table :columns="medicationHeader" v-model="medications" :listmenu="true" :check="false">
                                    <!-- <template #actions="{ item }">
                                        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showMedication(item)">
                                        <edit-icon />
                                        <span class="ml-3 text-xs">Edit Medication</span>
                                        </div>
                                    </template> -->
                                    <template #code="{ item }">
                                        <div class="flex space-x-3">
                                        <div>
                                            <p>{{ item.code }}</p>
                                            <p class="text-gray-400">{{ item.durationInDays }} days</p>
                                        </div>
                                            <medication-drug v-if="item.substitutionAllowed == true" />
                                            <refill-drug v-else/>
                                        </div>
                                    </template>
                                    <template #dosage="{ item }">
                                        <p >{{ item.dosageInstruction }}/day</p>
                                    </template>
                                    <template #duration="{ item }">
                                        <p >{{ item.durationInDays }} Days</p>
                                    </template>
                                    <template #quantity="{ item }">
                                    <span>
                                        {{ item.quantity }}
                                    </span>
                                    </template>
                                    <template #courseOfTherapy="{ item}">
                                        <p>
                                        {{ item.courseOfTherapy}}
                                        </p>
                                    </template>
                                </cornie-table>
                    
                    </div>

                     <div class="mt-5 w-full  border-b-2  border-dashed border-gray-200 pb-8">
                        <span class="font-bold text-lg my-8">Refill</span>
                          <cornie-table :columns="refillHeader" v-model="refills" :listmenu="true" :check="false">
                                    <!-- <template #actions="{ item }">
                                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showModal(item.id)">
                                        <edit-icon />
                                        <span class="ml-3 text-xs">Edit Refill</span>
                                        </div>
                                    </template> -->
                                    <template #interval="{ item }">
                                        <div class="flex space-x-3">
                                        <div>
                                            <p class="text-gray-400">{{ item.interval }} {{ item.intervalUnit }}</p>
                                        </div>
                                        </div>
                                    </template>
                                    <template #startDate="{ item }">
                                        <span>{{ new Date(item.startDate).toLocaleDateString()}}</span>
                                    </template>
                                    <template #duration="{ item }">
                                        <span>{{ item.supplyDuration }} Days</span>
                                    </template>
                                    <template #quantity="{ item }">
                                    <span>
                                        {{ item.quantity }}
                                    </span>
                                    </template>
                        </cornie-table>
                    
                    </div>
                 
                   
                    <div class="w-full grid grid-cols-2 mt-5 gap-4">
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Supporting Info</label>
                            <p class="text-xs text-gray-800">{{ selectedItem?.supp }}</p>
                        </div>
                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Notes</label>
                            <p class="text-xs text-gray-800"> {{ selectedItem.note }}</p>
                        </div>
                        <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Medication Allergies</label>
                            <p class="text-xs text-gray-800"> {{ selectedItem?.allergies }} </p>
                        </div>
                         <div class="border-gray-100 border-2 p-2 w-full mt-3 rounded-md">
                            <label class=" mb-3 text-sm font-bold">Existing Conditions</label>
                            <p class="text-xs text-gray-800"> {{ selectedItem?.contions }}</p>
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

import IRequest from "@/types/IRequest";
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
const userStore = namespace("user");
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

    @Prop({ type: Object, default: {} })
    selectedItem!: any;

    @practitioner.State
    practitioners!: IPractitioner[];

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    @request.State
    requests!: any[];

    @request.Action
    fetchRequests!: () => Promise<void>;

    @userStore.Getter
    authPractitioner!: any;

  
    loading = false;
    localSrc = require("../../../../assets/img/placeholder.png");


    medicationHeader = [
    {
      title: "medication code",
      key: "code",
      show: true,
       noOrder: true,
    },
    // { title: "medication", key: "createdAt", show: true, noOrder: true, },
    // {
    //   title: "Form",
    //   key: "patient",
    //   show: true,
    //    noOrder: true,
    // },
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
      title: "quantity",
      key: "quantity",
      show: true,
       noOrder: true,
    },

    {
      title: "course of therapy",
      key: "courseOfTherapy",
      show: true,
       noOrder: true,
    },
    ];
    refillHeader = [
    {
      title: "DISPENSE INTERVAL",
      key: "interval",
      show: true,
       noOrder: true,
    },
    { title: "VALID PERIOD", key: "startDate", show: true, noOrder: true, },
    {
      title: "QUANTITY",
      key: "quantity",
      show: true,
      noOrder: true,
    },
    {
      title: "SUPPLY DURATION",
      key: "duration",
      show: true,
      noOrder: true,
    },

    ];

   get refills(){
      return this.selectedItem?.refills ?? [] ;
    }
    get medications(){
      return [this.selectedItem];
    }
    get items() {
      const requests = this.requests.map((request) => {
      const refillses = request.medications.map((medication:any) => medication.refills);
        return {
          ...request,
          action: request.id,
          refils: refillses[0]
        };
      });

     return requests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
    }


getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  async created() {
      await this.fetchRequests();
      await this.fetchPractitioners();
  }
}
</script>

<style>
.dflex {
  display: -webkit-box;
}
</style>

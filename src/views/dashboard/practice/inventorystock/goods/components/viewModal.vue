<template>
<cornie-dialog v-model="show" right class="w-8/12 h-full">
   <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
        Goods Received Note
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
                            <div class="">
                                <div class="flex space-x-8">
                                    <cornie-logo />
                                    <!--   <avatar class="mr-2" v-else :src="img.placeholder" />-->
                                    <div class="float-right w-full flex justify-end">
                                        <div>
                                            <p class="font-bold mb-2 text-right">{{ authPractitioner?.firstName +''+ authPractitioner?.lastName }}</p>
                                            <p class="text-right mb-2">{{ authPractitioner?.address }}</p>
                                            <p class="text-right mb-2">{{ authPractitioner?.phone?.dialCode +''+ authPractitioner?.phone?.number }}<span class="font-bold text-2xl text-gray-400">.</span> {{ authPractitioner?.email }}</p>
                                            <p class="text-right mb-2"> <span class="text-gray-300">{{ (authPractitioner?.phone?.dialCode) +' '+ authPractitioner?.phone?.number }}</span>{{ authPractitioner?.email }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div class="w-full mt-5">
                         <div class="grid grid-cols-3 gap-4 mt-8">
                            <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Receiver Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Received From</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.receivedBy}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Address</p>
                                    <p class="text-sm text-right w-full">{{ 'No' +' '+ selectedItem.supplierHouseNumber +','+ selectedItem.supplierCity +','+ selectedItem.supplierState +','+ selectedItem.supplierCountry }}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Email</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.supplierEmail}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Phone No</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.supplierPhone.dialCode +' '+ selectedItem.supplierPhone.number }}</p>
                                </div>
                            </div>
                             <div class="bg-white rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">GRN Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">GRN #</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.identifier}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Received By</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.receivedBy}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Receive Date</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.dateReceived}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Received To</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.receiveTo}}</p>
                                </div>
                            </div>
                             <div class="bg-blue-50 rounded-lg shadow-md p-3">
                                <p class="text-lg font-bold">Reference Information</p>
                                <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Reference ID</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.id}}</p>
                                </div>
                                 <div class="flex space-x-4 mt-5 w-full">
                                    <p class="text-sm text-gray-400 font-light w-full">Status</p>
                                    <p class="text-sm text-right w-full">{{ selectedItem.supplyStatus}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full mt-12">
                        <div class="bg-primary p-5 w-full flex mb-5">
                            <p class="float-left text-white w-full">Description: <span class="font-semibold">{{ selectedItem.description}}</span></p>
                        </div>
                        <div class="border-t-2 border-dashed border-gray-200 pb-12 pt-12">

                            <span class="font-bold text-lg my-9">BOQ</span>
                            <cornie-table :menushow="true" :columns="headers" v-model="items" :listmenu="true" :check="false">

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

import CornieLogo from "../icons/cornie.vue";


const practitioner = namespace("practitioner");
const userStore = namespace("user");
const patients = namespace("patients");
const request = namespace("request");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "viewModal",
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
    CornieTable,
    CornieLogo
  },
})
export default class viewModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Function, default: defaultFilter })
    filter!: (item: any, query: string) => boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: "" })
    specilatyId!: string;

    @Prop({ type: Object, default: {} })
    selectedItem!: any;

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

    @userStore.Getter
    authPractitioner!: any;

    @request.Action
    getRequestById!: (id: string) => IRequest;


    loading = false;
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();
    input = [] as any;

    @Watch("id")
    idChanged() {
      this.setRequest();
    }
    async setRequest() {
        const request = await this.getRequestById(this.id);
        if (!request) return;
        this.input = request;
        
    }

  
  headers = [
    {
      title: "item code",
      key: "itemCode",
      show: true,
      noOrder: true,
    },
    {
      title: "item name",
      key: "itemName",
      show: true,
      noOrder: true,
    },
    {
      title: "uofm",
      key: "uofm",
      show: false,
      noOrder: true,
    },
    {
      title: "batch #",
      key: "batch",
      show: false,
      noOrder: true,
    },
    {
      title: "expiry",
      key: "expiryDate",
      show: true,
      noOrder: true,
    },
    {
      title: "deleivered qty",
      key: "quantity",
      show: true,
      noOrder: true,
    },
    {
      title: "unit cost",
      key: "unitCost",
      show: true,
      noOrder: true,
    },
    {
      title: "total cost",
      key: "total",
      show: true,
      noOrder: true,
    },
  ];


  
    get items() {
    const supplys = this.selectedItem.supplyItems.map((supply: any) => {
      return {
        ...supply,
        total: this.selectedItem.total,

        // totalCost: this.getTotal(+this.unitCosts[supply.productId], +this.quantities[supply.productId]),
      
      };
    });

    if (!this.query) return supplys;
    return search.searchObjectArray(supplys, this.query);
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

getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  async created() {
      await this.fetchRequests();
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

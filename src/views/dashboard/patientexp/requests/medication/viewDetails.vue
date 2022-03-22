<template>
  <cornie-dialog v-model="show" right class="w-5/12 h-full">
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
       <v-form ref="form">
            <div class="grid grid-cols-3 gap-4 w-full justify-center border-b-2 border-dashed border-gray-200 pb-5">
                <div>
                    <span class="block capitalize text-sm text-gray-400">Request Date</span>
                    <span class="py-3 rounded-md"> 29/10/2022 </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Requisition ID</span>
                    <span class="py-3 rounded-md"> DF5456788 </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Recorder</span>
                    <span class="py-3 rounded-md"> Dr. Niyi Adegbola </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Status</span>
                    <span class="rounded-full bg-green-100 text-green-400 px-3 py-1 mt-3 text-xs"> Active </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Status Reason</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Based On</span>
                    <span class="py-3 rounded-md"> Sercive Request </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Intent</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Priority</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Category</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Encounter</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Supporting Information</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Requester</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                <div>
                    <span class="block capitalize text-sm text-gray-400">Patient</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                <div>
                    <span class="block capitalize text-sm text-gray-400">Dispenser</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>

              
            
            </div>
            <accordion-component
              title="Medication"
              :opened="false"
            >
             <cornie-table :columns="rawHeaders" v-model="items" :listmenu="true" :check="false">
                <template #actions="{ item }">
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <danger-icon />
                    <span class="ml-3 text-xs">Cancel</span>
                    </div>
                </template>
            </cornie-table>
            </accordion-component>
             <accordion-component
              title="Refill"
              :opened="false"
            >
             <cornie-table :columns="rawHeaders2" v-model="items" :listmenu="true" :check="false">
                <template #actions="{ item }">
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <danger-icon />
                    <span class="ml-3 text-xs">Cancel</span>
                    </div>
                </template>
            </cornie-table>
            </accordion-component>

       </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
             @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Save
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

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "DetailedViewModal",
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
    CornieTable,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class DetailedViewModal extends Vue {
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


    loading = false;
    localSrc = require("../../../../../assets/img/placeholder.png");
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();


    @Watch("id")
    idChanged() {
    
    }

    rawHeaders = [
    {
      title: "medication code",
      key: "id",
      show: true,
       noOrder: true,
    },
    { title: "medication", key: "createdAt", show: true, noOrder: true, },
    {
      title: "Form",
      key: "patient",
      show: true,
       noOrder: true,
    },
    {
      title: "dosage",
      key: "requester",
      show: true,
       noOrder: true,
    },
    {
      title: "duration",
      key: "dispenser",
      show: true,
       noOrder: true,
    },
    {
      title: "quantity",
      key: "performer",
      show: true,
       noOrder: true,
    },

    {
      title: "course of therapy",
      key: "completeStatus",
      show: true,
       noOrder: true,
    },
    ];
    rawHeaders2 = [
    {
      title: "DISPENSE INTERVAL",
      key: "id",
      show: true,
       noOrder: true,
    },
    { title: "VALID PERIOD", key: "createdAt", show: true, noOrder: true, },
    {
      title: "QUANTITY",
      key: "patient",
      show: true,
      noOrder: true,
    },
    {
      title: "SUPPLY DURATION",
      key: "requester",
      show: true,
      noOrder: true,
    },
    {
      title: "Actions",
      key: "actions",
      show: true,
      noOrder: true,
    },
    ];
    get items() {
      const requests = this.patients.map((i: any) => {
      return {
        ...i,
    
      };
    });

    return requests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
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

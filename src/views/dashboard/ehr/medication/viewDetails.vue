<template>
  <cornie-dialog v-model="show" right class="w-7/12 h-full">
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
                    <span class="py-3 rounded-md"> {{ new Date(selectedItem.createdAt).toLocaleDateString()}} </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Requisition ID</span>
                    <span class="py-3 rounded-md"> {{ selectedItem.identifier }} </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Recorder</span>
                    <span class="py-3 rounded-md"> Dr. {{ authPractitioner.firstName +' '+ authPractitioner.lastName}} </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Status</span>
                    <span class="rounded-full bg-green-100 text-green-400 px-3 py-1 mt-3 text-xs"> {{ selectedItem.status }} </span>
                </div>
                  <div>
                    <span class="block capitalize text-sm text-gray-400">Status Reason</span>
                    <span class="py-3 rounded-md">{{ selectedItem.status }} </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Based On</span>
                    <span class="py-3 rounded-md"> {{ selectedItem.basedOn }} </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Intent</span>
                    <span class="py-3 rounded-md"> {{ selectedItem.intent }} </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Priority</span>
                    <span class="py-3 rounded-md"> {{ selectedItem?.priority }} </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Category</span>
                    <span class="py-3 rounded-md"> {{ selectedItem.category }} </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Encounter</span>
                    <span class="py-3 rounded-md"> xxxxxx </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Supporting Information</span>
                    <span class="py-3 rounded-md"> {{ selectedItem.reasonForSubstitution }} </span>
                </div>
                 <div>
                    <span class="block capitalize text-sm text-gray-400">Requester</span>
                    <span class="py-3 rounded-md"> {{ getPractitionerName(selectedItem.requesterId) }} </span>
                </div>
                <div>
                    <span class="block capitalize text-sm text-gray-400">Patient</span>
                    <span class="py-3 rounded-md"> {{ getPatientName(selectedItem.patientId) }} </span>
                </div>
                <div>
                    <span class="block capitalize text-sm text-gray-400">Dispenser</span>
                    <span class="py-3 rounded-md"> {{ getOrgName(selectedItem.dispenserId) }} </span>
                </div>

              
            
            </div>
            <accordion-component
              title="Medication"
              :opened="true"
            >
             <cornie-table :columns="medicationHeader" v-model="medications" :listmenu="true" :check="false">
                <template #actions="{ item }">
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showMedication(item)">
                    <edit-icon />
                    <span class="ml-3 text-xs">Edit Medication</span>
                    </div>
                     <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <delete-icon />
                      <span class="ml-3 text-xs">Delete Medication</span>
                    </div>
                </template>
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
            </accordion-component>
             <accordion-component
              title="Refill"
              :opened="true"
            >
             <cornie-table :columns="refillHeader" v-model="refills" :listmenu="true" :check="false">
                <template #actions="{ item }">
                   <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showModal(item.id)">
                      <edit-icon />
                      <span class="ml-3 text-xs">Edit Refill</span>
                    </div>
                   
                </template>
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
  <refill-modal  v-model="showRefillModal" :id="requestid" :medicationId="medicationid"/>
  <edit-medication v-model="showEditMedication" @medication-added="medicationadded" :id="requestid" :medselectedItem="medselectedItem"/>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";
import { mapDisplay } from "@/plugins/definitions";

import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";
import IRequest from "@/types/IRequest";

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
import EditIcon from "@/components/icons/edit.vue";
import EditMedication from "./medication.vue";

import RefillModal from "./refill.vue";


const practitioner = namespace("practitioner");
const request = namespace("request");
const patients = namespace("patients");
const userStore = namespace("user");

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
    EditMedication,
    RefillModal,
    CancelIcon,
    CornieDialog,
    EditIcon,
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
    @Prop({ type: String, default: "" })
    id!: string;

    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Function, default: defaultFilter })
    filter!: (item: any, query: string) => boolean;

    @Prop({ type: String, default: "" })
    medicationid!: string;

    @Prop({ type: Object, default: {} })
    selectedItem!: any;

    @Prop({ type: String, default: "" })
    requestid!: string;

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

    @userStore.Getter
    authPractitioner!: IPractitioner;

    @request.Action
    getRequestById!: (id: string) => IRequest;

  @request.Action
  deleteRequest!: (id: string) => Promise<boolean>;


    medicationMapper = (code: string) => "";
    loading = false;
    localSrc = require("../../../../assets/img/placeholder.png");
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();
    showRefillModal = false;
    medicationId = "";
    showEditMedication = false;
    input = [] as any;
    medselectedItem = {};


    @Watch("id")
    idChanged() {
      this.setRequest();
    }
    async setRequest() {
        const request = await this.getRequestById(this.id);
        if (!request) return;
        this.input = request;
        
    }
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
    
    //  somereqeusts = this.requests.map((request) => request.medications.map((medication:any) => medication.refills));
  

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
    async createMapper() {
      this.medicationMapper = await mapDisplay(
        "http://hl7.org/fhir/ValueSet/medication-codes"
      );
    }
    showModal(id:string){
      this.showRefillModal = true;
    }
    showMedication(item:string){
      this.medselectedItem = item;
      this.showEditMedication = true;
    }
   getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

  getOrgName(id:string){
    const pt = this.patients.find((i: any) => i.organizationId === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }



   async submit() {
    this.loading = true;
    this.loading = false;
  }

  async medicationadded(){
    await this.fetchRequests();
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this medication",
      title: "Delete medication",
    });
    if (!confirmed) return;

    if (await this.deleteRequest(id))
      window.notify({ msg: "Medication delete", status: "success" });
    else window.notify({ msg: "Medication not deleted", status: "error" });
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

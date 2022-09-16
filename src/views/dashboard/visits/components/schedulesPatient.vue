<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
         Scheduled Appointments
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 w-full border-dashed pb-2 mb-7 border-gray-300">
                <span class="text-dark text-sm font-medium">Select Scheduled Appointments to check-in on a visit.</span>
                <div class="">
                 <span class="mb-2 w-full rounded-full" @click="showDatalist = !showDatalist">
                    <icon-input
                    autocomplete="off"
                    class="border border-gray-600 rounded-full focus:outline-none"
                    type="search"
                    placeholder="Search"
                    v-model="query"
                    >
                    <template v-slot:prepend>
                        <search-icon />
                    </template>
                    </icon-input>
                 </span>
                  <div :class="[!showDatalist ? 'hidden' : 'o', filteredItems.length === 0 ? 'h-20' : 'h-auto']" 
                 class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded  overflow-auto mt-2 svelte-5uyqqj" style="width:96%">
                        <div class="flex flex-col w-full p-3">
                            <div v-for="(item, i) in filteredItems"
                                :key="i"
                                class="cursor-pointer mb-3 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                                <div class="flex space-x-5" v-for="(value, index) in item?.Patients" :key="index">
                                    <cornie-radio name="search"   @click="selected(value.patient,value.patientId)"/>
                                    <div  class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative">
                                        {{ value?.patient?.firstname +' '+ value?.patient?.lastname   || item }}
                                        <p class="text-xs text-gray-400 italic">{{ value?.patient?.mrn }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="filteredItems.length === 0">
                             <span class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center">No Scheduled Appointments today!</span>
                        </div>
                  </div>
                </div>
            </div>
          
               
 
         
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
          v-if="filteredItems.length > 0"
            :loading="loading"
            @click="submit"
            class="text-white bg-danger font-semibold px-6 rounded-xl"
           >
            Check-In
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
      
    </cornie-card>
  </cornie-dialog>
  <check-in-modal v-model="showCheckinModal" :patients="firstPatient" :patientId="patientId" @checkin-added="checkinadded"/>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import { IPatient } from "@/types/IPatient";
import IAppointment from "@/types/IAppointment";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";


import CheckInModal from "./checkin.vue"


const practitioner = namespace("practitioner");
const patients = namespace("patients");
const appointment = namespace("appointment");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}


@Options({
  name: "appointmentPatient",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CheckInModal,
    CancelIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieRadio,
    CornieBtn,
  },
})
export default class appointmentPatient extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  

 @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  patientId = "";
  firstPatient = [] as any;

  
  query = "";
  showDatalist = false;
  loading = false;
  showCheckinModal = false;
  patientAppointment = [];
    today = new Date().toISOString().slice(0, 10);


  selected(value:any,id:any){
      this.patientId = id;
      this.firstPatient.push(value);

      //   this.firstPatient = [];
      //  this.patientId ="";
     
  }

  checkinadded(value:any){
    this.$emit('checkin-data',value);
    this.show = false;
  }

  submit(){
      this.$emit('patient-data',this.firstPatient,this.patientId);
      // this.firstPatient = [];
      // this.patientId ="";
      this.done();
  }

  orderBy: Sorter = () => 1;

  get filteredItems() {
    return this.patientAppointment
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

 done() {
    this.showCheckinModal = true;
    this.show=false;
  }

   async fetchAppointpentPatient() {
    const [splitDate] = new Date().toISOString().split('T');
   const date = splitDate;
    const AllPractitioners = cornieClient().get(`/api/v1/appointment/for-date`,{date: date});
    const response = await Promise.all([AllPractitioners]);
    this.patientAppointment = response[0].data;
    
  }


  async created() {
    await this.fetchAppointpentPatient();
    await this.fetchPatients();
    await this.fetchAppointments();
  }
}
</script>
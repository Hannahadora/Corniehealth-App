<template>
  <cornie-dialog v-model="show" right class="md:w-4/12 w-12/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          View Visit
          </h2>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="container" ref="form">
          <div class="py-2 px-4 border-2 border-gray-200 rounded mb-8">
            <div class="w-full flex justify-between">
                <p class="text-gray-400">Visit ID:</p>
                <p>{{ selectedItem.id }}</p>
            </div>
          </div>
           <div class="py-2 px-4 border-2 border-gray-200 rounded mb-8">
            <div class="w-full flex justify-between">
                <p class="text-gray-400">Attending Practitioner:</p>
                <p>{{ selectedItem?.checkedInBy?.firstName +' '+ selectedItem?.checkedInBy?.lastName }}</p>
            </div>
            <div class="w-full flex justify-between">
                <p class="text-gray-400">Specialty:</p>
                <p>{{ selectedItem?.specialty }}</p>
            </div>
          </div>
          <div class="py-2 px-4 border-2 border-gray-200 rounded mb-8">
            <div class="w-full flex justify-between">
                <p class="text-gray-400">Visit Date:</p>
                <p>{{ new Date(selectedItem?.createdAt).toLocaleDateString('en-US') }}</p>
            </div>
            <div class="w-full flex justify-between">
                <p class="text-gray-400">Period:</p>
                <p>{{ selectedItem?.checkInTime +' 7- '+ new Date(selectedItem?.checkOutTime).toLocaleTimeString('en-US') }}</p>
            </div>
          </div>
          <div class="py-2 px-4 border-2 border-gray-200 rounded mb-8">
            <div class="w-full flex justify-between space-x-4">
                <p class="text-gray-400 float-left w-full">Location:</p>
                <p class="float-right w-full">{{ selectedItem?.room?.roomName }}</p>
            </div>
          </div>
           <div class="py-2 px-4 border-2 border-gray-200 rounded mb-8">
            <div class="w-full flex justify-between">
                <p class="text-gray-400">Total Bill:</p>
                <p>N62,501 <span class="text-blue-400 border-b-2 border-blue-400">View Details</span> </p>
            </div>
          </div>
          <div class="py-2 px-4 border-2 border-gray-200 rounded mb-8">
            <div class="w-full flex justify-between">
                <p class="text-gray-400">Status</p>
                <p :class="{
              'bg-yellow-100 text-yellow-400': selectedItem.status == 'On-time-late',
              'bg-purple-300 text-purple-600': selectedItem.status == 'queued'||
              selectedItem.status == 'vitalAcquired'
              ||
              selectedItem.status == 'referred',
              'bg-green-100 text-green-400': selectedItem.status == 'waitlisted' 
              || selectedItem.status == 'consultationCompleted'
              || selectedItem.status == 'diagnosticsCompleted'
              || selectedItem.status == 'nedicationDispensed'
              || selectedItem.status == 'discharged'
              || selectedItem.status == 'checked-in'
              || selectedItem.status == 'completed'
              ,
              ' bg-yellow-100 text-yellow-400': selectedItem.status == 'in-Progress',
             ' bg-red-100 text-red-400': selectedItem.status == 'visitEnded' || selectedItem.status == 'cancelled',
             ' bg-gray-100 text-gray-400': selectedItem.status == 'checked-out',
             ' bg-blue-100 text-blue-600': selectedItem.status == 'billProcessing',

             
            }" class="text-center rounded-lg p-1 bg-opacity-20">Waitlisted </p>
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
            Close
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>

  <doctor-modal :id="doctorId" v-model="showDoctor"/>

</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { cornieClient } from "@/plugins/http";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { string, date, number } from "yup";
import PhoneInput from "@/components/phone-input.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/editview.vue";


const patientprovider = namespace("patientprovider");

@Options({
  name: "viewVisit",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    PhoneInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    Avatar,
    EditIcon,
  },
})
export default class viewVisit extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;


  @Prop({ type: String, default: "" })
  id!: string;

  @patientprovider.State
  primarydoctors!: any;

  @Prop({ type: Object, default: {} })
  selectedItem!: any;

  @patientprovider.Action
  fetchPrimaryDoctors!: () => Promise<void>;

  showDoctor = false;

  doctorId = "";

  showModal(value:string){
    this.showDoctor = true;
    this.doctorId = value;
  }

  done() {
 
  }

  async created() {
    await this.fetchPrimaryDoctors()
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>

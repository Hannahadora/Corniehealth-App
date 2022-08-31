<template>
 <div
    class="flex justify-center bg-white shadow-md  p-3 mt-2 mb-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex space-x-4 w-full border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
      <cornie-icon-btn @click="$router.push({ name: 'Private Profile & Settings' })" class="">
         <arrow-left-icon />
       </cornie-icon-btn>
       <span class="border-l-2 border-gray-100 pl-3">
        Validate Calim
       </span>
      </span>
      <span class="w-full h-screen">
                <div>
                    <div class="my-3 rounded space-x-60 bg-blue-50 w-full flex justify-between py-4 px-5">
                        <div class="w-full">
                            <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold">Visit ID #:</p>
                                <p class="text-gray-400 font-medium">6578</p>
                            </div>
                            <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold">Encounter Date:</p>
                                <p class="text-gray-400 font-medium">23 - 06 - 2022</p>
                            </div>
                            <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold">Claim ID #:</p>
                                <p class="text-gray-400 font-medium">6578</p>
                            </div>
                             <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold float-left">Biller:</p>
                                <p class="text-gray-400 float-right font-medium">Reddington Hospital, Lekki, Lagos</p>
                            </div>
                        </div>
                         <div class="w-full">
                            <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold">Encounter ID #:</p>
                                <p class="text-gray-400 font-medium">56355276</p>
                            </div>
                            <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold">Attending Practitioner:</p>
                                <p class="text-gray-400 font-medium">Dr. Fred Amah</p>
                            </div>
                            <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold">Claim Date:</p>
                                <p class="text-gray-400 font-medium">23 - 06 - 2022</p>
                            </div>
                             <div class="flex justify-between w-full mb-4">
                                <p class="font-semibold">Claim Amount:</p>
                                <p class="text-gray-400 font-medium">N62,501.00 <span class="text-xs underline text-blue-400">View Details</span> </p>
                            </div>
                        </div>

                    </div>
                    <div>
                        <p class="text-gray-400">We care about you and would value your feedback. Your feedback is intended to help us provide better healthcare services to you.</p>
                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="text-gray-500 font-semibold"></p>
                        </div>
                         <div>
                            <p class="text-gray-500 font-semibold">Very Satisfied</p>
                        </div>
                         <div>
                            <p class="text-gray-500 font-semibold">Satisfied</p>
                        </div>
                         <div>
                            <p class="text-gray-500 font-semibold">Neutral</p>
                        </div>
                         <div>
                            <p class="text-gray-500 font-semibold">Unsatisfied</p>
                        </div>
                         <div>
                            <p class="text-gray-500 font-semibold">Very Satisified</p>
                        </div>
                         <div>
                            <p class="text-gray-500 font-semibold">Not Applicable</p>
                        </div>

                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">How was your check-in experience?</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                      <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">Communication?</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                      <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">How do you feel about your involvement in your care plan?</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">How was your check-out experience?</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>

                    <div class="py-5">
                        <span class="font-bold">Tell us about the following:</span>
                    </div>

                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">Wait Time</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">Pharmacy Experience</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">Lab Experience</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">In-Patient Experience</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">Overall Visit Experience</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-7 items-center  justify-between w-full my-4">
                        <div>
                            <p class="">Quality of service received</p>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        <div>
                            <select-option/>
                        </div>
                        
                    </div>
                    <div class="py-5">
                        <text-area :label="'How can we do better?'" class="w-full" :placeholder="'Placeholder'"/>
                    </div>
                    <div class="py-5">
                        <p class="text-sm font-bold w-full">Would you like a representative to contact you?</p>
                        <div class="flex space-x-4 w-full mt-5">
                            <cornie-radio :label="'Yes'"/>
                            <cornie-radio :label="'Yes'"/>
                            
                        </div>
                    </div>
                </div>
                   <div class="flex justify-end">
                    <cornie-btn
                        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
                    >
                        Close
                    </cornie-btn>
                    <cornie-btn
                        class="text-white bg-danger px-6 rounded-xl"
                    >
                    Submit
                    </cornie-btn>
                    </div>
       
        </span>
      </div>
  </div>  
  <view-modal v-model="showViewProvider"/>
  <provider-modal v-model="showOtherProvider" @provideradded="provideradded" :id="providerId"/>
 
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";

import { getTableKeyValue } from "@/plugins/utils";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import {IPatientProvider} from "@/types/IPatientProvider";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import TextArea from "@/components/textarea.vue";
import CornieRadio from "@/components/cornieradio.vue";



const location = namespace("location");
const dropdown = namespace("dropdown");
const patientprovider = namespace("patientprovider");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    EditIcon,
    LocationIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    CornieIconBtn,
    ArrowLeftIcon,
    SelectOption,
    TextArea,
    CornieRadio
  },
})
export default class ValidateClaim extends Vue {
  showColumnFilter = false;
  showOtherProvider = false;
  query = "";
  providerId = "";

  @patientprovider.State
  patientproviders!: IPatientProvider[];

  @patientprovider.Action
  fetchPatientProvider!: () => Promise<void>;

  @patientprovider.Action
  deletePatientProvider!: (id: string) => Promise<boolean>;

  
  getKeyValue = getTableKeyValue;

  refreshing = false;
  showViewProvider = false;

  dropdowns = {} as IIndexableObject;

  rawHeaders = [
     {
      title: "Practice id #",
      key: "ProviderId",
      show: true,
    },
    {
      title: "NAME",
      key: "name",
      show: true,
    },
    { title: "TYPE", key: "type", show: true },
    { title: "Specialty", key: "specialty", show: true },
    { title: "ADDRESS", key: "address", show: true },
    {
      title: "CONTACT Info",
      key: "contactnumber",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    }
  ];


  get items() {
    const patientproviders = this.patientproviders.map((patientprovider:any) => {
      return {
        ...patientprovider,
        // contactnumber: (patientprovider?.provider?.organizationDetails?.phone.dialCode +' '+ patientprovider?.provider?.organizationDetails?.phone?.number) || '',
        email:  patientprovider.provider.email,
        name:  patientprovider.provider.name,
        address:  patientprovider?.provider?.organizationDetails?.address,
        specialty: 'XXXXXX'

      };
    });
    if (!this.query) return patientproviders;
    return search.searchObjectArray(patientproviders, this.query);
  }

  showModal(value:string){
    this.providerId = value;
    this.showOtherProvider = true;
  }


  async deleteItem(id:string){
    const confirmed = await window.confirmAction({
      message: "You are about to delete this provider",
      title: "Delete provider",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().delete(
          `/api/v1/patient-portal/provider/remove/${id}`
        );
        if (response.success) {
          window.notify({ msg: "Provider deleted", status: "success" });
          await this.provideradded();
        }
      } catch (error) {
        window.notify({ msg: "Provider not deleted", status: "error" });
      }
    }
  }
  get sortProviders() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  
  async provideradded(){
    await this.fetchPatientProvider();
  }

  async created() {
    await this.fetchPatientProvider();
  }
}
</script>

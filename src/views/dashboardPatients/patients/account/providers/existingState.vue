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
         Other Providers
       </span>
      </span>
      <span class="w-full h-screen">

        <div class="w-full pb-7">
          <span class="flex justify-end w-full mb-3">
            <button
            @click="showOtherProvider = true"
              class="bg-danger rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
            >
            Add Provider
            </button>
          </span>
          <cornie-table
            :columns="rawHeaders"
            v-model="sortProviders"
            :check="false"
            :fixeHeight="true"
          >
            <template #actions="{item}">
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showViewProvider = true"
              >
                <eye-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showModal(item.id)"
              >
                <edit-icon class="text-primary fill-current" />
                <span class="ml-3 text-xs">Edit</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="deleteItem(item.provider.id)"
              >
                <delete-icon class="text-danger fill-current" />
                <span class="ml-3 text-xs">Delete</span>
              </div>
            </template>
            <!-- <template #status>
                <span
                  class="bg-green-200 text-green-800 text-center rounded-md p-1 bg-opacity-20"
                >
                  Active
                </span>
              </template> -->
            <template #status="{item}">
                <span
                  :class="{
                    'bg-green-200 text-green-800': item.status == 'Active',
                    ' bg-red-500 text-red-400': item.status == 'inactive',
                  }"
                  class="text-center rounded-md p-1 bg-opacity-20"
                >
                  {{ item.status }}
                </span>
              </template>
              <template #contactnumber="{item}">
                  <div>
                    <p>{{ item.email }}</p>
                    <span>
                      {{
                      item?.patientprovider?.provider?.organizationDetails?.phone.dialCode 
                     
                      }}
                      {{ item?.patientprovider?.provider?.organizationDetails?.phone?.number}}
                      </span>
                  </div>
              
              </template>
          </cornie-table>
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

import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import ProviderModal from "./ProviderModal.vue";
import { cornieClient } from "@/plugins/http";
import ViewModal from "./viewModal.vue";

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
    ViewModal,
    CornieIconBtn,
    ArrowLeftIcon,
    ProviderModal
  },
})
export default class ProviderExistingState extends Vue {
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

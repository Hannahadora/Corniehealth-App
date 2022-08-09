<template>
  <cornie-dialog v-model="show" right class="w-6/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Dependants
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full pb-7">
            <span class="flex justify-end w-full mb-3">
            <button
                @click="showMemeberList = !showMemeberList"
                class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
            >
            <span>
                    Add Member
            </span>
            <span>
                |
            </span>   
            <chevron-down-icon class="stroke-current text-white"/>
            </button>
            <div
                :class="[
                    !showMemeberList ? 'hidden' : 'o',
                ]"
                class="absolute shadow h-auto overflow-x-hidden bg-white py-4 border-gray-400 border top-100 z-40 right-0 m-3 rounded overflow-y-auto mt-2"
                style="width: 22%;top: 110px;"
                >
                    
                <div class="mb-2 w-full">
                    <span class="text-black cursor-pointer w-full px-4 flex text-left text-sm hover:bg-blue-100 rounded-full py-3">Add Member</span>
                </div>
                    <div class="mb-2 w-full">
                        <span class="text-black cursor-pointer w-full px-4 flex text-left text-sm hover:bg-blue-100 rounded-full py-3">Add Existing</span>
                    </div>
                </div>
            </span>
            <cornie-table
            :columns="rawHeaders"
            v-model="items"
            :check="false"
            :fixeHeight="true"
            >
            <template #actions>
                <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showViewProvider = true"
                >
                <eye-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">View</span>
                </div>
                <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                >
                <edit-icon class="text-primary fill-current" />
                <span class="ml-3 text-xs">Edit</span>
                </div>
                <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                >
                <delete-icon class="text-danger fill-current" />
                <span class="ml-3 text-xs">Deactivate</span>
                </div>
            </template>
            <template #status>
                <span
                    class="bg-green-200 text-green-700 text-center rounded-md py-2 px-4 bg-opacity-20"
                >
                    Active
                </span>
                </template>
            <!-- <template #status="{item}">
                <span
                    :class="{
                    'bg-green-200 text-green-800': status == 'active',
                    ' bg-red-500 text-red-400': status == 'inactive',
                    }"
                    class="text-center rounded-md p-1 bg-opacity-20"
                >
                    {{ status }}
                </span>
                </template> -->
            </cornie-table>
        </div>
      </cornie-card-text>

    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import search from "@/plugins/search";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { string, date, number } from "yup";


import { IPatient } from "@/types/IPatient";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/deactivate.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";



type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "Dependants",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    CornieRadio,
    CornieTable,
    DeleteIcon,
    LocationIcon,
    EyeIcon,
    EditIcon,
    ChevronDownIcon
  },
})
export default class Dependants extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

 
  @Prop({ type: String, default: "" })
  id!: string;

  showMemeberList = false;
  showViewProvider = false;
   rawHeaders = [
    { title: "DATE ADDED", key: "date", show: true },
    { title: "MRN #", key: "mrn", show: true },
    {
      title: "name",
      key: "name",
      show: true,
    },
    {
      title: "DATE OF BIRTH",
      key: "dob",
      show: true,
    },
    {
      title: "GENDER",
      key: "gender",
      show: true,
    },
    {
      title: "Payment Account",
      key: "payment",
      show: true,
    },
     {
      title: "Status",
      key: "status",
      show: true,
    },

  ];

   get items() {
    return [{
        ...location,
        index: '1',
        date: '23-11-2022',
        mrn: '0899233445',
        name: 'Emma Ibeh Account Owner',
        type: 'Hospital/Clinic',
        dob: '05-09-1987',
        gender: 'Male',
        payment: 'Account',
      }];
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

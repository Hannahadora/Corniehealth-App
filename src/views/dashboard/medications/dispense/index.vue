<template>
  <div>
    <div class="pb-4 mt-6 border-b border-gray-300">
      <p class="text-xl font-bold">{{ $route.name }}</p>
    </div>
    <div
      class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
      v-if="empty"
    >
      <img src="@/assets/rafiki.svg" class="mb-2" />
      <h4 class="text-black text-center">There is no record.</h4>
      <cornie-btn
        class="bg-danger px-3 rounded-full text-white m-5"
        @click="showRoom = true"
      >
        Add New
      </cornie-btn>
    </div>
    <div class="w-full pb-7" v-else>
      <div class="grid grid-cols-3 gap-8 my-8">
        <div
          class="bg-white px-4 py-6 c-shadow flex items-center justify-between rounded-2xl"
        >
          <div>
            <p class="mb-1 text-sm" style="color: #667499">Total Rx</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ totalRx }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/total-sales-badge.png" alt="" />
          </div>
        </div>
        <div
          class="bg-white px-4 py-6 c-shadow flex items-center justify-between rounded-2xl"
        >
          <div>
            <p class="mb-1 text-sm" style="color: #667499">Total Dispensed</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ totalDispensed }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/completed-sales.png" alt="" />
          </div>
        </div>
        <div
          class="bg-white px-4 py-6 c-shadow flex items-center justify-between rounded-2xl"
        >
          <div>
            <p class="mb-1 text-sm" style="color: #667499">Total Volume</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ totalVolume }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/total-sales-vol.png" alt="" />
          </div>
        </div>
      </div>

      <cornie-table :columns="rawHeaders" v-model="items" class="mt-28">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <edit-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <edit-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update Status</span>
          </div>
        </template>
      </cornie-table>
      <div class="flex justify-between m-3">
        <div class="flex justify-around">
          <p class="text-sm">show</p>
          <input
            type="number"
            class="w-12 mr-2 ml-2 outline-none border border-blue-lighter rounded-r"
          />
          <p class="text-sm">per page</p>
        </div>
        <div class="flex justify-around">
          <p class="text-xs mr-3 mt-1">1-3 of 10 items</p>
          <div class="text-xs mr-3 mt-1" style="fontsize: 6px">
            <arrow-left-icon />
          </div>

          <!-- <delete-icon class="text-danger fill-current text-xs mr-2" /> -->
          <p class="text-sm mr-3 text-xs">1 2 3 ... 10</p>
          <div class="text-xs mt-1" style="fontsize: 5px">
            <arrow-right-icon />
          </div>
          <!-- <delete-icon class="text-danger fill-current" /> -->
        </div>
      </div>
    </div>

    <dispense-modal
      :id="typeId"
      v-model="openDispense"
      @closesidemodal="closeModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PlusIcon from "@/components/icons/add.vue";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import ArrowLeftIcon from "../components/arrowleft.vue";
import ArrowRightIcon from "../components/arrow-right.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { first, getTableKeyValue } from "@/plugins/utils";

import DispenseModal from './DispenseModal.vue'

const location = namespace("location");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    CornieBtn,
    TableRefreshIcon,
    FilterIcon,
    PlusIcon,
    IconInput,
    DeleteIcon,
    EditIcon,
    ColumnFilter,
    TableOptions,

    ArrowLeftIcon,
    ArrowRightIcon,
    DispenseModal
  },
})
export default class DISPENSE extends Vue {
  query = "";
  typeId = "";
  openDispense = false;
  practitioner = [] as any;
  location = [] as any;
  updatedBy = "";
  currentStatus = "";
  showStatusModal = false;
  totalRx = 0;
  totalDispensed = 0;
  totalVolume = 0;

  allDispenses = [{}];

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "DISPENSE ID",
      key: "dispenseId",
      show: true,
    },
    {
      title: "SUBJECT (PATIENT)",
      key: "date",
      show: true,
    },
    {
      title: "MEDICATION",
      key: "medication",
      show: true,
    },
    {
      title: "UNIT PRICE",
      key: "unitPrice",
      show: true,
    },
    {
      title: "QUANNTITY",
      key: "quantity",
      show: true,
    },
    {
      title: "AMOUNT",
      key: "amount",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const allDispenses = this.allDispenses.map((dispense) => {
      (dispense as any).createdAt = new Date(
        (dispense as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...dispense,
        // action: dispense.id,
        keydisplay: "XXXXXXX",
        dispenseId: "-----",
        subject: "-----",
        medication: "-----",
        unitPrice: "-----",
        qantity: "-----",
        amount: "-----",
        status: "Active",
      };
    });
    if (!this.query) return allDispenses;
    return search.searchObjectArray(allDispenses, this.query);
  }

   showItem(value: string) {
    this.openDispense = true;
    this.typeId = value;
  }
  
  closeModal() {
    this.openDispense = false;
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>

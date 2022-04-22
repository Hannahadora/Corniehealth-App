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
      <h4 class="text-black text-center">There are no POS sales on record.</h4>
      <cornie-btn
        class="bg-danger px-3 rounded-full text-white m-5"
        @click="salesData = false; showRoom = true"
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
            <p class="mb-1 text-sm" style="color: #667499">Total Sales</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ totalSales }}
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
            <p class="mb-1 text-sm" style="color: #667499">Completed Sales</p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ completedSales }}
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
            <p class="mb-1 text-sm" style="color: #667499">
              Total Sales Volume
            </p>
            <p class="text-2xl font-bold" style="color: #114ff5">
              {{ totalSalesVolume }}
            </p>
          </div>
          <div>
            <img src="../../../../assets/img/total-sales-vol.png" alt="" />
          </div>
        </div>
      </div>

      <span class="flex justify-end">
        <cornie-btn
          class="bg-danger px-3 py-1 text-base rounded-lg text-white m-5"
          @click="showRecord= true"
        >
          Create New
        </cornie-btn>
      </span>
      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="viewItem(item.id)"
          >
            <edit-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <edit-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Void</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <edit-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Process return</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <delete-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Reprint</span>
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
  </div>
  <pos-dialog v-model="showRecord" :salesData="salesData" :id="salesId" @sales-added="salesAdded" :sales="sales" />
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
import PosDialog from "./PosDialog.vue";
import search from "@/plugins/search";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import ArrowLeftIcon from "../components/arrowleft.vue";
import ArrowRightIcon from "../components/arrow-right.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { IOrganization } from "@/types/IOrganization";
import { first, getTableKeyValue } from "@/plugins/utils";

const location = namespace("location");
const user = namespace("user");
const organization = namespace("organization");

@Options({
  components: {
    CornieTable,
    SortIcon,
    PosDialog,
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
  },
})
export default class POSSALES extends Vue {
  query = "";
  salesId = "";
  sales = "";
  salesData = false;
  showRecord = false;
  practitioner = [] as any;
  location = [] as any;
  updatedBy = "";
  currentStatus = "";
  showStatusModal = false;
  totalSales = 0;
  completedSales = 0;
  totalSalesVolume = 0;

  allPosSales = [] as any;

  
  @user.Getter
  authCurrentLocation!: any;

   @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;


  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "REFERENCE NO",
      key: "referenceNo",
      show: true,
    },
    {
      title: "DATE",
      key: "date",
      show: true,
    },
    {
      title: "CUSTOMER",
      key: "customer",
      show: true,
    },
    {
      title: "TYPE",
      key: "type",
      show: true,
    },
    {
      title: "SALES TOTAL",
      key: "salesTotal",
      show: true,
    },
    {
      title: "PAYMENT TOTAL",
      key: "paymentTotal",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const allPosSales = this.allPosSales.map((sale: any) => {
      (sale as any).createdAt = new Date(
        (sale as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...sale,
        // action: sale.id,
        keydisplay: "XXXXXXX",
        referenceNo: "-----",
        Date: "-----",
        customer: "-----",
        type: "-----",
        salesTotal: "-----",
        paymentTotal: "-----",
        status: "Active",
      };
    });
    if (!this.query) return allPosSales;
    return search.searchObjectArray(allPosSales, this.query);
  }

  
   showItem(value: string) {
    this.showRecord = true;
    this.salesId = value;
  }
  
   viewItem(value: string) {
    this.showRecord = true;
    this.salesId = value;
    this.findSales(value)
  }

  findSales(value: any) {
    const xSales: any = this.allPosSales.find((sales: any) => {
      sales.id === value
    })
    this.sales = xSales;
    this.salesData = true
  }
  
  closeModal() {
    this.showRecord = false;
  }

   get locationId() {
    return this.authCurrentLocation;
  }

  async fetchPosHistory() {
    // const request = await this.viewDispense(this.id, this.locationId);
    try {
      const data = await cornieClient().get(
        `/api/v1/pharmacy/pos-history/${this.locationId}`
      );
      this.allPosSales = data.data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching pos history",
        status: "error",
      });
    }
  }

   async created() {
    await this.fetchPosHistory();

    if (this.allPosSales.length < 1) this.fetchPosHistory();

    if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>

<style scoped>
.c-shadow {
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
}
</style>

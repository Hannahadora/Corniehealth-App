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
        @click="
          salesData = false;
          showRecord = true;
        "
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
              N {{ totalSalesVolume }}
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
          @click="showRecord = true, salesData = false, sales = ''"
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
            <eye-yellow class="text-danger fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <decline class="text-danger fill-current" />
            <span class="ml-3 text-xs">Void</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showItem(item.id)"
          >
            <arrow-right-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Process return</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <print class="text-danger fill-current" />
            <span class="ml-3 text-xs">Reprint</span>
          </div>
        </template>
        <template #status="{ item }">
          <div class="flex items-center">
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'draft'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
              v-if="item.status == 'on-hold'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-500 p-1 rounded"
              v-if="item.status == 'active'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'unknown'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-400 p-1 rounded"
              v-if="item.status == 'completed'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-red-100 text-red-600 p-1 rounded"
              v-if="item.status == 'revoked' || item.status == 'cancelled'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'entered-in-error'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'do-not-perform'"
            >
              {{ item.status }}
            </p>
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
  <pos-dialog
    v-model="showRecord"
    :salesData="salesData"
    :id="salesId"
    @salesAdded="salesAdded"
    :sales="sales"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import EyeYellow from "@/components/icons/eye-yellow.vue";
import Decline from "@/components/icons/decline.vue";
import Print from "@/components/icons/print.vue";
import ArrowRightIcon from "@/components/icons/arrow-right.vue";
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
    EyeYellow,
    Decline,
    Print,

    ArrowLeftIcon,
    ArrowRightIcon,
  },
})
export default class POSSALES extends Vue {
  query = "";
  empty = false;
  salesId = "";
  sales = "";
  salesData = false;
  showRecord = false;
  practitioner = [] as any;
  location = [] as any;
  updatedBy = "";
  currentStatus = "";
  showStatusModal = false;

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
      title: "SALES TOTAL(NGN)",
      key: "salesTotal",
      show: true,
    },
    {
      title: "PAYMENT Status",
      key: "paymentStatus",
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
        action: sale.id,
        keydisplay: sale.id,
        referenceNo: sale.identifier,
        date: new Date(sale.createdAt).toLocaleDateString("en-US"),
        customer: sale.customer,
        type: sale.type,
        salesTotal: sale.payments[0].total,
        paymentStatus: sale.payments[0].status,
        status: sale.status,
      };
    });
    if (!this.query) return allPosSales;
    return search.searchObjectArray(allPosSales, this.query);
  }

  get completedSales() {
    const completedSales = this.allPosSales.map((sale: any) => {
      sale.status === "completed" || 0;
    });

    return completedSales.length;
  }

  get totalSales() {
    return this.allPosSales.length || 0;
  }

  get totalSalesVolume() {
    const sv = this.allPosSales.map(
      (sale: any) => Number(sale.payments[0].total)
    );
    
    const tsv = sv.reduce((a: any, b: any) => a + b, 0);
    return tsv.toFixed(2) || 0;
  }

  showItem(value: string) {
    this.showRecord = true;
    this.salesId = value;
  }

  viewItem(value: string) {
    this.showRecord = true;
    this.salesId = value;
     this.sales = this.allPosSales.find((sales: any) => sales.id === value);
    this.salesData = true;
    // this.findSales(this.salesId);
  }

  findSales(value: any) {
    this.allPosSales.filter((sales: any) => {
     if(sales.id == value) {
      this.sales = sales;
     };
    });
    console.log('sales', this.sales)
    this.salesData = true;
  }

  closeModal() {
    this.showRecord = false;
  }

  get locationId() {
    // return this.authCurrentLocation;
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  async fetchPosHistory() {
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

  async salesAdded() {
    await this.fetchPosHistory();
    this.showRecord = false
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

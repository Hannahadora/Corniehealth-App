<template>
 <!-- <div class="flex justify-center space-x-6 w-full -mb-10 cursor-pointer relative">
        <span class="text-danger font-semibold cursor-pointer" @click="showWithdrawalInstructionModal" v-if="isCheck">
          Withdrawal Instruction
        </span>
  </div> -->
    <cornie-table v-model="items" :columns="headers"
    :showPagination="true"
  :checked="checked"  @selectedItem="selectedItem">
        <template #status="{ item }">
          <span class="bg-green-100 text-green-600 rounded-lg p-2 text-xs" v-if="item.active">
             Active
          </span>
           <span class="bg-red-100 text-red-600 rounded-lg p-2 text-xs" v-else>
             Inactive
          </span>
        </template>
        <template #availability="{ item }">
            <div class="text-no-wrap">
            <span class="status p-1 bolder"> {{ item.availability }}</span>
            </div>
        </template>
        <template #actions="{ item }">
            <!-- <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            >
            <edit-icon class="text-purple-700 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
            </div> -->
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showView(item)">
                <new-view-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">View</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showAvailableModal(item.id,item)">
              <check-icon class="text-purple-700 fill-current" />
              <span class="ml-3 text-xs">Check Availability</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showBatchInfo(item)">
              <check-icon class="text-green-700 fill-current" />
              <span class="ml-3 text-xs">Batch Info</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showSupplyInfo(item)">
              <check-icon class="text-blue-700 fill-current" />
              <span class="ml-3 text-xs">Supply Info</span>
            </div>
            <div  class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showStorageModal(item)">
                <update-icon class="text-blue-200 fill-current" />
                <span class="ml-3 text-xs">Storage Info</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showAllocateModal(item)">
                <check-icon class="text-purple-700 fill-current" />
                <span class="ml-3 text-xs">Allocate Stock</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showRequest = true">
                <request-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">Material Request</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showReturn = true">
                <return-icon class="text-danger fill-current" />
                <span class="ml-3 text-xs">Material Return</span>
            </div>
            <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <analytics-icon class="text-purple-700 fill-current" />
                <span class="ml-3 text-xs">Analytics</span>
            </div> -->
            <div v-if="item.active == true" class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDeactivateModal(item)">
                <deactivate-icon class="text-primary fill-current" />
                <span class="ml-3 text-xs">Deactivate</span>
            </div>
            <div v-else class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="activate(item.id)">
                 <check-icon class="text-green-400 fill-current" />
                <span class="ml-3 text-xs">Activate</span>
            </div>
             <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showWithdrawalInstructionModal(item)">
                <withdraw-icon class="text-blue-700 fill-current" />
                <span class="ml-3 text-xs">Withdraw Instruction</span>
            </div>
             <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showWithdrawItemOnly(item)">
                <withdraw-icon class="text-blue-700 fill-current" />
                <span class="ml-3 text-xs">Withdraw Item</span>
            </div>
        </template>
        <template #bulkactions>
             <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="showAllocateBulk = true">
                <check-icon class="text-blue-700 fill-current" />
                <span class="ml-3 text-xs">Allocate Stock</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showRequest = true">
                <check-icon class="text-yelllow-700 fill-current" />
                <span class="ml-3 text-xs">Material Request</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showReturn = true">
                <check-icon class="text-purple-700 fill-current" />
                <span class="ml-3 text-xs">Material Return</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showWaybill = true">
                <check-icon class="text-green-700 fill-current" />
                <span class="ml-3 text-xs">Waybill</span>
            </div>
        </template>
        </cornie-table>
        <storage-modal v-model="showStorage" @stockAdded="stockAdded" :item="storageItem"/>
        <allocate-modal v-model="showAllocate" @stockAdded="stockAdded" :item="singleAllocateItem"/>
        <allocate-bulk-modal v-model="showAllocateBulk" @stockAdded="stockAdded" :item="BulkSelectedItem"/>
        <deactivate-modal v-model="showDeactivate" :item="withdrawItem" @stockAdded="stockAdded"/>
        <availability-modal v-model="showAvailable" :id="stockId" :item="selectItem"/>
        <withdrawn-instruction-modal v-model="withdrawInstruction" @stockAdded="stockAdded" :item="withdrawItem"/>
        <withdraw-item-modal v-model="withdrawItemOnly"  @stockAdded="stockAdded" :item="withdrawItem"/>
        <viewstock-modal v-model="showViewStockbalance" :id="stockId" :item="selectItem"/>
        <batchinfo-modal v-model="showBatch" :id="stockId" :item="selectItem" :bactchitem="BulkSelectedItem"/>
        <supplyinfo-modal v-model="showSupply" :id="stockId" :item="selectItem" :bactchitem="BulkSelectedItem"/>

        <request-modal v-model="showRequest" />
        <return-modal v-model="showReturn"/>
        <waybill-modal v-model="showWaybill" />

</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";
import { cornieClient } from "@/plugins/http";

import IInventroyStock from "@/types/IInventroyStock";
import ILocation from "@/types/ILocation";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/eye-yellow.vue";
import UpdateIcon from "@/components/icons/update-dynamic.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import CornieRadio from "@/components/cornieradio.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import CheckIcon from "@/components/icons/checkdynamic.vue";
import CheckInIcon from "@/components/icons/checkin.vue";
import NewTab from "@/components/newtab.vue";


import RequestIcon from "../icons/request.vue";
import ReturnIcon from "../icons/return.vue";
import AnalyticsIcon from "../icons/analytics.vue";
import CategoryIcon from "../icons/category.vue";
import ItemsIcon from "../icons/items.vue";
import ValueIcon from "../icons/value.vue";
import WithdrawIcon from "../icons/withdraw.vue";

import StorageModal from "../components/storageinfoModal.vue";
import AllocateModal from "../components/AllocateModal.vue";
import AllocateBulkModal from "../components/AllocatebulkModal.vue";
import DeactivateModal from "../components/Deactivate.vue";
import AvailabilityModal from "../components/availableModal.vue";
import WithdrawnInstructionModal from "../components/withdrawalInstrcution.vue";
import WithdrawItemModal from "../components/withdrawItemModal.vue";

import ViewstockModal from "../components/viewStockBalance.vue";
import BatchinfoModal from "../components/batchModal.vue";
import SupplyinfoModal from "../components/supplyModal.vue";

import RequestModal from "../../materialrequest/components/requestModal.vue";
import ReturnModal from "../../materialreturn/components/returnModal.vue";
import WaybillModal from "../../waybill/components/waybillModal.vue";

const location = namespace("location");
const inventorystock = namespace("inventorystock");
const user = namespace("user");

@Options({
  name: "totalExistingState",
  components: {
    CornieTable,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    DeactivateIcon,
    CategoryIcon,
    ItemsIcon,
    ValueIcon,
    Multiselect,
    CornieRadio,
    SelectOption,
    CheckIcon,
    CheckInIcon,
    RequestIcon,
    ReturnIcon,
    AnalyticsIcon,
    NewTab,
    StorageModal,
    AllocateModal,
    DeactivateModal,
    AvailabilityModal,
    AllocateBulkModal,
    WithdrawnInstructionModal,
    WithdrawItemModal,
    WithdrawIcon,
    ViewstockModal,
    BatchinfoModal,
    SupplyinfoModal,
    RequestModal,
    ReturnModal,
    WaybillModal,
  },
  
})
export default class totalExistingState extends Vue {

  @user.Getter
  authCurrentLocation!: string;

  @inventorystock.State
  inventorystocks!: IInventroyStock[];

  @inventorystock.Action
  fetchInventorystocks!: (locationId: string) => Promise<void>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  productId = "";
  query = "";
  loading = false;
  cdm = 0;
  selected = [] as any;
  isCheckAll = false;
  showStorage = false;
  showAllocate = false;
  showDeactivate = false;
  showAvailable = false;
  showAllocateBulk = false;
  withdrawInstruction = false;
  withdrawItemOnly = false;
  showViewStockbalance = false;
  showSupply = false;
  showBatch = false;
  showWaybill  = false;
  showReturn  = false;
  showRequest  = false;
  singleAllocateItem = [];
  BulkSelectedItem = [] as any;

  isCheck = false;
  withdrawItem = {} as any;
  storageItem = {} as any;
  selectItem = {} as any;
  stockId = "";

  checked = false;

 tabLinks = [
    "Total",
    "Holding",
    "Pharmacy",
    "Diagnostics",
    "InPatient"
  ];

  currentTab = 0;

  headers = [
    {
      title: "item code",
      key: "code",
      show: true,
    },
    {
      title: "item name",
      key: "name",
      show: true,
    },
    {
      title: "brand",
      key: "brand",
      show: true,
    },
    {
      title: "form",
      key: "form",
      show: true,
    },
    {
      title: "strength",
      key: "strength",
      show: false,
    },
    {
      title: "pack size",
      key: "false",
      show: false,
    },
    {
      title: "uofm",
      key: "uom",
      show: true,
    },
    {
      title: "opening",
      key: "opening",
      show: true,
    },
    {
      title: "issued",
      key: "issued",
      show: true,
    },
       {
      title: "added",
      key: "added",
      show: true,
    },
     {
      title: "balance",
      key: "balance",
      show: false,
    },
     {
      title: "total value (N)",
      key: "unitPrice",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  
  ];
  
  get items() {
    const inventorystocks = this.inventorystocks.map((inventorystock: any) => {
      return {
        ...inventorystock,
        unitPrice:'₦' +(+inventorystock.unitPrice).toFixed(2)
     
      };
    });

    if (!this.query) return inventorystocks;
    return search.searchObjectArray(inventorystocks, this.query);
  }

  getsales(value: any, id: string) {
    const pt = value.find((i: any) => value.length > 0);
    return pt ? `${pt?.unitName}` : "";
  }

  getDiscount(value: any, id: string) {
    const pt = value.find((i: any) => value.length > 0);
    return pt ? `${pt?.discountLimit}` : "";
  }

  getcdmprice(value: any, id: string) {
    const pt = value.find((i: any) => i.productId === id);
    return pt ? `${pt?.unitCost}` : "";
  }

  get sortProduct() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
 async stockAdded() {
    if(this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
    this.singleAllocateItem = [];
    this.BulkSelectedItem = [];
  }

  showStorageModal(value:any){
    this.showStorage= true;
    this.storageItem = value;
  }

  showView(value:any){
    this.showViewStockbalance = true;
    this.selectItem = value;
  }

  showBatchInfo(value:any){
    this.showBatch = true;
    this.selectItem = value;
    this.BulkSelectedItem = [...value];
  }

  showSupplyInfo(value:any){
    this.showSupply = true;
    this.selectItem = value;
    this.BulkSelectedItem = [...value];
  }

  showAvailableModal(id:string,value:any){
    this.showAvailable = true;
    this.selectItem = value;
    this.stockId = id;
  }

  showAllocateModal(value:any){
    this.showAllocate = true;
    this.singleAllocateItem = value;
  }

  showWithdrawalInstructionModal(value:any){
    this.withdrawInstruction = true
    this.withdrawItem = value;
  }
  showDeactivateModal(value:any){
    this.showDeactivate = true
    this.withdrawItem = value;
  }
  showWithdrawItemOnly(value:any){
    this.withdrawItemOnly = true;
     this.withdrawItem = value;
  }
  checkAll() {
      console.log('Hello World');
        let index: string;
        this.selected = [];
        if (!this.isCheckAll) {
            for (index in this.locations) {
                this.selected.push(this.allLocations[index].code);
            }
        }
  }

  selectedItem(value:any, valueindex:number){
     this.BulkSelectedItem = [...value];
  }
 

  get allLocations() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }

   async activate(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to activate this stock",
        title: "Activate Stock",
      });
      if (confirmed) {
        
           try {
      const response = await cornieClient().patch(`/api/v1/inventory/stock/activate/${id}`, {});
      if (response.success) {
        window.notify({
          msg: "Stock Activated Successfully",
          status: "success",
        });
        this.stockAdded();
      }
    } catch (error: any) {
      window.notify({ msg: error?.response?.data?.message, status: "error" });
    }
      } 
      
    } catch (error) {}
  }

  
  async created() {
    if(this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
    await this.fetchLocations();
  }
  
}
</script>

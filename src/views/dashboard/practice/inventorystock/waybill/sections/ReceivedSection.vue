<template>
  <div>
    <div>
      <span class="flex justify-end w-full mb-12">
        <button
          type="button"
          @click="showWaybill = true"
          class="bg-danger rounded-lg text-white py-2 px-6"
        >
          New Waybill
        </button>
      </span>
    </div>
    <cornie-table v-model="items" :columns="headers">
      <template #status="{ item }">
        <span
          class="bg-gray-100 text-gray-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'draft'"
        >
          Draft
        </span>
        <span
          class="bg-green-100 text-green-600 rounded-lg p-2 text-xs"
          v-if="
            item.status === 'received' ||
            item.status === 'active' ||
            item.status === 'submitted' ||
            item.status === 'issued'
          "
        >
          {{ item.status }}
        </span>
        <span
          class="bg-red-100 text-red-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'cancelled' || item.status === 'declined'"
        >
          {{ item.status }}
        </span>
      </template>
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showViewModal(item)"
        >
          <new-view-icon class="text-blue-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          v-if="item.status === 'draft'"
          @click="showWaybillmodal(item.id)"
        >
          <edit-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>

        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showGrnModal(item.id, item)">
          <check-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">Good Received Note</span>
        </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="approveWaybill(item.id)"
          v-if="item.status != 'declined'"
        >
          <check-icon class="text-green-700 fill-current" />
          <span class="ml-3 text-xs">Receive</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="declineWaybill(item.id)"
          v-if="item.status != 'declined'"
        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Decline</span>
        </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="cancelWaybill(item.id)"
        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
    </cornie-table>
  </div>
  <waybill-modal v-model="showWaybill" @waybillAdded="waybillAdded" />
  <other-modal v-model="showOtherWaybill" />
  <view-modal v-model="showview" />
  <grn-modal  v-model="grnShow" :waybillId="waybillId" :selectedItem="selectedItem"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";
import { cornieClient } from "@/plugins/http";

import IWaybill from "@/types/IWaybill";
import ILocation from "@/types/ILocation";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/eye.vue";
import UpdateIcon from "@/components/icons/update-dynamic.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import CornieRadio from "@/components/cornieradio.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import CheckIcon from "@/components/icons/checkdynamic.vue";
import CheckInIcon from "@/components/icons/checkin.vue";
import NewTab from "@/components/newtab.vue";
import CornieMenu from "@/components/CornieDropdown.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import CornieCard from "@/components/cornie-card";
import IconBtn from "@/components/CornieIconBtn.vue";
import CancelIcon from "@/components/icons/cancel.vue";

import WaybillModal from "../components/waybillModal.vue";
import OtherModal from "../components/otherwayBillModal.vue";
import ViewModal from "../components/viewModal.vue";
import GrnModal from "../../goods/components/grnModal.vue";

const location = namespace("location");
const waybill = namespace("waybill");
const user = namespace("user");

@Options({
  name: "IssuedExistingState",
  components: {
    ...CornieCard,
    CornieTable,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    DeactivateIcon,
    CancelIcon,
    CornieMenu,
    Multiselect,
    CornieRadio,
    SelectOption,
    CheckIcon,
    WaybillModal,
    IconBtn,
    CheckInIcon,
    ChevronDownIcon,
    NewTab,
    ViewModal,
    OtherModal,
    GrnModal,
  },
})
export default class IssuedExistingState extends Vue {
  @user.Getter
  authCurrentLocation!: string;

  @waybill.State
  waybills!: IWaybill[];

  @waybill.Action
  fetchWaybillIncoming!: (locationId: string) => Promise<void>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  selectedItem = {};

  productId = "";
  query = "";
  loading = false;
  cdm = 0;
  selected = [] as any;
  isCheckAll = false;
  showRequest = false;
  showview = false;
  showWaybill = false;
  showOtherWaybill = false;
  waybillId = "";
  grnShow = false;

  tabLinks = ["Total", "Holding", "Pharmacy", "Diagnostics", "InPatient"];

  currentTab = 0;

  headers = [
    {
      title: "date requested",
      key: "submittedOn",
      show: true,
    },
    {
      title: "waybill id",
      key: "identifier",
      show: true,
    },
    {
      title: "processed by",
      key: "receiverName",
      show: true,
    },
    {
      title: "reference",
      key: "referenceIdentifier",
      show: true,
    },
    {
      title: "deliver to",
      key: "deliver",
      show: true,
    },
    {
      title: "item count",
      key: "count",
      show: true,
    },
    {
      title: "boq",
      key: "boq",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  get activepatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  get items() {
    const waybills = this.waybills.map((waybill: any) => {
      return {
        ...waybill,
        action: waybill.id,
        deliver: this.getLocationName(waybill.receiverLocationId),
        count: waybill.items.length,
        boq: "XXXXXX",
          total: " ₦ " + this.getTotalCost(waybill.items).toFixed(2)
      };
    });

    if (!this.query) return waybills;
    return search.searchObjectArray(waybills, this.query);
  }

   showGrnModal(value:string, item:any){
    this.grnShow = true;
    this.waybillId = value;
    this.selectedItem = item;
  }

  getLocationName(id: string) {
    const pt = this.locations.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
    getTotalCost(value: any) {
    return value
      .map((item: any) => item.quantity * item.unitCost)
      .reduce((a: any, b: any) => a + b, 0);
  }


  async waybillAdded() {
    await this.fetchWaybillIncoming(this.authCurrentLocation);
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

   showViewModal(value:any){
    this.showview = true;
    this.selectedItem = value;
  }
  showWaybillmodal(value:string){
    this.showWaybill = true;
    this.waybillId = value;
  }

  async approveWaybill(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to receive this waybill",
        title: "Receive Waybill",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/waybill/receive/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Waybill recevied Successfully",
              status: "success",
            });
            this.waybillAdded();
          }
        } catch (error: any) {
          window.notify({
            msg: error?.response?.data?.message,
            status: "error",
          });
        }
      }
    } catch (error) {}
  }
  async declineWaybill(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to decline this waybill",
        title: "Decline waybill",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/waybill/decline/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Waybill  declined Successfully",
              status: "success",
            });
            this.waybillAdded();
          }
        } catch (error: any) {
          window.notify({
            msg: error?.response?.data?.message,
            status: "error",
          });
        }
      }
    } catch (error) {}
  }

   async cancelWaybill(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to cancel this waybill",
        title: "Cancel waybill",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/waybill/cancel/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Waybill cancelled Successfully",
              status: "success",
            });
            this.waybillAdded();
          }
        } catch (error: any) {
          window.notify({
            msg: error?.response?.data?.message,
            status: "error",
          });
        }
      }
    } catch (error) {}
  }


  async created() {
    await this.fetchWaybillIncoming(this.authCurrentLocation);
    await this.fetchLocations();
  }
}
</script>

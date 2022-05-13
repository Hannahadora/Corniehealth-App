<template>
  <div>
    <div>
      <span class="flex justify-end w-full mb-12">
        <cornie-btn
          class="
            bg-danger
            rounded-lg
            text-white
            mt-5
            px-2
            mb-5
            font-semibold
            focus:outline-none
            hover:opacity-90
          "
        >
          Create New
          <cornie-menu
            top="0px"
            right="100%"
            class="border-l-2 h-full ml-2 border-white"
          >
            <template #activator="{ on }">
              <icon-btn v-on="on">
                <chevron-down-icon
                  v-on="on"
                  class="text-white mb-2 stroke-current mt-2 ml-1"
                />
              </icon-btn>
            </template>
            <cornie-card-text>
              <div
                class="
                  flex
                  mb-3
                  items-center
                  hover:bg-gray-100
                  px-2
                  py-2
                  rounded-full
                  cursor-pointer
                "
                @click="showGRN = true"
              >
                <span class="ml-3 text-black text-sm">New Supply</span>
              </div>
              <div
                class="
                  flex
                  mb-3
                  items-center
                  hover:bg-gray-100
                  px-2
                  py-2
                  rounded-full
                  cursor-pointer
                "
                @click="showotherGRN = true"
              >
                <span class="ml-3 text-black text-sm"
                  >From Material Request</span
                >
              </div>
              <div
                class="
                  flex
                  mb-3
                  items-center
                  hover:bg-gray-100
                  px-2
                  py-2
                  rounded-full
                  cursor-pointer
                "
                @click="showotherGRN = true"
              >
                <span class="ml-3 text-black text-sm"
                  >From Material Return</span
                >
              </div>
              <div
                class="
                  flex
                  mb-3
                  items-center
                  hover:bg-gray-100
                  px-2
                  py-2
                  rounded-full
                  cursor-pointer
                "
                @click="showotherGRN = true"
              >
                <span class="ml-3 text-black text-sm">From Waybill</span>
              </div>
            </cornie-card-text>
          </cornie-menu>
        </cornie-btn>
      </span>
    </div>
    <cornie-table v-model="sortGrn" :columns="headers">
      <template #statusitem="{ item }">
        <span
          class="bg-green-100 text-green-600 rounded-lg p-2 text-xs"
          v-if="item.supplyStatus === 'received'"
        >
          Received
        </span>
        <span
          class="bg-red-100 text-red-600 rounded-lg p-2 text-xs"
          v-if="item.supplyStatus === 'cancelled'"
        >
          Cancelled
        </span>
        <span
          class="bg-gray-100 text-gray-600 rounded-lg p-2 text-xs"
          v-if="item.supplyStatus === 'draft'"
        >
          Draft
        </span>
      </template>
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showViewModal(item)"
        >
          <new-view-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showtimeline = true"
        >
          <new-view-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">View Timeline</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          v-if="item.supplyStatus === 'draft'"
          @click="showGrnModal(item.id)"
        >
          <edit-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
           v-if="item.supplyStatus === 'draft'"
          @click="Cancelgrn(item.id)"
        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
    </cornie-table>
  </div>
  <grn-modal v-model="showGRN" @grnAdded="grnAdded" :id="GrnId" />
  <other-grn-modal v-model="showotherGRN" />
  <timeline-modal v-model="showtimeline" />
  <view-modal v-model="showview"  :selectedItem="selectedItem"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";
import { cornieClient } from "@/plugins/http";

import IGrn from "@/types/IGrn";
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

import GrnModal from "../components/grnModal.vue";
import OtherGrnModal from "../components/othergrnModal.vue";
import TimelineModal from "../components/timelineModal.vue";
import ViewModal from "../components/viewModal.vue";

const location = namespace("location");
const grn = namespace("grn");

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
    TimelineModal,
    CornieMenu,
    Multiselect,
    CornieRadio,
    SelectOption,
    CheckIcon,
    GrnModal,
    IconBtn,
    CheckInIcon,
    ChevronDownIcon,
    NewTab,
    OtherGrnModal,
    ViewModal,
  },
})
export default class IssuedExistingState extends Vue {
  @grn.State
  grns!: IGrn[];

  @grn.Action
  fetchGrns!: () => Promise<void>;

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
  showGRN = false;
  showotherGRN = false;
  showtimeline = false;
  showview = false;
  GrnId = "";
  selectedItem = {};

  tabLinks = ["Total", "Holding", "Pharmacy", "Diagnostics", "InPatient"];

  currentTab = 0;

  headers = [
    {
      title: "DATE received",
      key: "dateReceived",
      show: true,
    },
    {
      title: "GRN NO",
      key: "identifier",
      show: true,
    },
    {
      title: "SUPPLIER",
      key: "SUPPLIER",
      show: true,
    },
    {
      title: "RECEIVER",
      key: "receivedBy",
      show: true,
    },
    {
      title: "received to",
      key: "receiveTo",
      show: true,
    },
    {
      title: "item count",
      key: "count",
      show: true,
    },
    {
      title: "Boq",
      key: "cdm",
      show: true,
    },
    {
      title: "total cost",
      key: "total",
      show: true,
    },
    {
      title: "Status",
      key: "statusitem",
      show: true,
    },
  ];

  get items() {
    const grns = this.grns.map((grn: any) => {
      return {
        ...grn,
        action: grn.id,
        receivedBy: grn.receivedBy.name,
        receiveTo: this.getLocationName(grn.receiverLocationId),
        count: grn.supplyItems.length,
        SUPPLIER: grn.supplyItems[0].supplier,
        total: " ₦ " + this.getTotalCost(grn.supplyItems).toFixed(2),
      };
    });

    if (!this.query) return grns;
    return search.searchObjectArray(grns, this.query);
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
  showGrnModal(value: string) {
    this.showGRN = true;
    this.GrnId = value;
  }

  showViewModal(item:any){
    this.showview = true
    this.selectedItem = item;
  }

  getcdmprice(value: any, id: string) {
    const pt = value.find((i: any) => i.productId === id);
    return pt ? `${pt?.unitCost}` : "";
  }

  get sortGrn() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  async grnAdded() {
    await this.fetchGrns();
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

  async Cancelgrn(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to cancel this goods received note",
        title: "Cancel good received note",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().patch(
            `/api/v1/inventory/grn/draft/cancel/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Goods recevied note cancelled Successfully",
              status: "success",
            });
            this.grnAdded();
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
    await this.fetchGrns();
    await this.fetchLocations();
  }
}
</script>

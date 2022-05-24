<template>
  <div>
    <div>
      <span class="flex justify-end w-full mb-12">
        <button
        type="button"
        @click="showRequest = true"
          class="
            bg-danger
            rounded-lg
            text-white
           py-2 px-6
          "
        >
           New Return
        </button>
      </span>
    </div>
    <cornie-table v-model="sortMaterialReturn" :columns="headers">
       <template #status="{ item }">
          <span
          class="bg-gray-100 text-gray-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'draft'"
        >
          Draft
        </span>
        <span
          class="bg-green-100 text-green-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'received' || item.status === 'active' || item.status === 'submitted' || item.status === 'issued'"
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
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showViewModal(item)">
          <new-view-icon class="text-blue-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="issueRequest(item.id)"
          v-if="item.status != 'declined'"
        >
          <check-icon class="text-purple-400 fill-current" />
          <span class="ml-3 text-xs">Issue</span>
        </div>
          <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="Approverequest(item.id)"
          v-if="item.status != 'declined'"
        >
          <check-icon class="text-green-700 fill-current" />
          <span class="ml-3 text-xs">Receive</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="declineRequest(item.id)"
          v-if="item.status != 'declined'"
        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Decline</span>
        </div>
      
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showtimeline = true"
        >
          <new-view-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">View Timeline</span>
        </div> -->
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
         v-if="item.status === 'draft'"
          @click="showRequestModal(item.id)"
        >
          <edit-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>

         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showWaybillmodal(item.id)">
                <plus-icon class="text-purple-700 fill-current" />
                <span class="ml-3 text-xs">Create Waybill</span>
           </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="Cancelreuqest(item.id)"
        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
    </cornie-table>
  </div>
  <return-modal v-model="showRequest" @returnAdded="returnAdded" :id="requestId"/>
  <view-modal v-model="showview" :selectedItem="selectedItem"/>
  <waybill-modal :returnId="waybillId" v-model="showWaybill" @waybillAdded="returnAdded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";
import { cornieClient } from "@/plugins/http";

import IMaterialReturn, { Items } from "@/types/IMaterialRequest";
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


import ReturnModal from "../components/returnModal.vue";
import ViewModal from "../components/viewModal.vue"

import ActiveIcon from "../icons/active.vue";
import TotalIcon from "../icons/total.vue";
import CloseIcon from "../icons/close.vue";
import WaybillModal from "../../waybill/components/waybillModal.vue";


const location = namespace("location");
const user = namespace("user");
const materialreturn = namespace("materialreturn");

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
    ActiveIcon,
    TotalIcon,
    CheckIcon,
    CloseIcon,
    ReturnModal,
    IconBtn,
    CheckInIcon,
    ChevronDownIcon,
    NewTab,
    ViewModal,
    WaybillModal,
  },
})
export default class IssuedExistingState extends Vue {
    @user.Getter
  authCurrentLocation!: string;

  @materialreturn.State
  materialreturns!: IMaterialReturn[];

  @materialreturn.Action
  fetchMaterialReturnOutgoing!: (locationId: string) => Promise<void>;


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
  showRequest = false;
  showview = false;
  showtimeline  = false;
  requestId = "";
  selectedItem = {};
    showWaybill = false;
  waybillId = "";

  tabLinks = ["Total", "Holding", "Pharmacy", "Diagnostics", "InPatient"];

  currentTab = 0;

  headers = [
    {
      title: "date processed",
      key: "processedOn",
      show: true,
    },
    {
      title: "return #",
      key: "identifier",
      show: true,
    },
    {
      title: "requester",
      key: "requester",
      show: true,
    },
    {
      title: "entity",
      key: "keydisplay",
      show: true,
    },
    {
      title: "process",
      key: "validity",
      show: true,
    },
    {
      title: "item count",
      key: "count",
      show: true,
    },
    {
      title: "boq",
      key: "keydisplay",
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
    const materialreturns = this.materialreturns.map((materialreturn: any) => {
      return {
        ...materialreturn,
        action: materialreturn.id,
        keydisplay: "XXXXXXX",
        code: "xxxxxxx",
        requester: materialreturn?.processedBy?.name,
        count: materialreturn?.items.length,
       
      };
    });

    if (!this.query) return materialreturns;
    return search.searchObjectArray(materialreturns, this.query);
  }


  get sortMaterialReturn() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  getLocationName(id: string) {
    const pt = this.locations.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
  async returnAdded() {
     if (this.authCurrentLocation) await this.fetchMaterialReturnOutgoing(this.authCurrentLocation);
  }

  showRequestModal(value:string){
    this.showRequest = true;
    this.requestId = value;
  }

  showViewModal(value:any){
    this.showview = true;
    this.selectedItem = value;
  }

  showWaybillmodal(value:string){
    this.showWaybill = true;
    this.waybillId = value;
  }

  checkAll() {
    console.log("Hello World");
    let index: string;
    this.selected = [];
    if (!this.isCheckAll) {
      for (index in this.locations) {
        this.selected.push(this.allLocations[index].code);
      }
    }
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

  async issueRequest(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to issue this material return",
        title: "Issue material return",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/material-return/issue/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Material return issued Successfully",
              status: "success",
            });
            this.returnAdded();
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

async Approverequest(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to receive this material request",
        title: "Receive material request",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/material-return/receive/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Material return received Successfully",
              status: "success",
            });
            this.returnAdded();
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
  async declineRequest(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to decline this material return",
        title: "Decline material return",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/material-return/decline/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Material return declined Successfully",
              status: "success",
            });
            this.returnAdded();
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

   async Cancelreuqest(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to cancel this material return",
        title: "Cancel material return",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/material-return/cancel/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Material return cancelled Successfully",
              status: "success",
            });
            this.returnAdded();
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
    if (this.authCurrentLocation) await this.fetchMaterialReturnOutgoing(this.authCurrentLocation);
    await this.fetchLocations();
  }
}
</script>

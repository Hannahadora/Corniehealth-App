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
          New Request
        </button>
      </span>
    </div>
    <cornie-table v-model="sortMaterialRequest" :columns="headers">
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
         <span
          class="bg-yellow-100 text-yellow-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'processed' || item.status === 'pending' || item.status === 'in-progress'"
        >
          {{ item.status }}
        </span>
      </template>
      <template #availability="{ item }">
        <div class="text-no-wrap">
          <span class="status p-1 bolder"> {{ item.availability }}</span>
        </div>
      </template>
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showViewModal(item)">
          <new-view-icon class="text-blue-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
          <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="Approverequest(item.id)"
          v-if="item.status != 'declined'"
        >
          <check-icon class="text-green-700 fill-current" />
          <span class="ml-3 text-xs">Approve</span>
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

         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <check-icon class="text-purple-700 fill-current" />
                <span class="ml-3 text-xs">Good Received Note</span>
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
  <request-modal v-model="showRequest" @requestAdded="requestAdded" :id="requestId"/>
  <view-modal v-model="showview" :selectedItem="selectedItem"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";
import { cornieClient } from "@/plugins/http";

import IMaterialRequest, { Items } from "@/types/IMaterialRequest";
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


import RequestModal from "../components/requestModal.vue";
import ViewModal from "../components/viewModal.vue"

import ActiveIcon from "../icons/active.vue";
import TotalIcon from "../icons/total.vue";
import CloseIcon from "../icons/close.vue"

const location = namespace("location");
const user = namespace("user");
const materialrequest = namespace("materialrequest");

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
    RequestModal,
    IconBtn,
    CheckInIcon,
    ChevronDownIcon,
    NewTab,
    ViewModal,
  },
})
export default class IssuedExistingState extends Vue {
    @user.Getter
  authCurrentLocation!: string;

  @materialrequest.State
  materialrequests!: IMaterialRequest[];

  @materialrequest.Action
  fetchMaterialRequestsOutgoing!: (locationId: string) => Promise<void>;

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

  tabLinks = ["Total", "Holding", "Pharmacy", "Diagnostics", "InPatient"];

  currentTab = 0;

  headers = [
    {
      title: "date requested",
      key: "dateRequested",
      show: true,
    },
    {
      title: "request #",
      key: "requesterId",
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
      title: "validity",
      key: "validity",
      show: true,
    },
    {
      title: "delivery address",
      key: "address",
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
    const materialrequests = this.materialrequests.map((materialrequest: any) => {
      return {
        ...materialrequest,
        action: materialrequest.id,
        keydisplay: "XXXXXXX",
        code: "xxxxxxx",
        requester: materialrequest.requestedBy.name,
        validity: new Date(materialrequest.materialrequest as any).toDateString(),
        address: this.getLocationName(materialrequest.supplyLocationId),
        count: materialrequest.items.length,
        supplyaddress: this.getLocationName(materialrequest.supplyLocationId),



      };
    });

    if (!this.query) return materialrequests;
    return search.searchObjectArray(materialrequests, this.query);
  }


  get sortMaterialRequest() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  getLocationName(id: string) {
    const pt = this.locations.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
  async requestAdded() {
     if (this.authCurrentLocation) await this.fetchMaterialRequestsOutgoing(this.authCurrentLocation);
  }

  showRequestModal(value:string){
    this.showRequest = true;
    this.requestId = value;
  }

  showViewModal(value:any){
    this.showview = true;
    this.selectedItem = value;
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

async Approverequest(id: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "You are about to approve this material request",
        title: "Approve material request",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/material-request/approve/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Material request approved Successfully",
              status: "success",
            });
            this.requestAdded();
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
        message: "You are about to decline this material request",
        title: "Decline material request",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/material-request/decline/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Material request declined Successfully",
              status: "success",
            });
            this.requestAdded();
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
        message: "You are about to cancel this material request",
        title: "Cancel material request",
      });
      if (confirmed) {
        try {
          const response = await cornieClient().post(
            `/api/v1/inventory/material-request/cancel/${id}`,
            {}
          );
          if (response.success) {
            window.notify({
              msg: "Material request cancelled Successfully",
              status: "success",
            });
            this.requestAdded();
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
    if (this.authCurrentLocation) await this.fetchMaterialRequestsOutgoing(this.authCurrentLocation);
    await this.fetchLocations();
  }
}
</script>

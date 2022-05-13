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
    <cornie-table v-model="items" :columns="headers">
      <template #name="{ item }">
        <div
          class="text-no-wrap flex items-center uppercase text-xs"
          style="white-space: nowrap"
        >
          <Avatar :src="item.image" />
          <span class="ml-2">{{ item.name }}</span>
        </div>
      </template>
      <template #itemCode-header>
        <div
          class="text-no-wrap flex uppercase text-xs"
          style="white-space: nowrap"
        >
          Item Code
        </div>
      </template>
      <template #status="{ item }">
        <div class="text-no-wrap">
          <span
            class="status p-1"
            :class="{
              active: item.status === 'active',
              inactive: item.status === 'inactive',
            }"
          >
            {{ item.status }}</span
          >
        </div>
      </template>
      <template #availability="{ item }">
        <div class="text-no-wrap">
          <span class="status p-1 bolder"> {{ item.availability }}</span>
        </div>
      </template>
      <template #actions>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showview = true">
          <new-view-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showtimeline = true"
        >
          <new-view-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">View Timeline</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <edit-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"

        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
    </cornie-table>
  </div>
  <request-modal v-model="showRequest" @requestAdded="requestAdded"/>
  <view-modal v-model="showview" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";

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
  showRequest = false;
  showview = false;
  showtimeline  = false;

  tabLinks = ["Total", "Holding", "Pharmacy", "Diagnostics", "InPatient"];

  currentTab = 0;

  headers = [
    {
      title: "request date",
      key: "genericName",
      show: true,
    },
    {
      title: "reference no",
      key: "code",
      show: true,
    },
    {
      title: "requester",
      key: "category",
      show: true,
    },
    {
      title: "request reason",
      key: "description",
      show: true,
    },
    {
      title: "item count",
      key: "brand",
      show: true,
    },
    {
      title: "boq",
      key: "sales",
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
        createdAt: "19-07-21",
        condition: "Accident Prone",
        deceased: "No",
      };
    });

    if (!this.query) return materialrequests;
    return search.searchObjectArray(materialrequests, this.query);
  }


  get sortProduct() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  async requestAdded() {
     if (this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
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


  async created() {
    if (this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
    await this.fetchLocations();
  }
}
</script>

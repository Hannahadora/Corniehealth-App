<template>
  <div>
    <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-lg text-white mt-5 py-2 pr-5 pl-5 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
        @click="showInventoryRequest = true"
      >
        Add New
      </button>
    </span>
    <!-- <div class="flex justify-start space-x-6 w-full mb-8">
      <span class="flex space-x-4">
        <medication-drug class="mr-2" /> Substitution Allowed
      </span>
      <span class="flex space-x-4">
        <refill-drug class="mr-2" /> Refilled Required
      </span>
    </div> -->
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <edit-icon class="text-purple-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showViewModal(item.classes)"
        >
          <newview-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View Inventory Category(s)</span>
        </div>
        <div
          @click="showAddCategory(item.id, item.classes)"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <add-blue />
          <span class="ml-3 text-xs">Add Inventory Category(s)</span>
        </div>
        <div
          @click="deactivateC(item.id)"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <close-icon class="text-red-600 fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
      </template>
    </cornie-table>
    <inventory-location-modal
      v-model="showInventoryRequest"
      :selectedItem="selectedItem"
    />
    <view-category v-model="showView" :selectedItem="selectedItem" />
    <add-inventory-modal v-model="showAddC" :selectedItem="selectedItem" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyState from "./emptyState.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import InventoryLocationModal from "./locationModal.vue";
import EditIcon from "@/components/icons/edit.vue";
import Addblue from "@/components/icons/addblue.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import ILocation from "@/types/ILocation";
import ViewCategory from "./view-category.vue";
import AddInventoryModal from "./add-inventory-modal.vue";

const inventory = namespace("inventorysettings");

@Options({
  components: {
    EmptyState,
    CornieTable,
    InventoryLocationModal,
    EditIcon,
    Addblue,
    NewviewIcon,
    CloseIcon,
    ViewCategory,
    AddInventoryModal,
  },
})
export default class InventoryLocationExistingState extends Vue {
  @inventory.Action
  deactivateL!: (data: any) => Promise<void>;

  @inventory.State
  locations!: ILocation;

  showEditDetails = false;
  showInventoryRequest = false;
  showView = false;
  showAddC = false;
  selectedItem: any = "";
  rawHeaders = [
    {
      title: "name",
      key: "name",
      show: true,
      noOrder: true,
    },
    { title: "type", key: "type", show: true, noOrder: true },
    {
      title: "address",
      key: "address",
      show: true,
      noOrder: true,
    },
    {
      title: "city/state",
      key: "city",
      show: true,
      noOrder: true,
    },
    {
      title: "manager",
      key: "manager",
      show: true,
      noOrder: true,
    },
    {
      title: "inventory category(s)",
      key: "classes",
      show: true,
      noOrder: true,
    },

    {
      title: "status",
      key: "status",
      show: true,
    },
  ];

  showViewModal(item: any) {
    this.showEditDetails = false;
    this.selectedItem = item;
    this.showView = true;
  }

  showEditModal(item: any) {
    this.showView = false;
    this.showInventoryRequest = true;
    this.selectedItem = item;
  }

  showAddCategory(id: string, data: any[]) {
    this.selectedItem = {
      id,
      data,
    };
    this.showAddC = true;
  }

  async deactivateC(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to deactivate this location?",
      yes: "Yes",
      no: "No",
      title: "Deactivate",
    });
    if (!confirmed) return;

    try {
      this.deactivateL(id);
      window.notify({
        msg: "Authorized Locations Swtiched",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "Authorized Locations not Swtiched",
        status: "error",
      });
    }
  }

  get items() {
    return this.locations;
  }
}
</script>

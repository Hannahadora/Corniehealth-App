<template>
  <div>
    <div class="grid grid-cols-3 gap-6 pt-10">
      <div v-for="n in 3" class="flex items-center p-7 shadow-md rounded-2xl">
        <div class="flex-1">
          <div class="flex flex-col">
            <div class="font-light">Location</div>
            <div class="font-bold">Total Number: {{ items.length }}</div>
          </div>
        </div>
        <div class="flex-none">
          <img src="@/assets/img/total-location.svg" height="60" width="60" />
        </div>
      </div>
      <!-- <div class="flex items-center p-7 shadow-md rounded-2xl">
        <div class="flex-1">
          <div class="flex flex-col">
            <div class="font-light">Location</div>
            <div class="font-bold">Total Number: {{ items.length }}</div>
          </div>
        </div>
        <div class="flex-none">
          <img src="@/assets/img/total-location.svg" height="60" width="60" />
        </div>
      </div> -->
    </div>
    <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-lg text-white mt-5 py-2 pr-5 pl-5 px-7 mb-5 font-semibold focus:outline-none hover:opacity-90"
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
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import Addblue from "@/components/icons/addblue.vue";
  import CloseIcon from "@/components/icons/CloseIcon.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import NewviewIcon from "@/components/icons/newview.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import AddInventoryModal from "./add-inventory-modal.vue";
  import EmptyState from "./emptyState.vue";
  import InventoryLocationModal from "./locationModal.vue";
  import ViewCategory from "./view-category.vue";

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
    @Prop()
    location!: any[];

    @inventory.Action
    deactivateL!: (data: any) => Promise<void>;

    showEditDetails = false;
    showInventoryRequest = false;
    showView = false;
    showAddC = false;
    selectedItem: any = "";
    rawHeaders = [
      {
        title: "Manager",
        key: "manager",
        show: true,
        noOrder: true,
      },

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
        title: "phone",
        key: "phone",
        show: true,
        noOrder: true,
      },
      {
        title: "Email",
        key: "email",
        show: true,
        noOrder: true,
      },
      // {
      //   title: "inventory category(s)",
      //   key: "classes",
      //   show: true,
      //   noOrder: true,
      // },

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
      console.log("idd", id);
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
          msg: "Locations Deactivated",
          status: "success",
        });
        window.location.reload();
      } catch (error) {
        // window.notify({
        //   msg: "Err",
        //   status: "error",
        // });
        console.log("deactivate", error);
      }
    }

    get items() {
      console.log("exists", this.location);
      return this.location;
    }
  }
</script>

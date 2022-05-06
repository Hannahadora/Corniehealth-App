<template>
  <div>
    <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-lg text-white mt-5 py-2 pr-5 pl-5 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
        @click="showInventoryRequest = true">
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
        <div v-if="item.status == 'inactive'">
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDetailsModal(item)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View </span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <check class="text-green-600 fill-current" />
            <span class="ml-3 text-xs">Activate</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <span class="ml-3 text-xs">Add to locations</span>
          </div>
        </div>

        <div v-if="item.status == 'active'">
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDetailsModal(item)">
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View </span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">

            <span class="ml-3 text-xs">Add to locations</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <!-- <Check class="text-green-600 fill-current" /> -->
            <close-icon class="text-red-600 fill-current" />
            <span class="ml-3 text-xs">Deactivate</span>
          </div>
        </div>

      </template>
      <template #location="{ item }">
        <div>{{ item.location }}
          <newview-icon class="text-yellow-500 ml-2 fill-current" />
        </div>
      </template>
      <template #status="{ item }">
        <p class="text-xs bg-red-300 text-red-600 p-1 rounded capitalize" v-if="item.status == 'inactive'">
          {{ item.status }}
        </p>
        <p class="text-xs bg-green-100 text-green-500 p-1 rounded capitalize" v-if="item.status == 'active'">
          {{ item.status }}
        </p>
      </template>
    </cornie-table>
    <inventory-modal v-model="showInventoryRequest" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyState from "./emptyState.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import User, { CornieUser } from "@/types/user";
import { namespace } from "vuex-class";
import InventoryModal from "./inventoryModal.vue";
import ICategory from "@/types/ICategory";
import NewviewIcon from "@/components/icons/newview.vue";
import Check from "@/components/icons/check.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";


const account = namespace("user");
const inventory = namespace('inventorysettings')

@Options({
  components: {
    EmptyState,
    CornieTable,
    InventoryModal,
    NewviewIcon,
    Check,
    CloseIcon
  }
})

export default class InventoryExistingState extends Vue {
  showInventoryRequest = false
  showDetails = false
  selectedItem = false
  rawHeaders = [
    {
      title: "identifier",
      key: "id",
      show: true,
      noOrder: true
    },
    { title: "subject (PATIENT)", key: "subject", show: true, noOrder: true },
    {
      title: "created by",
      key: "created",
      show: true,
      noOrder: true
    },
    {
      title: "date created",
      key: "date",
      show: true,
      noOrder: true
    },
    {
      title: "last modified",
      key: "modified",
      show: true,
      noOrder: true
    },
    {
      title: "locations",
      key: "location",
      show: true,
      noOrder: true
    },

    {
      title: "status",
      key: "status",
      show: true,
    },

  ];

  showDetailsModal(item: any) {
    this.selectedItem = item;
    this.showDetails = true;
  }

  @inventory.State
  categories!: ICategory[]

  get items() {
    return this.categories
  }
}
</script>
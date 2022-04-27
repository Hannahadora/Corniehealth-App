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
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <!-- <edit-icon class="text-purple-700 fill-current" /> -->
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDetailsModal(item)">
          <!-- <eye-icon class="text-purple-700 fill-current" /> -->
          <span class="ml-3 text-xs">View Inventory Category(s)</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">

          <span class="ml-3 text-xs">Add Inventory Category(s)</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">

          <span class="ml-3 text-xs">Deactivate</span>
        </div>


      </template>
      <template #name="{ item }">
        <!-- <p>{{ item.identifier }}</p>
        <p class="text-gray-400">{{ new Date(item.createdAt).toLocaleDateString() }}</p> -->
        <p class="text-gray-400">XXXXXX</p>

      </template>
    </cornie-table>

  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyState from "./emptyState.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

@Options({
  components: {
    EmptyState,
    CornieTable
  }
})

export default class InventoryLocationExistingState extends Vue {
  showInventoryRequest = false
  items = []
  showDetails = false
  selectedItem = false
  rawHeaders = [
    {
      title: "name",
      key: "name",
      show: true,
      noOrder: true
    },
    { title: "type", key: "type", show: true, noOrder: true },
    {
      title: "address",
      key: "address",
      show: true,
      noOrder: true
    },
    {
      title: "city/state",
      key: "city",
      show: true,
      noOrder: true
    },
    {
      title: "manager",
      key: "manager",
      show: true,
      noOrder: true
    },
    {
      title: "inventory category(s)",
      key: "category",
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
}
</script>
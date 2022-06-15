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
      <template #phone="{ item }">
        <div>{{ item.phone.number }}</div>
      </template>
      <template #actions="{ item }">
        <div v-if="item.status == 'inactive'">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showDetailsModal(item)"
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View </span>
          </div>
          <div
            @click="showUpdateModal(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-report-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <div
            @click="activateCat(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <check class="text-green-600 fill-current" />
            <span class="ml-3 text-xs">Activate</span>
          </div>
        </div>

        <div v-if="item.status == 'active'">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showDetailsModal(item)"
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View </span>
          </div>
          <div
            @click="showUpdateModal(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-report-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <div
            @click="deactivateCat(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <Check class="text-green-600 fill-current" /> -->
            <close-icon class="text-red-600 fill-current" />
            <span class="ml-3 text-xs">Deactivate</span>
          </div>
        </div>
      </template>
      <template #category="{ item }">
        <div class="capitalize">{{ item.category }} Inventory</div>
      </template>
      <!-- <template #location="{ item }">
        <div>
          {{ item.location }}
          <newview-icon class="text-yellow-500 ml-2 fill-current" />
        </div>
      </template> -->
      <template #status="{ item }">
        <span
          class="text-xs bg-red-100 text-red-600 p-1 rounded capitalize"
          v-if="item.status == 'inactive'"
        >
          {{ item.status }}
        </span>
        <span
          class="text-xs bg-green-100 text-green-500 p-1 rounded capitalize"
          v-if="item.status == 'active'"
        >
          {{ item.status }}
        </span>
      </template>
    </cornie-table>
    <view-category :selectedItem="selectedItem" v-model="showDetails" />
    <inventory-modal
      :selectedItem="selectedItem"
      v-model="showInventoryRequest"
    />
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import Check from "@/components/icons/check.vue";
  import CloseIcon from "@/components/icons/CloseIcon.vue";
  import NewviewIcon from "@/components/icons/newview.vue";
  import UpdateReportGreen from "@/components/icons/update-report-green.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import EmptyState from "./emptyState.vue";
  import InventoryModal from "./inventoryModal.vue";
  import viewCategory from "./viewCategories.vue";

  const account = namespace("user");
  const inventory = namespace("inventorysettings");

  @Options({
    components: {
      EmptyState,
      CornieTable,
      InventoryModal,
      NewviewIcon,
      Check,
      CloseIcon,
      UpdateReportGreen,
      viewCategory,
    },
  })
  export default class InventoryExistingState extends Vue {
    @Prop()
    categories!: any[];

    showInventoryRequest = false;
    showDetails = false;
    selectedItem = false;
    rawHeaders = [
      {
        title: "identifier",
        key: "idc",
        show: true,
        noOrder: true,
      },
      { title: "manager", key: "managerId", show: true, noOrder: true },
      {
        title: "category",
        key: "category",
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
        title: "email",
        key: "email",
        show: true,
        noOrder: true,
      },
      {
        title: "locations",
        key: "location",
        show: true,
        noOrder: true,
      },

      {
        title: "status",
        key: "status",
        show: true,
      },
    ];

    @inventory.Action
    deactivateC!: (data: any) => Promise<void>;

    @inventory.Action
    activateC!: (data: any) => Promise<void>;

    @inventory.Action
    getCategory!: () => Promise<void>;

    showDetailsModal(item: any) {
      this.selectedItem = item;
      this.showDetails = true;
    }

    showUpdateModal(item: any) {
      this.selectedItem = item;
      this.showInventoryRequest = true;
    }

    async deactivateCat(id: string) {
      console.log("idd", id);
      const confirmed = await window.confirmAction({
        message: "Are you sure you want to deactivate this category?",
        yes: "Yes",
        no: "No",
        title: "Deactivate",
      });
      if (!confirmed) return;
      this.deactivateC(id)
        .then(async () => {
          window.notify({
            msg: "Category Deactivated",
            status: "success",
          });
          await this.getCategory();
        })
        .catch(() => {
          window.notify({
            msg: "There was an error deactivating category",
            status: "error",
          });
        });
    }

    async activateCat(id: string) {
      this.activateC(id)
        .then(async () => {
          window.notify({
            msg: "Category activated",
            status: "success",
          });
          await this.getCategory();
        })
        .catch(() => {
          window.notify({
            msg: "There was an error activating category",
            status: "error",
          });
        });
    }

    get items() {
      return this.categories;
    }
  }
</script>

<template>
  <div>
    <div class="grid grid-cols-3 gap-6 pt-10">
      <div class="flex items-center p-7 shadow-md rounded-2xl">
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
      <div class="flex items-center p-7 shadow-md rounded-2xl">
        <div class="flex-1">
          <div class="flex flex-col">
            <div class="font-light">Geographical Spread</div>
            <div class="font-bold flex">
              {{ geoDisplay.country }} Country, {{ geoDisplay.state }} States,
              {{ geoDisplay.city }} Cities
            </div>
          </div>
        </div>
        <div class="flex-none">
          <img src="@/assets/img/total-geo.svg" height="60" width="60" />
        </div>
      </div>
      <div class="flex items-center p-7 shadow-md rounded-2xl">
        <div class="flex-1">
          <div class="flex flex-col">
            <div class="font-light">Location Types</div>
            <div class="font-bold flex">
              {{ locationTypes.hospital }} Hospital,
              {{ locationTypes.clinics }} Clinics,
              {{ locationTypes.pharmacy }} Pharmacy
            </div>
          </div>
        </div>
        <div class="flex-none">
          <img
            src="@/assets/img/total-location-type.svg"
            height="60"
            width="60"
          />
        </div>
      </div>
    </div>
    <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-lg text-white w-40 mt-5 py-3 pr-5 pl-5 px-10 mb-5 font-semibold focus:outline-none hover:opacity-90"
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
            @click="showViewModal(item)"
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View </span>
          </div>
          <div
            @click="showEditModal(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-report-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <div
            @click="activateC(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <check class="text-green-600 fill-current" />
            <span class="ml-3 text-xs">Activate</span>
          </div>
        </div>

        <div v-if="item.status == 'active'">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showViewModal(item)"
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View </span>
          </div>
          <div
            @click="showEditModal(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-report-green class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <div
            @click="deactivateC(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <Check class="text-green-600 fill-current" /> -->
            <close-icon class="text-red-600 fill-current" />
            <span class="ml-3 text-xs">Deactivate</span>
          </div>
        </div>
      </template>
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
  import Check from "@/components/icons/check.vue";
  import CloseIcon from "@/components/icons/CloseIcon.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import NewviewIcon from "@/components/icons/newview.vue";
  import UpdateReportGreen from "@/components/icons/update-report-green.vue";
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
      Check,
      CornieTable,
      InventoryLocationModal,
      EditIcon,
      Addblue,
      NewviewIcon,
      CloseIcon,
      ViewCategory,
      AddInventoryModal,
      UpdateReportGreen,
    },
  })
  export default class InventoryLocationExistingState extends Vue {
    @Prop()
    location!: any[];

    @inventory.Action
    deactivateL!: (data: any) => Promise<void>;

    @inventory.Action
    activateL!: (data: any) => Promise<void>;

    @inventory.Action
    getAllLocations!: () => Promise<void>;

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

    get geoDisplay() {
      let a = {
        country: 0,
        state: 0,
        city: 0,
      };

      this.location.forEach((l) => {
        a.country =
          l.country && l.country !== "Not available"
            ? (a.country += 1)
            : (a.country += 0);
        a.state =
          l.state && l.state !== "Not available"
            ? (a.state += 1)
            : (a.state += 0);
        a.city =
          l.city && l.city !== "Not available" ? (a.city += 1) : (a.city += 0);
      });
      return a;
    }

    get locationTypes() {
      let a = {
        hospital: 0,
        clinics: 0,
        pharmacy: 0,
      };

      return a;
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
      this.deactivateL(id)
        .then(async () => {
          window.notify({
            msg: "Locations Deactivated",
            status: "success",
          });
          await this.getAllLocations();
        })
        .catch(() => {
          window.notify({
            msg: "There was an error deactivating location",
            status: "error",
          });
        });
    }

    async activateC(id: string) {
      this.activateL(id)
        .then(async () => {
          window.notify({
            msg: "Locations activated",
            status: "success",
          });
          await this.getAllLocations();
        })
        .catch(() => {
          window.notify({
            msg: "There was an error activating location",
            status: "error",
          });
        });
    }

    get items() {
      console.log("exists", this.location);
      return this.location;
    }
  }
</script>

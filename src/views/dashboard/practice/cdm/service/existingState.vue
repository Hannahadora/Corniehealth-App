<template>
  <div class="w-full pb-80">
    <div>
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
                inactive: item.status === 'entered-in-error',
              }"
            >
              {{ item.status }}</span
            >
          </div>
        </template>
        <template #actions="{ item }">
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`newservice/${item.id}`)">
          <eye-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`newservice/${item.id}`)">
          <edit-icon class="text-yellow-300 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showServiceModal = true">
          <calendar-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">Service Avalability</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`newservice/${item.id}`)">
          <update-icon class="text-green-400 fill-current" />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
         <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`newservice/${item.id}`)">
          <plus-icon class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">Add Variant</span>
        </div> -->
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="onDelete(item.id)">
          <deactivate-icon />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
      </template>
      </cornie-table>
    </div>

  </div>
  <available-service v-model="showServiceModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import { mapDisplay } from "@/plugins/definitions";

import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import TableAction from "@/components/table-action.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete-red.vue";
import EyeIcon from "@/components/icons/eye.vue";
import DrugIcon from "@/components/icons/drug.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import CalendarIcon from "@/components/icons/calendar.vue";

import AvailableService from "../components/serviceAvailable.vue";

const catalogue = namespace("catalogues");

@Options({
  name: "ServiceExistingState",
  components: {
    CornieTable,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    TableAction,
    Avatar,
    DeleteIcon,
    EyeIcon,
    DrugIcon,
    DeactivateIcon,
    CalendarIcon,
    AvailableService,
  },
})
export default class ServiceExistingState extends Vue {

 categoryMapper = (code: string) => "";

  @catalogue.Action
  deleteService!: (serviceId: string) => Promise<boolean>;

  @catalogue.State
  services!: ICatalogueService[];

  @catalogue.Action
  getServices!: () => Promise<void>;



  productId = "";
  query = "";
  loading = false;
  showServiceModal = true;

headers = [
    {
      title: "Name",
      key: "name",
      show: true,
      noOrder: true,
    },
    {
      title: "Item Code",
      key: "itemCode",
      show: true,
      noOrder: true,
    },
    {
      title: "Category",
      key: "category",
      show: true,
      noOrder: true,
    },
    {
      title: "Description",
      key: "description",
      show: true,
      noOrder: true,
    },
     {
      title: "cdm price",
      key: "cost",
      show: true,
      noOrder: true,
    },
     {
      title: "max. allowable discount",
      key: "discount",
      show: true,
      noOrder: true,
    },
    {
      title: "Last Updated",
      key: "lastUpdated",
      show: false,
      noOrder: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
      noOrder: true,
    },
  ];

  get activepatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  get items() {
    const services = this.services.map((service) => {
      (service as any).createdAt = new Date(
        (service as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...service,
        lastUpdated: service.createdAt,
        category: this.categoryMapper(service.category),
        cost: '₦' + service.cost,
        discount: service.discountLimit + '%'
      };
    });
    if (!this.query) return services;
    return search.searchObjectArray(services, this.query);
  }

  get sortProduct() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  productAdded() {
    this.getServices();
  }

 async createMapper() {
    this.categoryMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/service-category"
    );
  }
  async onDelete(serviceId: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "Are you sure you want to delete this service?",
        title: "Delete Service",
      });
      if (confirmed) {
        const response = await this.deleteService(serviceId);
        window.notify({ msg: "Catalogue service deleted", status: "success" });
      } else {
        window.notify({
          msg: "Catalogue service not deleted",
          status: "error",
        });
      }
    } catch (error) {}
  }


  async created() {
    await this.getServices();
    await this.createMapper();
  }
}
</script>
<style scoped>
* {
  font-family: Inter;
  font-style: normal;
}

.status {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}

.bolder {
  font-weight: 600;
  color: #fe4d3c;
}

.active {
  color: #35ba83;
  background: rgba(53, 186, 131, 0.08);
  border-radius: 5px;
}

.inactive {
  color: #fe4d3c;
  background: rgba(254, 77, 60, 0.08);
  border-radius: 5px;
}
</style>

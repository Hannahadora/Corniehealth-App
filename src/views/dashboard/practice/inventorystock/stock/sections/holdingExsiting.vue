<template>
    <cornie-table v-model="items" :columns="headers">
        <template #name="{ item }">
            <div class="text-no-wrap flex items-center uppercase text-xs" style="white-space: nowrap">
              <Avatar :src="item.image" />
              <span class="ml-2">{{ item.name }}</span>
            </div>
        </template>
        <template #itemCode-header>
            <div class="text-no-wrap flex uppercase text-xs" style="white-space: nowrap"
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
        <template #actions="{ item }">
            <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            >
            <edit-icon class="text-purple-700 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <new-view-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">View</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <check-icon class="text-blue-700 fill-current" />
            <span class="ml-3 text-xs">Check Availability</span>
            </div>
            <div  class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <update-icon class="text-green-500 fill-current" />
                <span class="ml-3 text-xs">Storage Info</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <check-icon class="text-purple-700 fill-current" />
                <span class="ml-3 text-xs">Allocate Stock</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <request-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">Material Request</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <return-icon class="text-danger fill-current" />
                <span class="ml-3 text-xs">Material Return</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <analytics-icon class="text-purple-700 fill-current" />
                <span class="ml-3 text-xs">Analytics</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
                <deactivate-icon class="text-primary fill-current" />
                <span class="ml-3 text-xs">Deactivate</span>
            </div>
        </template>
        </cornie-table>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";

import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";
import ILocation from "@/types/ILocation";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/eye-yellow.vue";
import UpdateIcon from "@/components/icons/update-dynamic.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import CornieRadio from "@/components/cornieradio.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import CheckIcon from "@/components/icons/checkdynamic.vue";
import CheckInIcon from "@/components/icons/checkin.vue";
import NewTab from "@/components/newtab.vue";


import RequestIcon from "../icons/request.vue";
import ReturnIcon from "../icons/return.vue";
import AnalyticsIcon from "../icons/analytics.vue";


import CategoryIcon from "../icons/category.vue";
import ItemsIcon from "../icons/items.vue";
import ValueIcon from "../icons/value.vue";
const location = namespace("location");

const catalogue = namespace("catalogues");

@Options({
  name: "totalExistingState",
  components: {
    CornieTable,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    DeactivateIcon,
    CategoryIcon,
    ItemsIcon,
    ValueIcon,
    Multiselect,
    CornieRadio,
    SelectOption,
    CheckIcon,
    CheckInIcon,
    RequestIcon,
    ReturnIcon,
    AnalyticsIcon,
    NewTab,
  },
})
export default class totalExistingState extends Vue {
  @catalogue.State
  services!: ICatalogueService[];

  @catalogue.State
  products!: ICatalogueProduct[];

  @catalogue.Action
  getProducts!: () => Promise<void>;

  @catalogue.Action
  deleteProduct!: (serviceId: string) => Promise<boolean>;

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

 tabLinks = [
    "Total",
    "Holding",
    "Pharmacy",
    "Diagnostics",
    "InPatient"
  ];

  currentTab = 0;

  headers = [
    {
      title: "item code",
      key: "genericName",
      show: true,
    },
    {
      title: "item name",
      key: "code",
      show: true,
    },
    {
      title: "brand",
      key: "category",
      show: true,
    },
    {
      title: "form",
      key: "description",
      show: true,
    },
    {
      title: "strength",
      key: "brand",
      show: true,
    },
    {
      title: "pack size",
      key: "sales",
      show: true,
    },
    {
      title: "uofm",
      key: "cdm",
      show: true,
    },
    {
      title: "opening",
      key: "discount",
      show: true,
    },
    {
      title: "issued",
      key: "lastUpdated",
      show: false,
    },
       {
      title: "added",
      key: "lastUpdated",
      show: false,
    },
     {
      title: "balance",
      key: "lastUpdated",
      show: false,
    },
     {
      title: "total value (N)",
      key: "lastUpdated",
      show: false,
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
    const products = this.products.map((product: any) => {
      return {
        ...product,
        action: product.id,
        keydisplay: "XXXXXXX",
        code: "xxxxxxx",
        createdAt: "19-07-21",
        condition: "Accident Prone",
        deceased: "No",
        cdm: "₦ " + this.getcdmprice(product.costInformation, product.id),
        sales: this.getsales(product.salesUOMs, product.id),
        discount: this.getDiscount(product.salesUOMs, product.id) + " %",
      };
    });

    if (!this.query) return products;
    return search.searchObjectArray(products, this.query);
  }

  getsales(value: any, id: string) {
    const pt = value.find((i: any) => value.length > 0);
    return pt ? `${pt?.unitName}` : "";
  }

  getDiscount(value: any, id: string) {
    const pt = value.find((i: any) => value.length > 0);
    return pt ? `${pt?.discountLimit}` : "";
  }

  getcdmprice(value: any, id: string) {
    const pt = value.find((i: any) => i.productId === id);
    return pt ? `${pt?.unitCost}` : "";
  }

  get sortProduct() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  productAdded() {
    this.getProducts();
  }

  checkAll() {
      console.log('Hello World');
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
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this product",
      title: "Delete product",
    });
    if (!confirmed) return;

    if (await this.deleteProduct(id))
      window.notify({ msg: "Product deleted", status: "success" });
    else window.notify({ msg: "Product not deleted", status: "error" });
  }

  async created() {
    await this.getProducts();
    await this.fetchLocations();
  }
}
</script>

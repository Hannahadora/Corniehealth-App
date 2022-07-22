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
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`newproduct/${item.id}`)">
          <eye-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`newproduct/${item.id}`)">
          <edit-icon class="text-yellow-300 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showMedInfoModal = true">
          <drug-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Medication Information</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`newproduct/${item.id}`)">
          <update-icon class="text-green-700 fill-current" />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
         <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showvariantModal = true">
            <plus-icon class="text-blue-400 fill-current" />
          <span class="ml-3 text-xs">Add Variant</span>
        </div> -->
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
            <deactivate-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
      </template>
      </cornie-table>
    </div>

  </div>
  <info-modal v-model="showMedInfoModal"/>
  <variant-modal v-model="showvariantModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";


import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import EyeIcon from "@/components/icons/eye.vue";
import DrugIcon from "@/components/icons/drug.vue";

import InfoModal from "../components/medicationInformation.vue";
import variantModal from "../components/variantModal.vue";

const catalogue = namespace("catalogues");

@Options({
  name: "ProductExistingState",
  components: {
    CornieTable,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    DeactivateIcon,
    EyeIcon,
    DrugIcon,
    InfoModal,
    variantModal,
  },
})
export default class ProductExistingState extends Vue {

  @catalogue.State
  services!: ICatalogueService[];

  @catalogue.State
  products!: ICatalogueProduct[];

  @catalogue.Action
  getProducts!: () => Promise<void>;

  @catalogue.Action
  deleteProduct!: (serviceId: string) => Promise<boolean>;

  productId = "";
  query = "";
  loading = false;
  cdm = 0;

  showMedInfoModal = false;
  showvariantModal = false;

 headers = [
    {
      title: "Name",
      key: "genericName",
      show: true,
    },
    {
      title: "Item Code",
      key: "code",
      show: true,
    },
    {
      title: "Category",
      key: "category",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      show: true,
    },
    {
      title: "Brand",
      key: "brand",
      show: true,
    },
    {
      title: "unit of sales",
      key: "sales",
      show: true,
    },
    {
      title: "cdm price",
      key: "cdm",
      show: true,
    },
    {
      title: "max. allowable discount",
      key: "discount",
      show: true,
    },
    {
      title: "Last Updated",
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
    const products = this.products.map((product:any) => {
      return {
        ...product,
        action: product.id,
        keydisplay: "XXXXXXX",
        code:"xxxxxxx",
        createdAt:"19-07-21",
        condition:"Accident Prone",
        deceased: "No",
        cdm : '₦ ' + this.getcdmprice(product.costInformation,product.id,),
        sales:  this.getsales(product.salesUOMs,product.id,),
        discount: this.getDiscount(product.salesUOMs,product.id,) + ' %'
      };
    });

    if (!this.query) return products;
    return search.searchObjectArray(products, this.query);
  }

getsales(value:any,  id:string){
  const pt = value.find((i: any) => value.length > 0);
    return pt ? `${pt?.unitName}` : "";
}

getDiscount(value:any,  id:string){
  const pt = value.find((i: any) => value.length > 0);
    return pt ? `${pt?.discountLimit}` : "";
}

  getcdmprice(value:any, id:string){
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

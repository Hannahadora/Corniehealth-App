<template>
  <div class="w-full pb-80">
    <div>
    <cornie-table v-model="items" :columns="headers" :showPagination="true"
        @pagechanged="getProducts"
        :pageInfo="pageInfo">
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
          <div class="flex items-center">
            <span class="text-xs bg-green-100 text-green-400 p-1 rounded" v-if="item.status == 'active'">
            {{ item.status }}
            </span>
            <span class="text-xs bg-red-100 text-red-400 p-1 rounded" v-if="item.status == 'inactive'">
            {{ item.status }}
            </span>
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
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showMedInfo(item)">
          <drug-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Medication Information</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="displayStatusModal(item)">
          <update-icon class="text-green-700 fill-current" />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
         <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showvariantModal = true">
            <plus-icon class="text-blue-400 fill-current" />
          <span class="ml-3 text-xs">Add Variant</span>
        </div> -->
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id, item.status)">
            <deactivate-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">{{ item.status == 'active' ? 'Deactivate' : 'Activate'}}</span>
        </div>
      </template>
      </cornie-table>
    </div>

  </div>
  <info-modal v-model="showMedInfoModal" :selectedItem="selectedItem"/>
  <variant-modal v-model="showvariantModal"/>
  <status-modal v-model="showStatusModal" :selectedItem="selectedItem" @status-updated="productAdded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import { cornieClient } from "@/plugins/http";

import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";
import IPageInfo from "@/types/IPageInfo";

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
import StatusModal from "./updateStatus.vue";

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
    StatusModal,
  },
})
export default class ProductExistingState extends Vue {

  @catalogue.State
  services!: ICatalogueService[];

  @catalogue.State
  products!: ICatalogueProduct[];

  @catalogue.Action
  getProducts!: (page?:number, limit?:number) => Promise<void>;

  @catalogue.Action
  deleteProduct!: (serviceId: string) => Promise<boolean>;

  @catalogue.State
  pageInfo!: IPageInfo;

  productId = "";
  query = "";
  loading = false;
  cdm = 0;

  selectedItem = {};

  showMedInfoModal = false;
  showvariantModal = false;
  showStatusModal = false

 headers = [
    {
      title: "Name",
      key: "genericName",
      show: true,
    },
    {
      title: "Item Code",
      key: "identifier",
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

  displayStatusModal(value:any){
    this.selectedItem = value;
    this.showStatusModal = true
  }

  showMedInfo(value:any){
    this.selectedItem = value;
    this.showMedInfoModal = true;
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

   async activate(id:string, status:string) {
    const url = `/api/v1/catalogue-product/status/${id}`;
    const body = {
      status: status == 'active' ? 'inactive' : 'active',
    };
    try {
      const response = await cornieClient().patch(url, body);
      if (response.success) {
        window.notify({ msg: status == 'active' ? 'Product deactivated' : 'Product activated', status: "success" });
        await this.productAdded();
      }
    } catch (error) {
      window.notify({ msg: status == 'active' ? 'Product not deactivated' : 'Product noy activated', status: "error" });
      this.loading = false;
    }
  }

  async deleteItem(id: string, status:string) {
    const confirmed = await window.confirmAction({
      message: status === 'active' ? "You are about to deactivate this product" : "You are about to activate this product",
      title: status === 'active' ? "Deactivate product" : "Activate product",
    });
    if (!confirmed) return;
  
    await this.activate(id,status)
    
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

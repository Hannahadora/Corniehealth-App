<template>
<div>
   <div class="mx-2 my-8 flex justify-between">
        <div class="w-" style="width: 32%">
        <div class="w-12/12 flex justify-between card p-3 bg-red">
            <div class="w-full">
            <p class="inactive">Total Number of Items</p>
            <p class="card-number">{{ total }}</p>
            </div>
            <total-icon />
        </div>
        </div>
        <div class="w-" style="width: 32%">
        <div class="w-12/12 flex justify-between card p-3 bg-red">
            <div class="w-full">
            <p class="inactive">Number of Product Items</p>
            <p class="card-number">{{ products?.length }}</p>
            </div>
            <products-icon />
        </div>
        </div>
        <div class="w-" style="width: 32%">
        <div class="w-12/12 flex justify-between card p-3 bg-red">
            <div class="w-full">
            <p class="inactive">Number of Service Items</p>
            <p class="card-number">{{ services?.length }}</p>
            </div>
            <services-icon />
        </div>
        </div>
    </div>

    <span
    class="w-full bg-danger"
    v-if="services.length > 0"
    >
    <span class="flex justify-end w-full m4-5">
        <cornie-btn
        class="m-5 px-8 font-semibold rounded-lg"
        style="color: #080056; border: 1px solid #080056"
        >
        Export
        </cornie-btn>

        <cornie-btn
        class="bg-danger px-8 text-white my-5 mx-4 rounded-lg p-1 font-semibold"
            @click="$router.push({ name: 'New Service' })"
        >
        Create New
        </cornie-btn>
    </span>
    </span>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span class="w-full">
         <service-empty-state v-if="empty" />
        <service-existing-state v-else />
      </span>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

import ServiceEmptyState from "./emptyState.vue";
import ServiceExistingState from "./existingState.vue";
import ProductsIcon from "../components/products-icon.vue";
import ServicesIcon from "../components/services-icon.vue";
import TotalIcon from "../components/total-icon.vue";

const catalogue = namespace("catalogues");

@Options({
  name: "ServiceIndex",
  components: {
    ServiceEmptyState,
    ServiceExistingState,
     ServicesIcon,
    ProductsIcon,
    TotalIcon,
  },
})
export default class ServiceIndex extends Vue {
  show = false;

  get empty() {
    return this.services.length < 1;
  }

  @catalogue.State
  products!: ICatalogueProduct[];

  @catalogue.Action
  getProducts!: () => Promise<void>;

 @catalogue.State
  services!: ICatalogueService[];

  @catalogue.Action
  getServices!: () => Promise<void>;


  productAdded() {
    this.show = false;
    this.getServices();
  }
    get total() {
    const totalitems = this.products.length + this.services.length;
    return totalitems;
  }

  async created() {
    await this.getServices();
    await this.getProducts();
  }
}
</script>
<style scoped>
* {
  font-family: Inter;
  font-style: normal;
}

.active-tab {
  border-bottom-width: 4px;
  margin-bottom: -0.22rem;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #14171f;
}

.active-color {
  border-color: #fe4d3c;
  position: relative;
  bottom: -3px;
}

.status-active {
  background: #f3fcf8;
  color: #35ba83;
}

.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}

.border-b-4 {
  border-bottom: 4px solid #f0f4fe;
}

.inactive {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667499;
}

.card {
  background: #ffffff;
  box-shadow: 0px 7px 15px rgba(20, 31, 21, 0.08);
  border-radius: 16px;
}

.card-number {
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #141f15;
}

/* .content-con {
  max-width: 30.65rem;
  min-width: 500px;
} */

.cancel-btn {
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 124px;
  color: #080056;
}

.primary-border {
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 124px;
}
</style>

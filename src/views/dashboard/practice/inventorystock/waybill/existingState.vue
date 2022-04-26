<template>
  <div class="w-full pb-80">
    <div class="mt-5 mb-5">
      <div class="flex justify-between">
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Total Waybills</p>
              <p class="text-black font-bold text-xl">0</p>
            </div>
            <total-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Active Waybills</p>
              <p class="text-black font-bold text-xl">0</p>
            </div>
            <active-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Closed Waybill</p>
              <p class="ctext-black font-bold text-xl">0</p>
            </div>
            <close-icon />
          </div>
        </div>
      </div>
    </div>
    <div class="">
        <new-tab :items="tabLinks" v-model="currentTab" :width="'w-1/4'" class="mt-12">
            <issued-section/>
            <received-section />
        </new-tab>
    </div>
   
  </div>
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


import TotalIcon from "./icons/total.vue";
import ActiveIcon from "./icons/active.vue";
import CloseIcon from "./icons/close.vue";


import IssuedSection from "./sections/IssuedSections.vue";
import ReceivedSection from "./sections/ReceivedSection.vue";


const location = namespace("location");
const catalogue = namespace("catalogues");

@Options({
  name: "requestExistingState",
  components: {
    CornieTable,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    DeactivateIcon,
    TotalIcon,
    ActiveIcon,
    CloseIcon,
    Multiselect,
    CornieRadio,
    SelectOption,
    CheckIcon,
    CheckInIcon,
    NewTab,
    IssuedSection,
    ReceivedSection,
  },
})
export default class requestExistingState extends Vue {
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
    "Issued",
    "Received",
  ];

  currentTab = 0;

  headers = [
    {
      title: "GRN NO",
      key: "genericName",
      show: true,
    },
    {
      title: "DATE",
      key: "code",
      show: true,
    },
    {
      title: "SUPPLIER",
      key: "category",
      show: true,
    },
    {
      title: "RECEIVER",
      key: "description",
      show: true,
    },
    {
      title: "item count",
      key: "brand",
      show: true,
    },
    {
      title: "total qty",
      key: "sales",
      show: true,
    },
    {
      title: "total cost",
      key: "cdm",
      show: true,
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
<style src="@vueform/multiselect/themes/default.css"></style>
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
.multiselect {
    border: none !important;
}
.multiselect-placeholder {
    color: #000 !important;
}
.multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}

/* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

.multiselect-placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}

.multiselect-caret {
  transform: rotate(0deg);
  transition: transform 0.3s;
  -webkit-mask-image: url("../../../../../assets/img/Chevron.png");
  mask-image: url("../../../../../assets/img/Chevron.png");
  background-color: #080056;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  /* border: 1px solid #fff;
    background: #fff; */
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  padding: 0.77px;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}
</style>

<template>
  <div class="w-full pb-80">
    <div class="mt-5 mb-5 flex justify-end w-full">
        <div class="w-72">
            <Multiselect
            ref="multiselect"
            :close-on-select="true"
            :groups="true"
            :group-select="false"
            placeholder="Select location"
            label="display"
            :options="[
                {
                label:'',
                options: ['All Locations'],
                },
                {
                label:'',
                options: allLocations,
                },
            ]"
            >
            <template v-slot:singlelabel="{ value }">
                <div class="multiselect-single-label">
                {{ value?.display }} 
                </div>
            </template>
            <template v-slot:option="{ option }">
                <select-option @click="checkAll()" id="toggleAll" v-model="isCheckAll" v-if="option.display == 'All Locations'" :label="option.display"/>
                <select-option v-else :modelValue:select="selected" :id="`loc_${option.code}`" :value="option.code" :label="option.display"/>
            </template>
            </Multiselect>
        </div>
    </div>
    <div class="mt-5 mb-5">
      <div class="flex justify-between">
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Total Items Category</p>
              <p class="text-black font-bold text-xl">{{ TotalCategory }}</p>
            </div>
            <category-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Total Inventory Items</p>
              <p class="text-black font-bold text-xl">{{ TotalInventoryItem  }}</p>
            </div>
            <items-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Total Inventory Value</p>
              <p class="ctext-black font-bold text-xl">₦ {{ (+TotalInventoryValue).toFixed(2) }} </p>
            </div>
            <value-icon />
          </div>
        </div>
      </div>
    </div>
    <div class="">
        <new-tab :items="tabLinks" v-model="currentTab" :width="'w-2/3'" class="mt-12">
            <total-section/>
            <holding-section />
            <pharmacy-section />
            <diagnostic-section/>
            <inpateint-section />
        </new-tab>
    </div>
   
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";

import IInventroyStock from "@/types/IInventroyStock";
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


import RequestIcon from "./icons/request.vue";
import ReturnIcon from "./icons/return.vue";
import AnalyticsIcon from "./icons/analytics.vue";
import CategoryIcon from "./icons/category.vue";
import ItemsIcon from "./icons/items.vue";
import ValueIcon from "./icons/value.vue";

import TotalSection from "./sections/totalExisting.vue";
import HoldingSection from "./sections/holdingExsiting.vue";
import PharmacySection from "./sections/PharmacyExisiting.vue";
import DiagnosticSection from "./sections/DiagnosticExisting.vue";
import InpateintSection from "./sections/inPatientExsiting.vue";

const location = namespace("location");
const inventorystock = namespace("inventorystock");
const user = namespace("user");

@Options({
  name: "InventoryExistingState",
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
    TotalSection,
    HoldingSection,
    PharmacySection,
    DiagnosticSection,
    InpateintSection,
  },
})

export default class InventoryExistingState extends Vue {

  @user.Getter
  authCurrentLocation!: string;

  @inventorystock.State
  inventorystocks!: IInventroyStock[];

  @inventorystock.Action
  fetchInventorystocks!: (locationId: string) => Promise<void>;

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
    const inventorystocks = this.inventorystocks.map((inventorystock: any) => {
      return {
        ...inventorystock,
     
      };
    });

    if (!this.query) return inventorystocks;
    return search.searchObjectArray(inventorystocks, this.query);
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
  get TotalCategory(){
    return 4;
  }
  get TotalInventoryItem(){
    return this.inventorystocks.length;
  }


  get TotalInventoryValue(){
    return this.inventorystocks.reduce((acc, item) => acc + item.unitPrice, 0);
  }
  async stockAdded() {
    if(this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
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
 

  async created() {
    if(this.authCurrentLocation) await this.fetchInventorystocks(this.authCurrentLocation);
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

<template>
  <div class="w-full pb-80">
    <div class="mt-5 mb-5">
      <div class="flex justify-between">
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Total GRN</p>
              <p class="text-black font-bold text-xl">{{ totalGrn }}</p>
            </div>
            <grn-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">External Supplies</p>
              <p class="text-black font-bold text-xl">{{ totalSupplies }}</p>
            </div>
            <external-icon />
          </div>
        </div>
        <div class="w-" style="width: 32%">
          <div class="w-12/12 flex justify-between shadow-lg rounded-lg p-5">
            <div class="w-full">
              <p class="text-gray-400 text-sm">Internal Supplies</p>
              <p class="ctext-black font-bold text-xl">{{ totalSupplies }}</p>
            </div>
            <internal-icon />
          </div>
        </div>
      </div>
    </div>
    <div class="">
        <issued-section/>
        <!-- <new-tab :items="tabLinks" v-model="currentTab" :width="'w-1/4'" class="mt-12">
            <issued-section/>
            <received-section />
        </new-tab> -->
    </div>
   
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import search from "@/plugins/search";
import Multiselect from "@vueform/multiselect";

import IGrn from "@/types/IGrn";
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


import GrnIcon from "./icons/grn.vue";
import ExternalIcon from "./icons/externalsuppliers.vue";
import InternalIcon from "./icons/internalsuppliers.vue";


import IssuedSection from "./sections/IssuedSections.vue";
import ReceivedSection from "./sections/ReceivedSection.vue";


const location = namespace("location");
const grn = namespace("grn");

@Options({
  name: "GoodsExistingState",
  components: {
    CornieTable,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
    DeactivateIcon,
    GrnIcon,
    ExternalIcon,
    InternalIcon,
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
export default class GoodsExistingState extends Vue {
  
  @grn.State
  grns!: IGrn[];

  @grn.Action
  fetchGrns!: () => Promise<void>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  loading = false;
 

 tabLinks = [
    "Issued",
    "Received",
  ];

  currentTab = 0;

   get totalGrn(){
    return this.grns.length;
  }

   get totalSupplies(){
    return this.grns.map((c: any) => c.supplyItems.length).reduce((a: any, b: any) => a + b, 0);
  }
 
  grnAdded() {
    this.fetchGrns();
  }

  async created() {
    await this.fetchGrns();
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

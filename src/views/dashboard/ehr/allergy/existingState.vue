<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          class="
            bg-danger
            rounded-lg
            text-white
            mt-5
            py-2
            px-6
            mb-5
            font-semibold
            focus:outline-none
            hover:opacity-90
          "
          @click="showAllergyModal = true"
        >
          New Allergy
        </button>
      </span>
      <cornie-table  :columns="rawHeaders" v-model="sortAllergys">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showView = true"
          >
            <newview-icon class="text-blue-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
             <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showAllergy(item.id)"
          >
            <update-icon class="text-yellow-400 fill-current" />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showOccur = true"
          >
            <plus-icon class="text-purple-500 fill-current" />
            <span class="ml-3 text-xs">Add Occurrence</span>
          </div>
           <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <check-icon class="text-green-400 fill-current" />
            <span class="ml-3 text-xs">Assert</span>
          </div>
            <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <cancel-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Cancel</span>
          </div>
        
        </template>
        <template #asserter="{ item }">
          <p class="cursor-pointer">{{ item.asserter }}</p>
        </template>
        <template #recorder="{ item }">
          <p class="cursor-pointer">{{ item.asserter }}</p>
        </template>
         <template #clinicalStatus="{ item }">
          <span
          class="bg-gray-100 text-gray-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'resolved'"
        >
          Draft
        </span>
        <span
          class="bg-green-100 text-green-600 rounded-lg p-2 text-xs"
          v-if=" item.status === 'active'"
        >
          {{ item.status }}
        </span>
        <span
          class="bg-red-100 text-red-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'inactive'"
        >
          {{ item.status }}
        </span>
      </template>
       <template #status="{ item }">
          <span
          class="bg-gray-100 text-gray-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'entered-in-error' || item.status === 'partial'"
        >
          {{ item.status }}
        </span>
        <span
          class="bg-purple-100 text-purple-600 rounded-lg p-2 text-xs"
          v-if=" item.status === 'rufuted'"
        >
          {{ item.status }}
        </span>
          <span
          class="bg-blue-100 text-blue-600 rounded-lg p-2 text-xs"
          v-if=" item.status === 'confirmed'"
        >
          {{ item.status }}
        </span>
        <span
          class="bg-red-100 text-red-600 rounded-lg p-2 text-xs"
          v-if="item.status === 'unconfirmed'"
        >
          {{ item.status }}
        </span>
      </template>
      </cornie-table>
    </div>

  </div>
    <allergy-modal
      @allergy-added="allergyAdded"
      v-model="showAllergyModal"
    />
    <occur-modal  v-model="showOccur"/>
    <view-modal v-model="showView"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";


import IAllergy from "@/types/IAllergy";
import Ihistory from "@/types/Ihistory";


import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import CheckIcon from "@/components/icons/checkdynamic.vue";

import AllergyModal from "./allergyModal.vue";
import OccurModal from "./components/occurence.vue";
import ViewModal from "./components/viewModal.vue";

const allergy = namespace("allergy");
const history = namespace("history");

@Options({
  components: {
    CancelIcon,
    SortIcon,
    AllergyModal,
    UpdateIcon,
    ThreeDotIcon,
    PlusIcon,
    NewviewIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
    CheckIcon,
    OccurModal,
    ViewModal,
  },
})
export default class AllergyExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showAllergyModal = false;
  allergyId = "";
  tasknotes = [];
  substance = "";
  showOccur = false;
  showView = false;
  // @Prop({ type: Array, default: [] })
  // allergys!: IAllergy[];
  medicationMapper = (code: string) => "";

  @allergy.State
  allergys!: IAllergy[];

  @allergy.State
  practitioners!: any[];

  @allergy.Action
  deleteAllergy!: (id: string) => Promise<boolean>;

  @allergy.Action
  getPractitioners!: () => Promise<void>;

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  @history.State
  historys!: Ihistory[];

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "AI id",
      key: "keydisplay",
      show: true,
    },
    { title: "Date Recorded", key: "createdAt", show: true },
    {
      title: "code",
      key: "keydisplay",
      show: true,
    },
    {
      title: "criticality",
      key: "keydisplay",
      show: true,
    },
    {
      title: "clinical status",
      key: "clinicalStatus",
      show: true,
    },
    {
      title: "verification status",
      key: "status",
      show: true,
    },
    {
      title: "Asserter",
      key: "asserter",
      show: false,
    },
    {
      title: "Recorder",
      key: "recorder",
      show: false,
    },
    {
      title: "Period",
      key: "onsetPeriod",
      show: false,
    },
    {
      title: "Code",
      key: "code",
      show: false,
    },
    {
      title: "Onset Age",
      key: "onsetAge",
      show: false,
    },
    {
      title: "Recorded Date",
      key: "recordedDate",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Note",
      kwy: "note",
      show: false,
    },
    {
      title: "Last Occurence",
      kwy: "lastOccurence",
      show: false,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  async createMapper() {
    this.medicationMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/substance-code"
    );
  }

  get items() {
    const allergys = this.historys.map((allergy: any) => {
      // (allergy as any).onSet.onsetPeriod.start = new Date(
      //   (allergy as any).onSet.onsetPeriod.start
      // ).toLocaleDateString("en-US");
      // (allergy as any).onSet.onsetPeriod.end = new Date(
      //   (allergy as any).onSet.onsetPeriod.end
      // ).toLocaleDateString("en-US");
      // (allergy as any).createdAt = new Date(
      //   (allergy as any).createdAt
      // ).toLocaleDateString("en-US");

      return {
        ...allergy,
        action: allergy.id,
        keydisplay: "XXXXXXX",
        // onsetPeriod:
        //   allergy.onSet.onsetPeriod.start + "-" + allergy.onSet.onsetPeriod.end,
        // asserter: this.getPractitionerName(allergy.onSet.asserter),
        // product: this.medicationMapper(allergy.reaction.substance),
        // type: mapDisplay(allergy.type),
      };
    });
    if (!this.query) return allergys;
    return search.searchObjectArray(allergys, this.query);
  }

  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  async showAllergy(value: string) {
    this.showAllergyModal = true;
    //this.stopEvent = true;
    this.allergyId = value;
  }
  get patientId() {
    return this.$route.params.id as string;
  }
  stripQuote(val: string) {
    return val.replaceAll('"', "");
  }
  allergyAdded() {
    this.allergys;
    this.fetchAllergys(this.patientId);
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this allergy",
      title: "Delete allergy",
    });
    if (!confirmed) return;

    if (await this.deleteAllergy(id))
      window.notify({ msg: "Allergy cancelled", status: "success" });
    else window.notify({ msg: "Allergy not cancelled", status: "error" });
  }

  get sortAllergys() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async created() {
    await this.fetchHistorys(this.patientId)
    await this.createMapper();
    this.getPractitioners();
    this.sortAllergys;
    await this.fetchAllergys(this.patientId);
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.status-accepted {
  background: #f3fcf8;
  color: #35ba83;
}
.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}
.status-warning {
  background: #fefaf0;
  color: #f7b538;
}
</style>

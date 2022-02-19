<template>
  <div class="w-full">
    <accordion-component
      :title="'Beneficial Owners'"
      :opened="[owners.length < 0 ? true : false]"
      @add="showOwner = true"
      :add="true"
      :showAddExisting="true"
      :expandText="'Select existing director'"
      :expandsection="true"
      :showAdd="true"
      @selectExisting="showDirector"
    >
      <cornie-table
        :columns="rawHeaders"
        v-model="sortRefrees"
        :listmenu="true"
        :check="false"
      >
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="shoeEditOwner(item.id)"
          >
            <edit-icon class="text-purple-700 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <delete-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Delete</span>
          </div>
        </template>
      </cornie-table>
    </accordion-component>
    <beneficial-owner
      @setOwner="setOwner"
      @ownerAdded="ownerAdded"
      :id="id"
      :ownerId="ownerId"
      v-model="showOwner"
      :totalPercentage="currentPercentage"
    />
    <exisiting-director
      :id="id"
      :ownerId="ownerId"
      @setOwner="setOwner"
      v-model="showExistingDriector"
      :totalPercentage="currentPercentage"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
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
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import AccordionComponent from "@/components/form-accordion.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import { namespace } from "vuex-class";
import BeneficialOwner from "./beneficial-owner.vue";
import ExisitingDirector from "./exsitingDirector.vue";
import IKyc from "@/types/IKyc";
import DirectorModal from "./directorModal.vue";
import IOwner from "@/types/IOwner";

const task = namespace("task");
const kyc = namespace("kyc");

@Options({
  components: {
    CancelIcon,
    AccordionComponent,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    NoteIcon,
    ThreeDotIcon,
    BeneficialOwner,
    DangerIcon,
    DirectorModal,
    PlusIcon,
    SearchIcon,
    ExisitingDirector,
    //  NotesAdd,
    //  CloseIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})
export default class DirectorState extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Array, default: [] })
  owners!: IOwner[];

  @kyc.Action
  deleteOwner!: (id: string) => Promise<boolean>;

  @kyc.Action
  fetchKycs!: () => Promise<void>;

  @kyc.Mutation
  addOwners!: (orgKyc: IOwner) => void;

  @kyc.State
  orgKyc!: IKyc;

  query = "";
  ownerId = "";
  showOwner = false;
  particularOfDirectors = [] as any;
  showExistingDriector = false;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Name",
      key: "name",
      show: true,
      noOrder: true,
    },
    {
      title: "ownership equity (%)",
      key: "percentage",
      show: true,
      noOrder: true,
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

  get currentPercentage() {
    const percentage = this?.owners
      .map((owner) => Number(owner.percentage))
      .reduce((prev, current) => prev + current, 0);
    return percentage || 0;
  }

  get items() {
    const owners = this.owners?.map((owner: any) => {
      return {
        ...owner,
        action: owner?.id,
        percentage: owner.percentage + " %",
      };
    });
    return owners;
  }

  showDirector() {
    this.showExistingDriector = true;
  }
  shoeEditOwner(value: string) {
    this.showOwner = true;
    this.ownerId = value;
  }
  async setOwner() {
    this.addOwners([this.addOwners] as any);
    await this.fetchKycs();
  }

  ownerAdded(data: any) {
    this.owners = data;
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this beneficial owner",
      title: "Delete beneficial owner",
    });
    if (!confirmed) return;

    if (await this.deleteOwner(id))
      window.notify({ msg: "beneficial owner deleted", status: "success" });
    else
      window.notify({ msg: "beneficial owner not deleted", status: "error" });
  }

  get sortRefrees() {
    return this.items?.slice().sort(function (a: any, b: any) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  directorData(value: any) {
    this.particularOfDirectors = value;
  }

  async created() {
    await this.fetchKycs();
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

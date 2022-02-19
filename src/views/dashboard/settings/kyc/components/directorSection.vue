<template>
  <div class="w-full">
    <accordion-component
      :title="'Directors'"
      :opened="[directors.length < 0 ? true : false]"
      @add="showDirector = true"
      :add="true"
      :height="200"
    >
      <cornie-table
        :columns="rawHeaders"
        v-model="sortDirectors"
        :listmenu="true"
        :check="false"
      >
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showDirectorEdit(item.id)"
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
    <director-modal
      :id="id"
      :directorId="directorId"
      v-model="showDirector"
      @director-added="directorAdded"
      @director-data="directorData"
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
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import ITask from "@/types/ITask";
import AccordionComponent from "@/components/form-accordion.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import { namespace } from "vuex-class";
import IKyc from "@/types/IKyc";
import { cornieClient } from "@/plugins/http";
import IDirector from "@/types/IDirector";
import DirectorModal from "./directorModal.vue";

const task = namespace("task");
const kyc = namespace("kyc");

@Options({
  components: {
    AccordionComponent,
    SortIcon,
    ThreeDotIcon,
    DirectorModal,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})
export default class DirectorState extends Vue {
  @Prop({ type: Array, default: [] })
  directors!: [];

  @Prop({ type: String, default: "" })
  id!: string;

  @kyc.Action
  deleteDirector!: (id: string) => Promise<boolean>;

  query = "";
  showDirector = false;
  particularOfDirectors = [] as any;
  directorId = "";

  @kyc.Action
  fetchKycs!: () => Promise<void>;

  @kyc.State
  orgKyc!: IKyc;

  orgdirectors = [] as any;

  get orgkycDirectors() {
    this.orgdirectors = this.orgKyc.directors;
    return this.orgdirectors;
  }

  @kyc.Mutation
  addDirectors!: (orgKyc: IDirector) => void;

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
      title: "Date added",
      key: "createdAt",
      show: true,
      noOrder: true,
    },
    {
      title: "Date of birth",
      key: "dateOfBirth",
      show: false,
      noOrder: true,
    },
    {
      title: "Email address",
      key: "emailAddress",
      show: false,
      noOrder: true,
    },
    {
      title: "Identification Document",
      key: "identificationDocument",
      show: false,
      noOrder: true,
    },
    {
      title: "Identification Number",
      key: "identificationDocumentNumber",
      show: false,
      noOrder: true,
    },

    {
      title: "Identification document type",
      key: "identificationDocumentNumber",
      show: false,
      noOrder: true,
    },
    {
      title: "Practice document type",
      key: "practiceLicenseDocumentType",
      show: false,
      noOrder: true,
    },

    {
      title: "Phone number",
      key: "phoneNumber",
      show: false,
      noOrder: true,
    },
    {
      title: "Practice license number",
      key: "practiceLicenseNumber",
      show: false,
      noOrder: true,
    },
    {
      title: "Nationality",
      key: "nationality",
      show: false,
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

  showDirectorEdit(value: string) {
    this.directorId = value;
    this.showDirector = true;
  }
  get items() {
    const directors = this.orgkycDirectors?.map((director: any) => {
      //      (director as any).createdAt = new Date(
      //     (director as any).createdAt
      //   ).toISOString().slice(0, 10);
      (director as any).createdAt = new Date(
        (director as any).createdAt
      ).toLocaleDateString();
      return {
        ...director,
        action: director?.id,
        name: director?.fullName,
        phoneNumber:
          director?.phoneNumber?.dialCode + "" + director?.phoneNumber?.number,
      };
    });
    return directors;
  }

  async directorAdded() {
    this.addDirectors([this.addDirectors] as any);
    await this.fetchKycs();
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this director details",
      title: "Delete director details",
    });
    if (!confirmed) return;

    if (await this.deleteDirector(id))
      window.notify({ msg: "Director details deleted", status: "success" });
    else
      window.notify({ msg: "Director details not deleted", status: "error" });
  }

  get sortDirectors() {
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

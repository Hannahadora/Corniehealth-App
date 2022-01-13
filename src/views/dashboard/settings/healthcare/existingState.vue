<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-full font-semibold text-sm text-white mt-5 py-3 mb-5 px-10 focus:outline-none hover:opacity-90"
        @click="$router.push('add-health-service')"
      >
        Add New
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-health-service/${item.id}`)"
        >
          <edit-icon class="text-yellow-300 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-icon class="fill-current text-danger"/>
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>

  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import IHealthcare from "@/types/IHealthcare";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { mapDisplay } from "@/plugins/definitions";
import EditIcon from "@/components/icons/edit.vue";


const healthcare = namespace("healthcare");
@Options({
  components: {
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    EditIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    CornieTable,
    EyeIcon,
    ColumnFilter,
    TableOptions,
  },
})
export default class HealthcareExistingState extends Vue {
  showColumnFilter = false;
  query = "";
   typeMapper = (code: string) => "";

  loading = false;

  @healthcare.State
  healthcares!: IHealthcare[];

  @healthcare.Action
  deleteHealthcare!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
     {
      title: "IDENTIFIER",
      key: "id",
      show: true,
    },
    {
      title: "Type",
      key: "type",
      show: true,
    },
     {
      title: "communication",
      key: "communication",
      show: true,
    },
    {
      title: "Phone",
      key: "phone",
      show: true,
    },
    {
      title: "Location",
      key: "address",
      show: true,
    },
    {
      title: "Name",
      key: "name",
      show: false,
    },
    {
      title: "Provison Code",
      key: "provisionCode",
      show: false,
    },
    
    {
      title: "Comment",
      key: "comment",
      show: false,
    },
    {
      title: "Programs",
      key: "programs",
      show: false,
    },
    {
      title: "Specialty",
      key: "specialty",
      show: false,
    },
    {
      title: "Category",
      key: "category",
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

  get items() {
    const healthcares = this.healthcares.map((healthcare) => {
      return {
        ...healthcare,
        action: healthcare.id,
        type: this.typeMapper(healthcare.type)
      };
    });

    if (!this.query) return healthcares;
    return search.searchObjectArray(healthcares, this.query);
  }

  async createMapper() {
    this.typeMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/service-type"
    );
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this healthcare service",
      title: "Delete Healthcare Servcie",
    });
    if (!confirmed) return;

    if (await this.deleteHealthcare(id))
      window.notify({ msg: "Healthcare service deleted", status: "success" });
    else
      window.notify({ msg: "Healthcare service not deleted", status: "error" });
  }

  async created(){
     await this.createMapper();
  }
}
</script>

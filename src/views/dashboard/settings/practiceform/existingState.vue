<template>
  <div class="w-full">
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          placeholder="--search--"
          type="search"
          v-model="query"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      <span class="flex justify-end w-full">
        <div class="dropdown inline-block relative">
          <button
            class="bg-danger rounded-full text-white mt-5 py-2 pr-5 pl-5 px-3 focus:outline-none hover:opacity-90 inline-flex items-center"
          >
            <span class="mr-1">Create New Form </span>
            <chevron-down-icon
              class="text-white mb-2 stroke-current mt-1 ml-1"
            />
          </button>
          <ul class="dropdown-menu absolute hidden z-10 text-gray-700 pt-1">
            <li class="">
              <Select
                v-model="showDatalist"
                :items="[
                  'Blank form',
                  'Demographics Template',
                  'Insurance Information Template',
                  'New Patient Medical History Template',
                  'COVID-19 Screening Template',
                ]"
              ></Select>
            </li>
          </ul>
        </div>
      </span>
    </div>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            $router.push(
              `/dashboard/provider/add-practice-form-template/${item.id}`
            )
          "
        >
          <edit-icon class="mr-3 text-yellow-300 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>

        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-icon />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>
    <!-- <Table :headers="headers" :items="sortFunc" class="tableu rounded-xl mt-5">
      <template v-slot:item="{ item }">
        <span v-if="getKeyValue(item).key == 'action'">
          <table-options>
            <li
              @click="$router.push(`/dashboard/provider/add-practice-form-template/${getKeyValue(item).value}`)"
              class="
                list-none
                items-center
                flex
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
                 my-1 -m-2 p-5 py-2
              "
            >
              
              <edit-icon class="mr-3" /> Edit
            </li>
            <li
              @click="deleteItem(getKeyValue(item).value)"
              class="
                list-none
                flex
                 my-1 -m-2 p-5 py-2
                items-center
                text-xs
                font-semibold
                text-gray-700
                hover:bg-gray-100
                hover:text-gray-900
                cursor-pointer
              "
            >
              <delete-icon class="mr-3" /> Delete
            </li>
          </table-options>
        </span>
        <span v-else> {{ getKeyValue(item).value }} </span>
      </template>
    </Table>
    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    /> -->
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-component.vue";
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
import IPracticeform from "@/types/IPracticeform";
import IPractitioner from "@/types/IPractitioner";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import WhiteeditIcon from "@/components/icons/whiteedit.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import CornieSelect from "@/components/cornieselect.vue";
import WhitedeleteIcon from "@/components/icons/whitedelete.vue";
import Select from "@/components/newautocomplete.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import { cornieClient } from "@/plugins/http";

const practiceform = namespace("practiceform");

@Options({
  name: "PracticeformExistingState",
  components: {
    Select,
    ChevronDownIcon,
    CornieSelect,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    CloseIcon,
    PrintIcon,
    CornieTable,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    AccordionComponent,
    WhiteeditIcon,
    WhitedeleteIcon,
  },
})
export default class PracticeformExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  showMemberModal = false;
  showDeativateModal = false;
  showDatalist = true;
  showSelect = false;
  paymentId = "";
  @practiceform.State
  practiceforms!: IPracticeform[];

  @practiceform.Action
  deletePracticeform!: (id: string) => Promise<boolean>;

  practionersNames = "";

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Form Name", key: "formTitle", show: true },
    {
      title: "Form Type",
      key: "formType",
      show: true,
    },
    {
      title: "Created By",
      key: "createdBy",
      show: true,
    },
    {
      title: "Last Modified By",
      key: "updatedBy",
      show: true,
    },
    {
      title: "Links",
      key: "links",
      show: true,
    },
    {
      title: "Display Title",
      key: "displayTitle",
      show: false,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(6, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const practiceforms = this.practiceforms.map((practiceform) => {
      (practiceform as any).createdAt = new Date(
        (practiceform as any).createdAt
      ).toLocaleDateString("en-US");
      (practiceform as any).updatedAt = new Date(
        (practiceform as any).updatedAt
      ).toLocaleDateString("en-US");
      const practioner = this.stringifyPractioners(
        practiceform.createdBy as IPractitioner
      );
      const updatedpractioner = this.stringifyUpdatedPractioners(
        practiceform.updatedBy as IPractitioner
      );
      return {
        ...practiceform,
        createdBy: practioner,
        updatedBy: updatedpractioner,
        action: practiceform.id,
      };
    });
    if (!this.query) return practiceforms;
    return search.searchObjectArray(practiceforms, this.query);
  }

  stringifyPractioners(createdBy: IPractitioner) {
    const practioner = createdBy;
    if (!practioner) return "Username";
    return `${practioner.firstName} ${practioner.lastName}`;
  }
  stringifyUpdatedPractioners(updatedBy: IPractitioner) {
    const practioner = updatedBy;
    if (!practioner) return "Username";
    return `${practioner.firstName} ${practioner.lastName}`;
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this practice form",
      title: "Delete Practice Form",
    });
    if (!confirmed) return;

    if (await this.deletePracticeform(id))
      window.notify({ msg: "Practice form deleted", status: "success" });
    else window.notify({ msg: "Practice form not deleted", status: "error" });
  }
  get sortFunc() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
}
</script>
<style scoped>
.outline-primary {
  border: 2px solid #080056;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>

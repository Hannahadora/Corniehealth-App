<template>
  <div class="w-full">
    <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex items-center">
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none" placeholder="--search--" type="search" v-model="query">
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
       <span class="flex justify-end w-full">
          <div class="dropdown inline-block relative">
            <button class="bg-danger rounded-full text-white mt-5 py-2  pr-5 pl-5 px-3 focus:outline-none hover:opacity-90 inline-flex items-center">
              <span class="mr-1">Create New Form </span>
              <chevron-down-icon class="text-white mb-2 stroke-current mt-1 ml-1"/>
            </button>
            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li class="">
                   <Select v-model="showDatalist" :items="['Blank form','Demographics Template','Insurance Information Template','New Patient Medical History Template','COVID-19 Screening Template']"></Select>
              </li>
            </ul>
          </div>
        </span>
    </div>
 <!--   <div class="w-full order-first mt-5"  v-for="(item, i) in sortFunc" :key="i">
      <div  class="h-11 w-full flex items-center justify-between px-3 border-2 border-0 rounded-t-xl bg-primary border-primary">
        <div class="font-semibold text-white uppercase">
         {{item.formTitle}}
        </div>
        <span class="flex items-center">
          <whiteedit-icon  class="cursor-pointer fill-current text-white"  @click="$router.push(`/dashboard/provider/add-practice-form-template/${item.id}`)"></whiteedit-icon>
          <span class="mr-3 cursor-pointer" :class="{ 'fill-current text-white': expand }">
            <slot name="misc" />
          </span>
          <whitedelete-icon  class="cursor-pointer stroke-current text-white"  @click="deleteItem(item.id)">
          </whitedelete-icon>
        </span>
      </div>
      <div class="border-2 border-gray-200">
        <div class="w-full grid grid-cols-3 gap-1 p-5 -mb-5">
            <h3 class="font-bold uppercase text-left">Created By</h3>
            <p class="text-center">{{item.createdBy.firstName}}  {{item.createdBy.lastName}}</p>
            <p class="text-right">{{item.createdAt}}</p>
        </div>
        <div class="w-full grid grid-cols-3 gap-0 p-5 -mb-5">
            <h3 class="font-bold uppercase text-left">Last Modified By</h3>
            <p class="text-center">{{item.updatedBy.firstName}}  {{item.updatedBy.lastName}}</p>
            <p class="text-right">{{item.updatedAt}}</p>
        </div>
        <div class="w-full grid grid-cols-3 gap-0 p-5 -mb-5">
            <h3 class="font-bold uppercase text-left">Form Type</h3>
            <p class="text-center">{{item.formType}}</p>
        </div>
        <div class="w-full grid grid-cols-3 gap-0 -mb-5 p-5">
            <h3 class="font-bold uppercase text-left">Links</h3>
            <p class="text-center">{{item.links}}</p>
        </div>
      </div>
    </div>-->
    <Table :headers="headers" :items="sortFunc" class="tableu rounded-xl mt-5">
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
                 my-1 -m-6 p-5 py-2
              "
            >
              
              <edit-icon class="mr-3" /> Edit
            </li>
            <li
              @click="deleteItem(getKeyValue(item).value)"
              class="
                list-none
                flex
                 my-1 -m-6 p-5 py-2
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
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
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
import IPracticeform,{createdBy, updatedBy} from "@/types/IPracticeform";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import WhiteeditIcon from "@/components/icons/whiteedit.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import CornieSelect from "@/components/cornieselect.vue";
import WhitedeleteIcon from "@/components/icons/whitedelete.vue";
import Select from "@/components/newautocomplete.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/close.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
const practiceform = namespace("practiceform");

@Options({
  components: {
    Select,
    ChevronDownIcon,
    CornieSelect,
    Table,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    CloseIcon,
    PrintIcon,
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
    WhitedeleteIcon
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
  paymentId ="";

  @practiceform.State
  practiceforms!: IPracticeform[];

  @practiceform.Action
  deletePracticeform!: (id: string) => Promise<boolean>;

  practionersNames = "";

getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Form Name", value: "formTitle", show: true },
    {
      title: "Form Type",
      value: "formType",
      show: true,
    },
    {
      title: "Created By",
      value: "Created",
      show: true,
    },
    {
      title: "Last Modified By",
      value: "status",
      show: true,
    },
    {
      title: "Links",
      value: "kinks",
      show: true,
    },
    {
      title: "Display Title",
      value: "displayTitle",
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
        const practioner = this.stringifyPractioners(practiceform.createdBy);
        return {
        ...practiceform,
          createdBy: practioner,
        };
    });
    if (!this.query) return practiceforms;
    return search.searchObjectArray(practiceforms, this.query);
  }

 stringifyPractioners(practioners: createdBy[]) {
    const [practioner, ...rest] = practioners;
    if (!practioner) return "All Day";
    return `${practioner.firstName} - ${practioner.lastName}`;
  }
   async fetchPractioners() {
      const Practioners = cornieClient().get(
        "/api/v1/practice-form/template-forms"
      );
      const response = await Promise.all([Practioners]);
      this.practionersNames = response[0].data.createdBy;
    }

 
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this practice form",
      title: "Delete Practice Form"
    });
    if (!confirmed) return;

    if (await this.deletePracticeform(id)) window.notify({ msg: "Practice form deleted", status: "success" });
    else window.notify({ msg: "Practice form not deleted", status: "error" });
  }
      get sortFunc (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
      async created() {
        this.fetchPractioners();
      }
    

}
</script>
<style>
.outline-primary{
    border: 2px solid #211F45;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>

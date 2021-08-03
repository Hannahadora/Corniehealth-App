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
    <div class="w-full order-first mt-5">
      <div  class="h-11 w-full flex items-center justify-between px-3 border-2 border-0 rounded-t-xl bg-primary border-primary">
        <div class="font-semibold text-white">
          Medical history form for new  patients
        </div>
        <span class="flex items-center">
        <!-- <info-icon  class="cursor-pointer"  :class="{ 'fill-current text-white': expand }">
          </info-icon>-->
        <whiteedit-icon  class="cursor-pointer fill-current text-white">
          </whiteedit-icon>
          <span class="mr-3 cursor-pointer" :class="{ 'fill-current text-white': expand }">
            <slot name="misc" />
          </span>
          <whitedelete-icon  class="cursor-pointer stroke-current text-white">
          </whitedelete-icon>
        </span>
      </div>
      <div class="border-2 border-gray-200">
        <div class="w-full grid grid-cols-3 gap-4 p-5">
            <h3 class="font-bold uppercase text-left">Created by</h3>
            <p class="text-center">Mike Eze</p>
            <p class="text-right">3/18/2020</p>
        </div>
      </div>
    </div>
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
import IGroup from "@/types/IGroup";
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
const group = namespace("group");

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
export default class GroupExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  showMemberModal = false;
  showDeativateModal = false;
  showDatalist = true;
  showSelect = false;
  paymentId ="";

  @group.State
  groups!: IGroup[];

  @group.Action
  deleteGroup!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Name", value: "name", show: true },
    {
      title: "Quantity",
      value: "quantity",
      show: true,
    },
    {
      title: "Type",
      value: "type",
      show: true,
    },
    {
      title: "Status",
      value: "status",
      show: false,
    },
    {
      title: "Managing Entity",
      value: "managingEntity",
      show: true,
    },
    {
      title: "Characteristics Code",
      value: "characteristicsCode",
      show: false,
    },
    {
      title: "Code",
      value: "code",
      show: false,
    },
    {
      title: "Value Range",
      value: "valueRange",
      show: false,
    },
    {
      title: "Period",
      value: "period",
      show: false,
    },
    {
      title: "Value Boolean",
      value: "valueBoolean",
      show: false,
    },
    {
      title: "Value Reference",
      value: "valueRef",
      show: false,
    },
    {
      title: "Exclude",
      value: "exclude",
      show: false,
    },
    {
      title: "Member Period",
      value: "memberPeriod",
      show: false,
    },
    {
      title: "Member Status",
      value: "memberStatus",
      show: false,
    },
    {
      title: "Member Entity",
      value: "memberEntity",
      show: false,
    },
    {
      title: "Value Quantity",
      value: "valueQuantity",
      show: false,
    },
    {
      title: "Value Codeable Concept",
      value: "valueCodeableConcept",
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
    const groups = this.groups.map((group) => {
       (group as any).period = new Date(
         (group as any).period 
       ).toLocaleDateString("en-US");
       (group as any).memberPeriod = new Date(
         (group as any).memberPeriod 
       ).toLocaleDateString("en-US");

       
        return {
        ...group,
         action: group.id,
        };
    });
    if (!this.query) return groups;
    return search.searchObjectArray(groups, this.query);
  }

 
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this group",
      title: "Delete Group"
    });
    if (!confirmed) return;

    if (await this.deleteGroup(id)) window.notify({ msg: "Group deleted", status: "error" });
    else window.notify({ msg: "Group not deleted", status: "error" });
  }
  

      get sortFunc (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
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
